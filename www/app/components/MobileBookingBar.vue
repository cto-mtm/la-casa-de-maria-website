<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <!-- Sticky bottom bar on mobile for easy booking access -->
  <div class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--color-brand-ivory)] border-t border-[var(--color-brand-stone-dark)] px-4 py-3 safe-bottom">
    <NuxtLink
      :to="localePath('contact')"
      class="btn-brand w-full justify-center text-center py-3"
    >
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
