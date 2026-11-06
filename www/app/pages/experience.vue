<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'The Experience — La Casa de María',
  description: 'Discover the Andalusian countryside: gastronomy, nature, culture, and activities around Algarinejo, Granada.'
})

const experiences = [
  { icon: 'i-lucide-utensils', titleKey: 'ExperiencePage.gastroTitle', textKey: 'ExperiencePage.gastroText' },
  { icon: 'i-lucide-mountain', titleKey: 'ExperiencePage.natureTitle', textKey: 'ExperiencePage.natureText' },
  { icon: 'i-lucide-palette', titleKey: 'ExperiencePage.cultureTitle', textKey: 'ExperiencePage.cultureText' },
  { icon: 'i-lucide-bike', titleKey: 'ExperiencePage.activitiesTitle', textKey: 'ExperiencePage.activitiesText' }
]
</script>

<template>
  <div>
    <!-- Page Hero -->
    <section class="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src="/images/outdoors/patio-wall.webp"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
        style="object-position: center"
        fetchpriority="high"
        aria-hidden="true"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-[#1a1815]/70 to-[#1a1815]/60" aria-hidden="true" />
      <div class="relative z-10 text-center px-6 animate-fade-in-up">
        <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-brand-gold-light)] mb-4">
          {{ t('ExperiencePage.label') }}
        </p>
        <h1 class="font-display text-4xl md:text-5xl text-white">
          {{ t('ExperiencePage.title') }}
        </h1>
      </div>
    </section>

    <!-- Intro -->
    <section class="bg-ivory py-16 px-6">
      <div class="mx-auto max-w-3xl text-center">
        <p class="font-body text-base md:text-lg text-[var(--color-brand-charcoal)]/80 leading-relaxed">
          {{ t('ExperiencePage.intro') }}
        </p>
      </div>
    </section>

    <!-- Experience Grid -->
    <section class="bg-ivory pb-24 px-6">
      <div class="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="bg-[var(--color-brand-stone)] rounded-sm p-8"
        >
          <div class="w-12 h-12 rounded-full bg-[var(--color-brand-gold)]/10 flex items-center justify-center mb-5">
            <UIcon :name="exp.icon" class="w-6 h-6 text-[var(--color-brand-gold)]" />
          </div>
          <h3 class="font-display text-xl text-[var(--color-brand-charcoal)] mb-3">
            {{ t(exp.titleKey) }}
          </h3>
          <p class="font-body text-sm text-[var(--color-brand-charcoal)]/70 leading-relaxed">
            {{ t(exp.textKey) }}
          </p>
        </div>
      </div>
    </section>

    <!-- Surroundings -->
    <section class="bg-stone py-24 px-6">
      <div class="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] mb-3">
            {{ t('ExperiencePage.surroundingsLabel') }}
          </p>
          <h2 class="font-display text-2xl md:text-3xl text-[var(--color-brand-charcoal)] mb-6">
            {{ t('ExperiencePage.surroundingsTitle') }}
          </h2>
          <p class="font-body text-base text-[var(--color-brand-charcoal)]/80 leading-relaxed">
            {{ t('ExperiencePage.surroundingsText') }}
          </p>
        </div>
        <div class="aspect-[4/3] rounded-sm overflow-hidden border border-[var(--color-brand-gold)]/30">
          <img src="/images/rooms/top-floor/02.webp" :alt="t('ExperiencePage.surroundingsImageAlt')" class="w-full h-full object-cover" loading="lazy">
        </div>
      </div>
    </section>

  </div>
</template>
