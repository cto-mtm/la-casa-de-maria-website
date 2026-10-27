<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: 'Our Rooms — La Casa de María',
  description: 'Nine double en-suite rooms in a 200-year-old Andalusian house. Choose our Top Floor Room with its private balcony, or a comfortable Standard Room — including a ground-floor option.'
})

// Guests book by room *type*, not an individual named room. The owners assign
// the specific standard room on arrival. Only the Top Floor Room is requestable
// by name.
const roomTypes = [
  { slug: 'top-floor', name: 'RoomsPage.topFloorName', highlight: 'RoomsPage.topFloorHighlight', price: 'RoomsPage.topFloorPrice' },
  { slug: 'standard', name: 'RoomsPage.standardName', highlight: 'RoomsPage.standardHighlight', price: 'RoomsPage.standardPrice' }
]
</script>

<template>
  <div>
    <!-- Page Hero -->
    <section class="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src="/images/rooms/top-floor/01.webp"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
        style="object-position: center 60%"
        fetchpriority="high"
        aria-hidden="true"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-[#1a1815]/70 to-[#1a1815]/60" aria-hidden="true" />
      <div class="relative z-10 text-center px-6 animate-fade-in-up">
        <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-brand-gold-light)] mb-4">
          {{ t('RoomsPage.label') }}
        </p>
        <h1 class="font-display text-4xl md:text-5xl text-white">
          {{ t('RoomsPage.title') }}
        </h1>
      </div>
    </section>

    <!-- Introduction -->
    <section class="bg-ivory py-16 px-6">
      <div class="mx-auto max-w-3xl text-center">
        <p class="font-body text-base md:text-lg text-[var(--color-brand-charcoal)]/80 leading-relaxed">
          {{ t('RoomsPage.intro') }}
        </p>
      </div>
    </section>

    <!-- Room Types Grid -->
    <section class="bg-ivory pb-16 px-6">
      <div class="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="room in roomTypes"
          :key="room.slug"
          class="group"
        >
          <NuxtLink :to="localePath({ name: 'rooms-slug', params: { slug: room.slug } })">
            <!-- Image -->
            <div class="image-hover-zoom rounded-sm overflow-hidden mb-4 aspect-[4/5] bg-[var(--color-brand-stone)] border border-[var(--color-brand-gold)]/30">
              <img
                :src="getRoomCover(room.slug)"
                :alt="t(room.name)"
                class="w-full h-full object-cover"
                loading="lazy"
              >
            </div>
            <!-- Info -->
            <h3 class="font-display text-xl text-[var(--color-brand-charcoal)] mb-1 group-hover:text-[var(--color-brand-gold)] transition-colors">
              {{ t(room.name) }}
            </h3>
            <p class="font-body text-sm text-[var(--color-brand-charcoal)]/60 mb-2">
              {{ t(room.highlight) }}
            </p>
            <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.1em] text-[var(--color-brand-charcoal)]/50 mb-3">
              {{ t(room.price) }}
            </p>
            <span class="font-montserrat text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-brand-gold)] group-hover:text-[var(--color-brand-gold-dark)] transition-colors">
              {{ t('RoomsPage.viewRoom') }} →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How room assignment works (incl. accessibility note) -->
    <section class="bg-ivory pb-24 px-6">
      <div class="mx-auto max-w-3xl">
        <div class="flex items-start gap-4 p-6 bg-[var(--color-brand-stone)] rounded-sm border border-[var(--color-brand-gold)]/20">
          <UIcon name="i-lucide-info" class="w-5 h-5 text-[var(--color-brand-gold)] flex-shrink-0 mt-0.5" />
          <p class="font-body text-sm text-[var(--color-brand-charcoal)]/80 leading-relaxed">
            {{ t('RoomsPage.assignNote') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Whole House CTA -->
    <section class="bg-stone py-20 px-6">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="font-display text-2xl md:text-3xl text-[var(--color-brand-charcoal)] mb-4">
          {{ t('RoomsPage.exclusiveTitle') }}
        </h2>
        <p class="font-body text-base text-[var(--color-brand-charcoal)]/70 mb-8">
          {{ t('RoomsPage.exclusiveText') }}
        </p>
        <NuxtLink :to="localePath('contact')" class="btn-brand-outline">
          {{ t('RoomsPage.exclusiveCta') }}
        </NuxtLink>
      </div>
    </section>

  </div>
</template>
