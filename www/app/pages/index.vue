<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: 'La Casa de María - Boutique Rural Hotel in Granada',
  description: 'A 200-year-old heritage house turned boutique hotel in Algarinejo, Granada. Unique rooms, Andalusian countryside charm.'
})

const featuredRooms = [
  { slug: 'top-floor', name: 'RoomsPage.topFloorName', highlight: 'HomePage.topFloorHighlight' },
  { slug: 'standard', name: 'RoomsPage.standardName', highlight: 'HomePage.standardHighlight' }
]

// Hero background: the rooftop terrace (static)
const heroImage = '/images/rooms/top-floor/05.webp'
</script>

<template>
  <div>
    <!-- Hero Section - Full screen atmospheric -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background - rooftop terrace -->
      <div class="absolute inset-0" aria-hidden="true">
        <img
          :src="heroImage"
          alt=""
          class="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
          decoding="async"
        >
      </div>

      <!-- Overlay for text legibility -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#1a1815]/70 via-[#1a1815]/45 to-[#1a1815]/75" aria-hidden="true" />

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-6 max-w-3xl animate-fade-in-up">
        <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-brand-gold-light)] mb-6">
          {{ t('HomePage.subtitle') }}
        </p>
        <h1 class="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6">
          La Casa de María
        </h1>
        <BrandDivider variant="light" class="mb-8" />
        <p class="font-body text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl mx-auto">
          {{ t('HomePage.heroDescription') }}
        </p>
        <NuxtLink
          :to="localePath('rooms')"
          class="btn-brand"
        >
          {{ t('HomePage.discoverRooms') }}
        </NuxtLink>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <UIcon name="i-lucide-chevron-down" class="w-6 h-6 text-white/50" />
      </div>
    </section>

    <!-- The Essence Section -->
    <section class="bg-ivory py-24 px-6">
      <div class="mx-auto max-w-3xl text-center">
        <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] mb-4">
          {{ t('HomePage.essenceLabel') }}
        </p>
        <h2 class="font-display text-3xl md:text-4xl text-[var(--color-brand-charcoal)] mb-6">
          {{ t('HomePage.essenceTitle') }}
        </h2>
        <BrandDivider class="mb-8" />
        <p class="font-body text-base md:text-lg text-[var(--color-brand-charcoal)]/80 leading-relaxed">
          {{ t('HomePage.essenceText') }}
        </p>
      </div>
    </section>

    <!-- Section divider: floats on the Essence → Rooms seam (height:0) -->
    <SectionDivider tone="gold" />

    <!-- Featured Rooms Preview -->
    <section class="bg-stone py-24 px-6">
      <div class="mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] mb-4">
            {{ t('HomePage.roomsLabel') }}
          </p>
          <h2 class="font-display text-3xl md:text-4xl text-[var(--color-brand-charcoal)]">
            {{ t('HomePage.roomsTitle') }}
          </h2>
          <p class="font-body text-base text-[var(--color-brand-charcoal)]/70 max-w-2xl mx-auto mt-4">
            {{ t('HomePage.roomsSubtext') }}
          </p>
        </div>

        <!-- Room-type cards - horizontal scroll on mobile, grid on desktop -->
        <div class="flex overflow-x-auto lg:grid lg:grid-cols-2 lg:max-w-3xl lg:mx-auto gap-6 pb-4 lg:pb-0 snap-x snap-mandatory">
          <div
            v-for="room in featuredRooms"
            :key="room.slug"
            class="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto snap-center group"
          >
            <div class="image-hover-zoom rounded-sm overflow-hidden mb-4 aspect-[4/5] bg-[var(--color-brand-stone-dark)] border border-[var(--color-brand-gold)]/30">
              <img
                :src="getRoomCover(room.slug)"
                :alt="t(room.name)"
                class="w-full h-full object-cover"
                loading="lazy"
              >
            </div>
            <h3 class="font-display text-xl text-[var(--color-brand-charcoal)] mb-1">{{ t(room.name) }}</h3>
            <p class="font-body text-sm text-[var(--color-brand-charcoal)]/60 mb-3">
              {{ t(room.highlight) }}
            </p>
            <NuxtLink
              :to="localePath({ name: 'rooms-slug', params: { slug: room.slug } })"
              class="font-montserrat text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold-dark)] transition-colors"
            >
              {{ t('HomePage.viewRoom') }} →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Whole House Option -->
    <section class="bg-ivory py-24 px-6">
      <div class="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="aspect-[4/3] rounded-sm overflow-hidden border border-[var(--color-brand-gold)]/30">
          <img
            src="/images/house/lounge.webp"
            :alt="t('HomePage.exclusiveImageAlt')"
            class="w-full h-full object-cover"
            loading="lazy"
          >
        </div>

        <!-- Text -->
        <div>
          <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] mb-4">
            {{ t('HomePage.exclusiveLabel') }}
          </p>
          <h2 class="font-display text-3xl text-[var(--color-brand-charcoal)] mb-6">
            {{ t('HomePage.exclusiveTitle') }}
          </h2>
          <p class="font-body text-base text-[var(--color-brand-charcoal)]/80 leading-relaxed mb-8">
            {{ t('HomePage.exclusiveText') }}
          </p>
          <NuxtLink
            :to="localePath('contact')"
            class="btn-brand-outline"
          >
            {{ t('HomePage.exclusiveCta') }}
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>
