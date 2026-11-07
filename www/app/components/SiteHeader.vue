<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// Smart navbar: hide on scroll down, show on scroll up
const isVisible = ref(true)
const lastScrollY = ref(0)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function handleScroll() {
  const currentY = window.scrollY
  isVisible.value = currentY < lastScrollY.value || currentY < 80
  isScrolled.value = currentY > 20
  lastScrollY.value = currentY
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})

const navLinks = [
  { name: 'index', label: 'SiteHeader.home' },
  { name: 'our-story', label: 'SiteHeader.ourStory' },
  { name: 'rooms', label: 'SiteHeader.rooms' },
  { name: 'gallery', label: 'SiteHeader.gallery' },
  { name: 'experience', label: 'SiteHeader.experience' },
  { name: 'contact', label: 'SiteHeader.contact' }
]
</script>

<template>
  <!-- Header Bar -->
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'bg-[var(--color-brand-ivory)]/95 backdrop-blur-md shadow-sm' : 'bg-transparent',
      { '-translate-y-full': !isVisible && !isMobileMenuOpen }
    ]"
    role="banner"
  >
    <nav class="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:py-5" aria-label="Main navigation">
      <!-- Logo / Brand -->
      <NuxtLink
        :to="localePath('index')"
        class="relative z-50 flex flex-col items-center"
        @click="closeMobileMenu"
      >
        <span class="sr-only">La Casa de María - Algarinejo, Granada</span>
        <span
          class="brand-wordmark block h-9 lg:h-11 aspect-[800/308] transition-colors duration-300"
          :class="isScrolled || isMobileMenuOpen ? 'text-[var(--color-brand-gold-dark)]' : 'text-white'"
          aria-hidden="true"
        />
      </NuxtLink>

      <!-- Desktop Nav links + Language Toggle -->
      <div class="hidden lg:flex items-center gap-8">
        <ul class="flex items-center gap-8">
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink
              :to="localePath(link.name)"
              class="font-montserrat text-xs uppercase tracking-[0.15em] transition-colors duration-200 hover:text-[var(--color-brand-gold)]"
              :class="isScrolled ? 'text-[var(--color-brand-charcoal)]' : 'text-white/90'"
            >
              {{ t(link.label) }}
            </NuxtLink>
          </li>
        </ul>
        <!-- Language Toggle -->
        <LanguageToggle :variant="isScrolled ? 'light' : 'dark'" />
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        class="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="toggleMobileMenu"
      >
        <span class="sr-only">{{ isMobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
        <span class="block w-6 h-5 relative">
          <span
            class="absolute left-0 w-full h-[1.5px] rounded transition-all duration-300"
            :class="[
              isMobileMenuOpen ? 'top-2 rotate-45 bg-[var(--color-brand-charcoal)]' : 'top-0',
              !isMobileMenuOpen && (isScrolled ? 'bg-[var(--color-brand-charcoal)]' : 'bg-white')
            ]"
          />
          <span
            class="absolute left-0 top-2 w-full h-[1.5px] rounded transition-all duration-300"
            :class="[
              isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100',
              isScrolled ? 'bg-[var(--color-brand-charcoal)]' : 'bg-white'
            ]"
          />
          <span
            class="absolute left-0 w-full h-[1.5px] rounded transition-all duration-300"
            :class="[
              isMobileMenuOpen ? 'top-2 -rotate-45 bg-[var(--color-brand-charcoal)]' : 'top-4',
              !isMobileMenuOpen && (isScrolled ? 'bg-[var(--color-brand-charcoal)]' : 'bg-white')
            ]"
          />
        </span>
      </button>
    </nav>
  </header>

  <!-- Full-screen Mobile Menu Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="fixed inset-0 z-40 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[var(--color-brand-ivory)]" aria-hidden="true" />

        <!-- Menu Content -->
        <nav class="relative h-full flex flex-col items-center justify-center px-6">
          <ul class="flex flex-col items-center gap-6">
            <li
              v-for="(link, index) in navLinks"
              :key="link.name"
              class="animate-fade-in-up"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
              <NuxtLink
                :to="localePath(link.name)"
                class="font-display text-2xl text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-gold)] transition-colors"
                @click="closeMobileMenu"
              >
                {{ t(link.label) }}
              </NuxtLink>
            </li>
          </ul>

          <!-- Language Toggle (mobile) -->
          <div class="mt-8 animate-fade-in-up" style="animation-delay: 450ms">
            <LanguageToggle variant="light" />
          </div>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>
