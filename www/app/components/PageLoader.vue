<script setup lang="ts">
const nuxtApp = useNuxtApp()
const isLoading = ref(false)

// Branded splash — rendered on the server so it covers the first paint,
// then dismissed once the app has hydrated and the page has loaded.
const showSplash = ref(true)

nuxtApp.hook('page:start', () => {
  isLoading.value = true
})

nuxtApp.hook('page:finish', () => {
  setTimeout(() => {
    isLoading.value = false
  }, 150)
})

onMounted(() => {
  const minVisible = new Promise(resolve => setTimeout(resolve, 600))
  const pageLoaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise(resolve => window.addEventListener('load', resolve, { once: true }))
  Promise.all([minVisible, pageLoaded]).then(() => {
    showSplash.value = false
  })
})
</script>

<template>
  <!-- First-load splash -->
  <Transition
    leave-active-class="transition-opacity duration-700 ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showSplash"
      class="splash fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--color-brand-charcoal)]"
      role="status"
      aria-live="polite"
    >
      <span class="sr-only">Loading La Casa de María</span>
      <div class="relative w-36 h-36 md:w-44 md:h-44" aria-hidden="true">
        <span class="brand-iso absolute inset-0 text-[var(--color-brand-gold)] opacity-25" />
        <span class="brand-iso splash-shine absolute inset-0" />
      </div>
      <span class="splash-line mt-8 h-px w-24 bg-[var(--color-brand-gold)]/60" aria-hidden="true" />
    </div>
  </Transition>

  <!-- Route-change progress bar -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed top-0 inset-x-0 z-[100] h-[2px]"
      role="progressbar"
      aria-label="Page loading"
    >
      <div class="h-full bg-[var(--color-brand-gold)] animate-loading-bar" />
    </div>
  </Transition>
</template>

<style scoped>
@keyframes loading-bar {
  0% { width: 0%; }
  20% { width: 30%; }
  50% { width: 60%; }
  80% { width: 80%; }
  100% { width: 95%; }
}

.animate-loading-bar {
  animation: loading-bar 1.5s ease-out forwards;
}

/* A band of light sweeps across the gold crest */
.splash-shine {
  background-image: linear-gradient(
    115deg,
    var(--color-brand-gold) 0%,
    var(--color-brand-gold) 35%,
    #F3E3B5 50%,
    var(--color-brand-gold) 65%,
    var(--color-brand-gold) 100%
  );
  background-size: 300% 100%;
  animation: splash-reveal 1s ease-out forwards, splash-shine 2.4s ease-in-out 0.6s infinite;
  opacity: 0;
}

@keyframes splash-reveal {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes splash-shine {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

.splash-line {
  transform-origin: center;
  animation: splash-line 1.6s ease-in-out infinite alternate;
}

@keyframes splash-line {
  from { transform: scaleX(0.2); }
  to { transform: scaleX(1); }
}

/* Safety net: never trap the page behind the splash if JS fails to hydrate */
.splash {
  animation: splash-failsafe 0.6s ease-out 6s forwards;
}

@keyframes splash-failsafe {
  to { opacity: 0; visibility: hidden; }
}

@media (prefers-reduced-motion: reduce) {
  .splash-shine,
  .splash-line {
    animation: none;
    opacity: 1;
  }
}
</style>
