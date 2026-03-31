<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseApiService } from '@/features/courses/api/services/courseApi.service'

const route = useRoute()
const router = useRouter()

const course = ref(null)
const isLoading = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')

const paymentForm = ref({
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  country: 'Ethiopia',
})

const courseId = computed(() => route.params.courseId?.toString() ?? '')

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(amount)
}

async function loadPaymentContext() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await courseApiService.getPaymentContext(courseId.value)

    if (response.enrollment.hasAccess) {
      await router.replace({ name: 'courseContent', params: { courseId: courseId.value } })
      return
    }

    course.value = response
  } catch (error) {
    errorMessage.value = error.message || 'We could not open checkout right now.'
  } finally {
    isLoading.value = false
  }
}

async function handlePayment() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    await courseApiService.completePayment(courseId.value, paymentForm.value)
    await router.push({ name: 'courseContent', params: { courseId: courseId.value } })
  } catch (error) {
    errorMessage.value = error.message || 'Payment could not be completed right now.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadPaymentContext()
})

watch(courseId, () => {
  loadPaymentContext()
})
</script>

<template>
  <section class="payment-shell">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="max-w-3xl">
        <p class="payment-eyebrow">Checkout</p>
        <h1 class="mt-3 text-4xl font-black text-white sm:text-5xl">
          Confirm payment and unlock your class
        </h1>
        <p class="mt-4 text-sm leading-7 text-slate-200/82 sm:text-base">
          This mock checkout completes the Coursera-style flow for your UI: enrollment first,
          payment second, and classroom access right after.
        </p>
      </div>

      <div
        v-if="errorMessage"
        class="rounded-[1.5rem] border border-rose-300/30 bg-rose-400/12 px-5 py-4 text-sm leading-7 text-rose-50"
      >
        {{ errorMessage }}
      </div>

      <div v-if="isLoading" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div class="rounded-[2rem] border border-sky-300/15 bg-white/5 p-6">
          <div class="animate-pulse space-y-4">
            <div class="h-8 w-1/2 rounded-full bg-white/10"></div>
            <div class="h-5 w-3/4 rounded-full bg-white/10"></div>
            <div class="aspect-[16/9] rounded-[1.5rem] bg-white/10"></div>
          </div>
        </div>
        <div class="rounded-[2rem] border border-sky-300/15 bg-white/5 p-6">
          <div class="animate-pulse space-y-4">
            <div class="h-10 rounded-2xl bg-white/10"></div>
            <div class="h-10 rounded-2xl bg-white/10"></div>
            <div class="h-10 rounded-2xl bg-white/10"></div>
            <div class="h-12 rounded-full bg-white/10"></div>
          </div>
        </div>
      </div>

      <div v-else-if="course" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article
          class="rounded-[2rem] border border-sky-300/15 bg-[rgba(8,23,44,0.72)] p-6 shadow-[0_28px_70px_rgba(2,12,27,0.32)] backdrop-blur"
        >
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-200/82">
            Order summary
          </p>
          <h2 class="mt-3 text-3xl font-black text-white">{{ course.title }}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200/80">
            {{ course.headline }}
          </p>

          <div class="mt-6 overflow-hidden rounded-[1.6rem] border border-sky-300/12">
            <img
              :src="course.thumbnail"
              :alt="course.title"
              class="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div class="rounded-[1.4rem] border border-sky-300/12 bg-white/5 px-4 py-4">
              <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/75">
                Instructor
              </p>
              <p class="mt-2 text-sm font-semibold text-white">{{ course.instructorName }}</p>
            </div>
            <div class="rounded-[1.4rem] border border-sky-300/12 bg-white/5 px-4 py-4">
              <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/75">Access</p>
              <p class="mt-2 text-sm font-semibold text-white">{{ course.durationLabel }}</p>
            </div>
          </div>

          <div class="mt-6 rounded-[1.5rem] border border-sky-300/10 bg-slate-950/35 p-5">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/75">
              What unlocks after payment
            </p>
            <ul class="mt-3 space-y-3 text-sm leading-7 text-slate-200/80">
              <li v-for="outcome in course.outcomes" :key="outcome">{{ outcome }}</li>
            </ul>
          </div>
        </article>

        <aside
          class="rounded-[2rem] border border-sky-300/15 bg-[rgba(8,23,44,0.8)] p-6 shadow-[0_28px_70px_rgba(2,12,27,0.32)] backdrop-blur"
        >
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-200/82">
            Payment form
          </p>
          <div
            class="mt-4 rounded-[1.5rem] border border-amber-200/40 bg-amber-300 px-5 py-4 text-slate-950"
          >
            <p class="text-xs font-bold uppercase tracking-[0.2em]">Total today</p>
            <p class="mt-2 text-3xl font-black">ETB {{ formatCurrency(course.priceBirr) }}</p>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="handlePayment">
            <div class="field">
              <label for="cardholderName">Cardholder name</label>
              <input
                id="cardholderName"
                v-model="paymentForm.cardholderName"
                type="text"
                placeholder="Student or parent name"
                class="input-field"
              />
            </div>

            <div class="field">
              <label for="cardNumber">Card number</label>
              <input
                id="cardNumber"
                v-model="paymentForm.cardNumber"
                type="text"
                inputmode="numeric"
                placeholder="1234 5678 9012 3456"
                class="input-field"
              />
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="field">
                <label for="expiryDate">Expiry date</label>
                <input
                  id="expiryDate"
                  v-model="paymentForm.expiryDate"
                  type="text"
                  placeholder="12/34"
                  class="input-field"
                />
              </div>

              <div class="field">
                <label for="cvc">CVC</label>
                <input
                  id="cvc"
                  v-model="paymentForm.cvc"
                  type="text"
                  inputmode="numeric"
                  placeholder="123"
                  class="input-field"
                />
              </div>
            </div>

            <div class="field">
              <label for="country">Billing country</label>
              <input id="country" v-model="paymentForm.country" type="text" class="input-field" />
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ isSubmitting ? 'Processing payment...' : 'Pay and go to class' }}
            </button>
          </form>

          <p class="mt-4 text-xs leading-6 text-slate-300/78">
            This is mock checkout data. It is structured like a real payment step, but no real
            transaction is processed.
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.payment-shell {
  background: radial-gradient(circle at top, rgba(56, 189, 248, 0.2), transparent 30%),
    radial-gradient(circle at 80% 8%, rgba(59, 130, 246, 0.16), transparent 22%),
    linear-gradient(180deg, #0f172a 0%, #082f49 100%);
}

.payment-eyebrow {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #7dd3fc;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.field label {
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(226, 232, 240, 0.92);
}

.input-field {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(125, 211, 252, 0.18);
  background: rgba(255, 255, 255, 0.96);
  padding: 0.82rem 0.95rem;
  color: #0f172a;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input-field:focus {
  border-color: rgba(56, 189, 248, 0.85);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}
</style>
