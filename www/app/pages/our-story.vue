<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Our Story — La Casa de María',
  description: 'Discover the 200-year history of La Casa de María, a carefully preserved Andalusian heritage house in Algarinejo, Granada.'
})
</script>

<template>
  <div>
    <!-- Page Hero -->
    <section class="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src="/images/house/chandelier.webp"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
        style="object-position: center"
        fetchpriority="high"
        aria-hidden="true"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-[#1a1815]/70 to-[#1a1815]/60" aria-hidden="true" />
      <div class="relative z-10 text-center px-6 animate-fade-in-up">
        <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-brand-gold-light)] mb-4">
          {{ t('OurStoryPage.label') }}
        </p>
        <h1 class="font-display text-4xl md:text-5xl text-white">
          {{ t('OurStoryPage.title') }}
        </h1>
      </div>
    </section>

    <!-- Heritage Section — Staggered Layout -->
    <section class="bg-ivory py-24 px-6">
      <div class="mx-auto max-w-5xl">
        <!-- Block 1 — Image left, text right -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div class="aspect-[4/3] rounded-sm overflow-hidden border border-[var(--color-brand-gold)]/30">
            <img src="/images/house/facade-entrance.webp" :alt="t('OurStoryPage.heritageImageAlt')" class="w-full h-full object-cover object-[center_35%]" loading="lazy">
          </div>
          <div>
            <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] mb-3">
              {{ t('OurStoryPage.heritageLabel') }}
            </p>
            <h2 class="font-display text-2xl md:text-3xl text-[var(--color-brand-charcoal)] mb-6">
              {{ t('OurStoryPage.heritageTitle') }}
            </h2>
            <p class="font-body text-base text-[var(--color-brand-charcoal)]/80 leading-relaxed">
              {{ t('OurStoryPage.heritageText') }}
            </p>
          </div>
        </div>

        <!-- Block 2 — Text left, image right -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div class="order-2 lg:order-1">
            <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] mb-3">
              {{ t('OurStoryPage.architectureLabel') }}
            </p>
            <h2 class="font-display text-2xl md:text-3xl text-[var(--color-brand-charcoal)] mb-6">
              {{ t('OurStoryPage.architectureTitle') }}
            </h2>
            <p class="font-body text-base text-[var(--color-brand-charcoal)]/80 leading-relaxed">
              {{ t('OurStoryPage.architectureText') }}
            </p>
          </div>
          <div class="order-1 lg:order-2 aspect-[4/3] rounded-sm overflow-hidden border border-[var(--color-brand-gold)]/30">
            <img src="/images/details/clay-jars.webp" :alt="t('OurStoryPage.architectureImageAlt')" class="w-full h-full object-cover object-[center_70%]" loading="lazy">
          </div>
        </div>

        <!-- Block 3 — The Hosts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="aspect-[4/3] rounded-sm overflow-hidden border border-[var(--color-brand-gold)]/30">
            <img src="/images/details/room-key.webp" :alt="t('OurStoryPage.hostsImageAlt')" class="w-full h-full object-cover" loading="lazy">
          </div>
          <div>
            <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] mb-3">
              {{ t('OurStoryPage.hostsLabel') }}
            </p>
            <h2 class="font-display text-2xl md:text-3xl text-[var(--color-brand-charcoal)] mb-6">
              {{ t('OurStoryPage.hostsTitle') }}
            </h2>
            <p class="font-body text-base text-[var(--color-brand-charcoal)]/80 leading-relaxed italic">
              {{ t('OurStoryPage.hostsText') }}
            </p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
