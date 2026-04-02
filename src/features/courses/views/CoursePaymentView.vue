<script setup>
import { useCoursePaymentView } from '@/features/courses/composables/useCoursePaymentView'
import UiButton from '@/shared/components/ui/UiButton.vue'
import UiInputField from '@/shared/components/ui/UiInputField.vue'

const { course, errorMessage, formatCurrency, handlePayment, isLoading, isSubmitting, paymentForm } =
  useCoursePaymentView()
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
            <UiInputField
              id="cardholderName"
              v-model="paymentForm.cardholderName"
              label="Cardholder name"
              placeholder="Student or parent name"
            />

            <UiInputField
              id="cardNumber"
              v-model="paymentForm.cardNumber"
              inputmode="numeric"
              label="Card number"
              placeholder="1234 5678 9012 3456"
            />

            <div class="grid gap-4 sm:grid-cols-2">
              <UiInputField
                id="expiryDate"
                v-model="paymentForm.expiryDate"
                label="Expiry date"
                placeholder="12/34"
              />

              <UiInputField
                id="cvc"
                v-model="paymentForm.cvc"
                inputmode="numeric"
                label="CVC"
                placeholder="123"
              />
            </div>

            <UiInputField id="country" v-model="paymentForm.country" label="Billing country" />

            <UiButton type="submit" :disabled="isSubmitting" :loading="isSubmitting" block variant="primary">
              {{ isSubmitting ? 'Processing payment...' : 'Pay and go to class' }}
            </UiButton>
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

</style>
