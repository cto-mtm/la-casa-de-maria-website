<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const getRouteBaseName = useRouteBaseName()

// Already on the contact page: jump to the booking form instead of re-linking the same page
const target = computed(() =>
  getRouteBaseName(route) === 'contact' ? { hash: '#contact-form' } : localePath('contact')
)
</script>

<template>
  <!-- Always-visible booking CTA: full-width bottom bar on mobile,
       floating button bottom-right on desktop -->
  <div class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--color-brand-ivory)] border-t border-[var(--color-brand-stone-dark)] px-4 py-3 safe-bottom">
    <NuxtLink :to="target" class="btn-brand w-full justify-center text-center py-3">
      <UIcon name="i-lucide-calendar" class="w-4 h-4" />
      {{ t('MobileBookingBar.bookRoom') }}
    </NuxtLink>
  </div>
  <div class="hidden lg:block fixed bottom-8 right-8 z-40">
    <NuxtLink :to="target" class="btn-brand shadow-lg">
      <UIcon name="i-lucide-calendar" class="w-4 h-4" />
      {{ t('MobileBookingBar.bookRoom') }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.safe-bottom {
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
}
</style>
