<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  locales.value.filter(l => l.code !== locale.value)
)

defineProps<{
  variant?: 'light' | 'dark'
}>()
</script>

<template>
  <div class="flex items-center gap-1">
    <NuxtLink
      v-for="loc in availableLocales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="font-montserrat text-[0.7rem] uppercase tracking-[0.15em] px-2 py-1 rounded-sm transition-colors"
      :class="variant === 'dark'
        ? 'text-white/50 hover:text-[var(--color-brand-gold)]'
        : 'text-[var(--color-brand-charcoal)]/50 hover:text-[var(--color-brand-gold)]'"
      :aria-label="`Switch to ${loc.name}`"
    >
      {{ loc.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>
