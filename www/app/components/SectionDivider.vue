<script setup lang="ts">
/**
 * SectionDivider - a large ornamental Baroque acanthus flourish that sits on
 * the *seam between two page sections*, at the layout level. Distinct from the
 * small inline <BrandDivider> accent used within text blocks.
 *
 * The artwork is a trimmed, transparent gold flourish
 * (public/images/brand/section-flourish.webp).
 *
 * Positioning: the wrapper is a zero-height relative anchor on the seam line.
 * The image is absolutely positioned and centered on that line
 * (left/top 50% + translate -50%,-50%), so it overlaps the sections above and
 * below without taking any vertical space or being clipped by them.
 *
 * Props:
 *   widthPct  flourish width as a % of the container (default 60).
 *   maxWidth  hard cap in px so it doesn't get oversized on wide screens
 *             (default 560).
 *   tone      'gold' (default) renders as-is; 'light' lifts it on dark bgs.
 */
withDefaults(defineProps<{
  widthPct?: number
  maxWidth?: number
  tone?: 'gold' | 'light'
}>(), {
  widthPct: 60,
  maxWidth: 560,
  tone: 'gold'
})
</script>

<template>
  <div class="section-divider" role="presentation" aria-hidden="true">
    <img
      src="/images/brand/section-flourish.webp"
      alt=""
      class="section-divider__flourish"
      :class="`section-divider__flourish--${tone}`"
      :style="{ width: `${widthPct}%`, maxWidth: `${maxWidth}px` }"
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width="1114"
      height="357"
    >
  </div>
</template>

<style scoped>
/* Zero-height relative anchor sitting on the seam between two sections. */
.section-divider {
  position: relative;
  height: 0;
  max-width: 99dvw;
  margin-inline: auto;
  pointer-events: none;
  z-index: 2;
}

/* The flourish is taken out of flow and centered on the seam line, so it
   overlaps both sections and can't be clipped by the zero-height box. */
.section-divider__flourish {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  height: auto;
  max-width: 99dvw;
}

.section-divider__flourish--light {
  /* brighten slightly so the gold reads on dark backgrounds */
  filter: brightness(1.12) saturate(1.05);
}
</style>
