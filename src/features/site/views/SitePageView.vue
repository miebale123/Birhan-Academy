<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { sitePages } from '@/features/site/constants/sitePages'
import UiBadge from '@/shared/components/ui/UiBadge.vue'
import UiButton from '@/shared/components/ui/UiButton.vue'

const props = defineProps({
  pageKey: {
    type: String,
    required: true,
  },
})

const page = computed(() => sitePages[props.pageKey])
</script>

<template>
  <section class="site-page-shell min-h-[calc(100dvh-var(--app-header-height))]">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <UiButton :to="{ name: 'home' }" variant="secondary" size="sm" class="w-fit">
        Back to home
      </UiButton>

      <template v-if="page">
        <section
          class="rounded-[2rem] border border-sky-300/15 bg-[rgba(8,23,44,0.72)] p-6 shadow-[0_28px_70px_rgba(2,12,27,0.32)] backdrop-blur sm:p-8"
        >
          <p class="text-xs font-black uppercase tracking-[0.28em] text-amber-300/85">
            {{ page.eyebrow }}
          </p>
          <h1 class="mt-4 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {{ page.title }}
          </h1>
          <p class="mt-5 max-w-3xl text-base leading-8 text-slate-200/86 sm:text-lg">
            {{ page.description }}
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300/80">
            <UiBadge variant="neutral">
              Updated {{ page.lastUpdated }}
            </UiBadge>
            <RouterLink
              v-for="link in page.quickLinks"
              :key="link.label"
              :to="link.to"
              class="rounded-full border border-sky-300/18 bg-sky-400/10 px-4 py-2 font-semibold text-sky-50 transition hover:border-sky-200/40 hover:bg-sky-300/18"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </section>

        <div class="grid gap-5 md:grid-cols-2">
          <article
            v-for="section in page.sections"
            :key="section.title"
            class="rounded-[1.6rem] border border-sky-300/12 bg-[rgba(8,23,44,0.64)] p-5 shadow-[0_22px_50px_rgba(2,12,27,0.24)]"
          >
            <h2 class="text-xl font-black text-white">{{ section.title }}</h2>
            <p class="mt-3 text-sm leading-7 text-slate-300/84 sm:text-base">
              {{ section.body }}
            </p>
          </article>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.site-page-shell {
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.2), transparent 28%),
    radial-gradient(circle at 82% 10%, rgba(59, 130, 246, 0.18), transparent 22%),
    linear-gradient(180deg, #0f172a 0%, #082f49 42%, #020617 100%);
}
</style>
