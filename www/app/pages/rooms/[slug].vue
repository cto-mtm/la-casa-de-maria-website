<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// Get room-type slug from route params
const slug = computed(() => route.params.slug as string)

// Two bookable room *types*. Guests pick a type, not an individual room -
// the owners assign the specific standard room on arrival.
const roomsData: Record<string, { nameKey: string; storyKey: string; amenities: string[]; isStandard: boolean }> = {
  'top-floor': {
    nameKey: 'RoomsPage.topFloorName',
    storyKey: 'RoomPage.top-floor',
    amenities: ['doubleRoom', 'enSuite', 'kingBed', 'airCon', 'wifi', 'balcony', 'panoramicView', 'largerRoom', 'heritageDetails'],
    isStandard: false
  },
  'standard': {
    nameKey: 'RoomsPage.standardName',
    storyKey: 'RoomPage.standard',
    amenities: ['doubleRoom', 'enSuite', 'queenBed', 'airCon', 'wifi', 'heritageDetails', 'groundFloorAvailable'],
    isStandard: true
  }
}

// 404 if room type not found
if (!roomsData[slug.value]) {
  throw createError({ statusCode: 404, statusMessage: 'Room not found' })
}

const room = computed(() => roomsData[slug.value]!)
const roomName = computed(() => t(room.value.nameKey))

useSeoMeta({
  title: () => `${roomName.value} - La Casa de María`,
  description: () => `Discover the ${roomName.value} at La Casa de María - a double en-suite room for two with heritage character.`
})

// Amenity icon map
const amenityIcons: Record<string, string> = {
  enSuite: 'i-lucide-bath',
  doubleRoom: 'i-lucide-users',
  kingBed: 'i-lucide-bed-double',
  queenBed: 'i-lucide-bed-double',
  airCon: 'i-lucide-thermometer-snowflake',
  wifi: 'i-lucide-wifi',
  balcony: 'i-lucide-door-open',
  mountainView: 'i-lucide-mountain',
  panoramicView: 'i-lucide-scan-eye',
  largerRoom: 'i-lucide-maximize',
  groundFloorAvailable: 'i-lucide-accessibility',
  heritageDetails: 'i-lucide-landmark'
}

const roomImages = computed(() => getRoomImages(slug.value))
const heroImage = computed(() => roomImages.value[0])
const galleryImages = computed(() => roomImages.value.slice(1))
</script>

<template>
  <div v-if="room">
    <!-- Room Hero -->
    <section class="relative h-[60vh] min-h-[450px] flex items-end overflow-hidden">
      <img
        v-if="heroImage"
        :src="heroImage"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
        fetchpriority="high"
        aria-hidden="true"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-[#2A2925] via-[#2A2925]/40 to-[#2A2925]/20" aria-hidden="true" />
      <div class="relative z-10 w-full px-6 pb-12 max-w-5xl mx-auto animate-fade-in-up">
        <NuxtLink
          :to="localePath('rooms')"
          class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold-light)] mb-4 inline-flex items-center gap-1 hover:text-[var(--color-brand-gold)] transition-colors"
        >
          <UIcon name="i-lucide-arrow-left" class="w-3.5 h-3.5" />
          {{ t('RoomPage.backToRooms') }}
        </NuxtLink>
        <h1 class="font-display text-4xl md:text-5xl text-white mt-2">{{ roomName }}</h1>
      </div>
    </section>

    <!-- Room Story -->
    <section class="bg-ivory py-20 px-6">
      <div class="mx-auto max-w-3xl text-center">
        <BrandDivider class="mb-8" />
        <p class="font-body text-base md:text-lg text-[var(--color-brand-charcoal)]/80 leading-relaxed">
          {{ t(`${room.storyKey}.story`) }}
        </p>
      </div>
    </section>

    <!-- Gallery -->
    <section v-if="galleryImages.length" class="bg-stone py-20 px-6">
      <div class="mx-auto max-w-6xl">
        <h2 class="font-display text-2xl text-[var(--color-brand-charcoal)] text-center mb-10">
          {{ t('RoomPage.galleryTitle') }}
        </h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="(img, index) in galleryImages"
            :key="img"
            class="image-hover-zoom aspect-square bg-[var(--color-brand-ivory)] rounded-sm overflow-hidden border border-[var(--color-brand-gold)]/30"
          >
            <img
              :src="img"
              :alt="t('RoomPage.galleryImageAlt', { room: roomName, n: index + 1 })"
              class="w-full h-full object-cover"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Amenities -->
    <section class="bg-ivory py-20 px-6">
      <div class="mx-auto max-w-3xl">
        <h2 class="font-display text-2xl text-[var(--color-brand-charcoal)] text-center mb-10">
          {{ t('RoomPage.amenitiesTitle') }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="amenity in room.amenities"
            :key="amenity"
            class="flex items-center gap-3 p-4 bg-[var(--color-brand-stone)] rounded-sm"
          >
            <UIcon :name="amenityIcons[amenity] || 'i-lucide-check'" class="w-5 h-5 text-[var(--color-brand-gold)] flex-shrink-0" />
            <span class="font-body text-sm text-[var(--color-brand-charcoal)]">{{ t(`RoomPage.amenity.${amenity}`) }}</span>
          </div>
        </div>

        <!-- Standard-room assignment / accessibility note -->
        <div
          v-if="room.isStandard"
          class="flex items-start gap-4 mt-8 p-6 bg-[var(--color-brand-stone)] rounded-sm border border-[var(--color-brand-gold)]/20"
        >
          <UIcon name="i-lucide-info" class="w-5 h-5 text-[var(--color-brand-gold)] flex-shrink-0 mt-0.5" />
          <p class="font-body text-sm text-[var(--color-brand-charcoal)]/80 leading-relaxed">
            {{ t('RoomPage.standardAssignNote') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Booking CTA -->
    <section class="bg-[var(--color-brand-charcoal)] py-16 px-6">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="font-display text-2xl text-white mb-4">
          {{ t('RoomPage.bookTitle', { room: roomName }) }}
        </h2>
        <p class="font-body text-sm text-white/70 mb-8">
          {{ t('RoomPage.bookDescription') }}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink :to="localePath('contact')" class="btn-brand">
            {{ t('RoomPage.bookDirect') }}
          </NuxtLink>
          <a href="https://booking.com" target="_blank" rel="noopener" class="btn-brand-outline border-white/30 text-white hover:bg-white hover:text-[var(--color-brand-charcoal)]">
            {{ t('RoomPage.bookBookingCom') }}
          </a>
        </div>
      </div>
    </section>

  </div>
</template>
