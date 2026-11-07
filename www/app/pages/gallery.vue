<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Gallery - La Casa de María',
  description: 'A visual tour of La Casa de María - our 200-year-old house, its gardens and courtyard, handcrafted details, and rooms in the Andalusian countryside.'
})

type Filter = 'all' | GalleryCategory

const activeFilter = ref<Filter>('all')

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'GalleryPage.filterAll' },
  { key: 'house', label: 'GalleryPage.filterHouse' },
  { key: 'grounds', label: 'GalleryPage.filterGrounds' },
  { key: 'details', label: 'GalleryPage.filterDetails' },
  { key: 'rooms', label: 'GalleryPage.filterRooms' }
]

const visibleImages = computed(() =>
  activeFilter.value === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter.value)
)

// Lightbox state
const lightboxIndex = ref<number | null>(null)
const isLightboxOpen = computed(() => lightboxIndex.value !== null)

function openLightbox(index: number) {
  lightboxIndex.value = index
  if (import.meta.client) document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightboxIndex.value = null
  if (import.meta.client) document.body.style.overflow = ''
}
function next() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % visibleImages.value.length
}
function prev() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + visibleImages.value.length) % visibleImages.value.length
}

function onKeydown(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})

// Reset lightbox if the filter changes while it's open
watch(activeFilter, () => closeLightbox())

const currentImage = computed(() =>
  lightboxIndex.value === null ? null : visibleImages.value[lightboxIndex.value]
)
</script>

<template>
  <div>
    <!-- Page Hero -->
    <section class="relative h-[45vh] min-h-[360px] flex items-center justify-center overflow-hidden">
      <img
        src="/images/house/lounge.webp"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
        style="object-position: center 55%"
        fetchpriority="high"
        aria-hidden="true"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-[#1a1815]/70 to-[#1a1815]/60" aria-hidden="true" />
      <div class="relative z-10 text-center px-6 animate-fade-in-up">
        <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-brand-gold-light)] mb-4">
          {{ t('GalleryPage.label') }}
        </p>
        <h1 class="font-display text-4xl md:text-5xl text-white">
          {{ t('GalleryPage.title') }}
        </h1>
      </div>
    </section>

    <!-- Intro -->
    <section class="bg-ivory pt-16 px-6">
      <div class="mx-auto max-w-3xl text-center">
        <p class="font-body text-base md:text-lg text-[var(--color-brand-charcoal)]/80 leading-relaxed">
          {{ t('GalleryPage.intro') }}
        </p>
      </div>
    </section>

    <!-- Filter tabs -->
    <section class="bg-ivory pt-10 px-6">
      <div class="mx-auto max-w-5xl flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          v-for="f in filters"
          :key="f.key"
          class="font-montserrat text-[0.7rem] uppercase tracking-[0.15em] px-4 py-2 rounded-sm border transition-colors"
          :class="activeFilter === f.key
            ? 'bg-[var(--color-brand-gold)] text-white border-[var(--color-brand-gold)]'
            : 'bg-transparent text-[var(--color-brand-charcoal)]/70 border-[var(--color-brand-gold)]/40 hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-charcoal)]'"
          :aria-pressed="activeFilter === f.key"
          @click="activeFilter = f.key"
        >
          {{ t(f.label) }}
        </button>
      </div>
    </section>

    <!-- Masonry-style grid -->
    <section class="bg-ivory py-12 px-6">
      <div class="mx-auto max-w-6xl columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
        <button
          v-for="(img, index) in visibleImages"
          :key="img.src"
          class="image-hover-zoom mb-3 block w-full break-inside-avoid rounded-sm overflow-hidden border border-[var(--color-brand-gold)]/25 bg-[var(--color-brand-stone)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)]"
          :aria-label="t('GalleryPage.openImage', { n: index + 1 })"
          @click="openLightbox(index)"
        >
          <img
            :src="img.src"
            :alt="t(`GalleryPage.category.${img.category}`)"
            class="w-full h-auto object-cover"
            loading="lazy"
          >
        </button>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isLightboxOpen && currentImage"
          class="fixed inset-0 z-[60] flex items-center justify-center bg-[#1a1815]/95 p-4"
          role="dialog"
          aria-modal="true"
          :aria-label="t('GalleryPage.lightboxLabel')"
          @click.self="closeLightbox"
        >
          <!-- Close -->
          <button
            class="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-white/80 hover:text-[var(--color-brand-gold)] transition-colors"
            :aria-label="t('GalleryPage.close')"
            @click="closeLightbox"
          >
            <UIcon name="i-lucide-x" class="w-7 h-7" />
          </button>

          <!-- Prev -->
          <button
            class="absolute left-3 sm:left-6 w-11 h-11 flex items-center justify-center text-white/80 hover:text-[var(--color-brand-gold)] transition-colors"
            :aria-label="t('GalleryPage.previous')"
            @click.stop="prev"
          >
            <UIcon name="i-lucide-chevron-left" class="w-8 h-8" />
          </button>

          <!-- Image -->
          <img
            :src="currentImage.src"
            :alt="t(`GalleryPage.category.${currentImage.category}`)"
            class="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl"
          >

          <!-- Next -->
          <button
            class="absolute right-3 sm:right-6 w-11 h-11 flex items-center justify-center text-white/80 hover:text-[var(--color-brand-gold)] transition-colors"
            :aria-label="t('GalleryPage.next')"
            @click.stop="next"
          >
            <UIcon name="i-lucide-chevron-right" class="w-8 h-8" />
          </button>

          <!-- Counter -->
          <p class="absolute bottom-5 left-1/2 -translate-x-1/2 font-montserrat text-xs tracking-[0.15em] text-white/70">
            {{ (lightboxIndex ?? 0) + 1 }} / {{ visibleImages.length }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
