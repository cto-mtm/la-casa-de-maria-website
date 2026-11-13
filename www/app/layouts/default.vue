<template>
  <div class="min-h-screen flex flex-col bg-[var(--color-brand-ivory)]">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <!-- Always-visible booking button (bar on mobile, floating on desktop) -->
    <MobileBookingBar />
    <!-- Spacer so the fixed MobileBookingBar doesn't overlap the footer on
         mobile. Sits below the footer, so it adds no visible gap above it. -->
    <div class="h-20 lg:hidden" aria-hidden="true" />
  </div>
</template>
