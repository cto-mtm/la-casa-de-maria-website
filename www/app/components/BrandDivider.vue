<script setup lang="ts">
/**
 * BrandDivider — an ornamental section divider inspired by the gold
 * rococo cartouche in the La Casa de María crest. A central mirrored
 * flourish (C-scrolls + a small lotus/diamond motif) is flanked by two
 * tapering hairlines, echoing the top crest and bottom pendant of the frame.
 *
 * Props:
 *   variant  'gold' (default) tints with the brand gold; 'light' uses a paler
 *            gold for use on dark backgrounds.
 *   width    max width of the whole divider in px (default 220).
 */
withDefaults(defineProps<{
  variant?: 'gold' | 'light'
  width?: number
}>(), {
  variant: 'gold',
  width: 220
})
</script>

<template>
  <div
    class="brand-ornament"
    :class="`brand-ornament--${variant}`"
    :style="{ maxWidth: `${width}px` }"
    role="presentation"
    aria-hidden="true"
  >
    <!-- left hairline -->
    <span class="brand-ornament__line brand-ornament__line--left" />

    <!-- central flourish -->
    <svg
      class="brand-ornament__crest"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      >
        <!-- right-side C-scroll pair -->
        <path d="M62 20 c 6 0 10 -5 16 -5 c 6 0 9 4 9 8 c 0 4 -4 7 -8 7 c -3 0 -5 -2 -5 -5 c 0 -2 1 -4 3 -4" />
        <path d="M78 20 c 5 -1 10 2 15 2 c 5 0 9 -3 9 -7 c 0 -4 -4 -7 -8 -7 c -3 0 -5 2 -5 5 c 0 2 2 4 4 4" />

        <!-- mirrored left-side C-scroll pair -->
        <path d="M58 20 c -6 0 -10 -5 -16 -5 c -6 0 -9 4 -9 8 c 0 4 4 7 8 7 c 3 0 5 -2 5 -5 c 0 -2 -1 -4 -3 -4" />
        <path d="M42 20 c -5 -1 -10 2 -15 2 c -5 0 -9 -3 -9 -7 c 0 -4 4 -7 8 -7 c 3 0 5 2 5 5 c 0 2 -2 4 -4 4" />
      </g>

      <!-- central lotus / diamond motif (filled, like the crest's crown) -->
      <g fill="currentColor">
        <path d="M60 11 l 4 9 l -4 9 l -4 -9 z" />
      </g>
      <g
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        fill="none"
      >
        <!-- tiny tendrils rising from the diamond, nodding to the top crest -->
        <path d="M60 11 c -2 -3 -5 -4 -7 -3" />
        <path d="M60 11 c 2 -3 5 -4 7 -3" />
      </g>
    </svg>

    <!-- right hairline -->
    <span class="brand-ornament__line brand-ornament__line--right" />
  </div>
</template>

<style scoped>
.brand-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  margin: 2rem auto;
  color: var(--color-brand-gold);
}

.brand-ornament--light {
  color: var(--color-brand-gold-light);
}

.brand-ornament__crest {
  flex: 0 0 auto;
  width: 92px;
  height: auto;
  /* subtle entrance-friendly opacity so it reads as a refined accent */
  opacity: 0.95;
}

.brand-ornament__line {
  flex: 1 1 auto;
  height: 1px;
  max-width: 70px;
}

/* taper the hairlines toward the center flourish, fading at the outer edge */
.brand-ornament__line--left {
  background: linear-gradient(to right, transparent, currentColor);
  opacity: 0.55;
}

.brand-ornament__line--right {
  background: linear-gradient(to left, transparent, currentColor);
  opacity: 0.55;
}
</style>
