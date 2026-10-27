<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="bg-[var(--color-brand-charcoal)] text-white/80" role="contentinfo">
    <!-- Gold divider -->
    <div class="h-px bg-[var(--color-brand-gold)] opacity-40" />

    <div class="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pb-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Brand -->
        <div>
          <img
            src="/images/brand/logo-crest.webp"
            alt="La Casa de María — Algarinejo, Granada"
            class="h-28 w-auto mb-6"
            width="400"
            height="480"
            loading="lazy"
          >
          <p class="font-body text-sm text-white/60 leading-relaxed">
            {{ t('SiteFooter.tagline') }}
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-montserrat text-xs uppercase tracking-[0.15em] text-[var(--color-brand-gold)] mb-4">
            {{ t('SiteFooter.explore') }}
          </h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink :to="localePath('our-story')" class="font-body text-sm text-white/70 hover:text-[var(--color-brand-gold)] transition-colors">
                {{ t('SiteHeader.ourStory') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('rooms')" class="font-body text-sm text-white/70 hover:text-[var(--color-brand-gold)] transition-colors">
                {{ t('SiteHeader.rooms') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('gallery')" class="font-body text-sm text-white/70 hover:text-[var(--color-brand-gold)] transition-colors">
                {{ t('SiteHeader.gallery') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('experience')" class="font-body text-sm text-white/70 hover:text-[var(--color-brand-gold)] transition-colors">
                {{ t('SiteHeader.experience') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('contact')" class="font-body text-sm text-white/70 hover:text-[var(--color-brand-gold)] transition-colors">
                {{ t('SiteHeader.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-montserrat text-xs uppercase tracking-[0.15em] text-[var(--color-brand-gold)] mb-4">
            {{ t('SiteFooter.contact') }}
          </h4>
          <ul class="space-y-2 font-body text-sm text-white/70">
            <li>Algarinejo, Granada, Spain</li>
            <li>
              <a href="tel:+34670398348" class="hover:text-[var(--color-brand-gold)] transition-colors">
                +34 670 398 348
              </a>
            </li>
            <li>
              <a href="mailto:lacasademaria@yahoo.com" class="hover:text-[var(--color-brand-gold)] transition-colors">
                lacasademaria@yahoo.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="font-montserrat text-[0.65rem] uppercase tracking-[0.1em] text-white/40">
          {{ t('SiteFooter.copyright', { year: new Date().getFullYear() }) }}
        </p>
        <div class="flex items-center gap-6">
          <!-- Language Toggle -->
          <LanguageToggle variant="dark" />
          <!-- Social Links -->
          <div class="flex items-center gap-4">
            <a href="#" class="text-white/40 hover:text-[var(--color-brand-gold)] transition-colors" aria-label="Instagram">
              <UIcon name="i-lucide-instagram" class="w-5 h-5" />
            </a>
            <a href="#" class="text-white/40 hover:text-[var(--color-brand-gold)] transition-colors" aria-label="Facebook">
              <UIcon name="i-lucide-facebook" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
