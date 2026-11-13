<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Contact & Location - La Casa de María',
  description: 'Get in touch with La Casa de María. Book a room directly, inquire about exclusive use, or ask us anything.'
})

const WHATSAPP_NUMBER = '34670398348'

const form = reactive({
  inquiryType: 'room-booking',
  name: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
  message: ''
})

const typeKeys: Record<string, string> = {
  'room-booking': 'ContactPage.typeRoomBooking',
  'whole-house': 'ContactPage.typeWholeHouse',
  'general': 'ContactPage.typeGeneral'
}

// Stay details only matter for bookings, not general questions
const needsStayDetails = computed(() => form.inquiryType !== 'general')
const whatsappUrl = ref('')

// Builds a prefilled WhatsApp message from the form and opens the chat
function handleSubmit() {
  const lines = [
    t('ContactPage.waGreeting'),
    '',
    `${t('ContactPage.inquiryTypeLabel')}: ${t(typeKeys[form.inquiryType] ?? typeKeys.general)}`,
    `${t('ContactPage.nameLabel')}: ${form.name.trim()}`
  ]
  if (needsStayDetails.value) {
    if (form.checkIn) lines.push(`${t('ContactPage.checkInLabel')}: ${form.checkIn}`)
    if (form.checkOut) lines.push(`${t('ContactPage.checkOutLabel')}: ${form.checkOut}`)
    if (form.guests) lines.push(`${t('ContactPage.guestsLabel')}: ${form.guests}`)
  }
  if (form.message.trim()) lines.push(`${t('ContactPage.messageLabel')}: ${form.message.trim()}`)

  whatsappUrl.value = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  window.open(whatsappUrl.value, '_blank', 'noopener')
}

// Preselect the whole-house inquiry type and jump to the form
function startWholeHouseInquiry() {
  form.inquiryType = 'whole-house'
  if (import.meta.client) {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }
}
// FAQ items
const faqItems = [
  { q: 'ContactPage.faq1Q', a: 'ContactPage.faq1A' },
  { q: 'ContactPage.faq2Q', a: 'ContactPage.faq2A' },
  { q: 'ContactPage.faq3Q', a: 'ContactPage.faq3A' },
  { q: 'ContactPage.faq4Q', a: 'ContactPage.faq4A' },
  { q: 'ContactPage.faq5Q', a: 'ContactPage.faq5A' }
]

const openFaq = ref<number | null>(null)
function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <div>
    <!-- Page Hero -->
    <section class="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
      <img
        src="/images/outdoors/patio-seating.webp"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
        style="object-position: center"
        fetchpriority="high"
        aria-hidden="true"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-[#1a1815]/70 to-[#1a1815]/60" aria-hidden="true" />
      <div class="relative z-10 text-center px-6 animate-fade-in-up">
        <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-brand-gold-light)] mb-4">
          {{ t('ContactPage.label') }}
        </p>
        <h1 class="font-display text-4xl md:text-5xl text-white">
          {{ t('ContactPage.title') }}
        </h1>
      </div>
    </section>

    <!-- Booking Paths -->
    <section class="bg-ivory py-16 px-6">
      <div class="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Book Direct -->
        <div class="bg-[var(--color-brand-stone)] rounded-sm p-8 text-center">
          <div class="w-12 h-12 rounded-full bg-[var(--color-brand-gold)]/10 flex items-center justify-center mx-auto mb-5">
            <UIcon name="i-lucide-calendar-check" class="w-6 h-6 text-[var(--color-brand-gold)]" />
          </div>
          <h3 class="font-display text-xl text-[var(--color-brand-charcoal)] mb-3">
            {{ t('ContactPage.bookDirectTitle') }}
          </h3>
          <p class="font-body text-sm text-[var(--color-brand-charcoal)]/70 mb-6">
            {{ t('ContactPage.bookDirectText') }}
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <a href="#contact-form" class="btn-brand text-xs">
              <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
              {{ t('ContactPage.bookDirectCta') }}
            </a>
            <a href="tel:+34670398348" class="btn-brand-outline text-xs">
              <UIcon name="i-lucide-phone" class="w-4 h-4" />
              {{ t('ContactPage.bookDirectCall') }}
            </a>
          </div>
        </div>

        <!-- Booking.com -->
        <div class="bg-[var(--color-brand-stone)] rounded-sm p-8 text-center">
          <div class="w-12 h-12 rounded-full bg-[var(--color-brand-gold)]/10 flex items-center justify-center mx-auto mb-5">
            <UIcon name="i-lucide-globe" class="w-6 h-6 text-[var(--color-brand-gold)]" />
          </div>
          <h3 class="font-display text-xl text-[var(--color-brand-charcoal)] mb-3">
            {{ t('ContactPage.bookingComTitle') }}
          </h3>
          <p class="font-body text-sm text-[var(--color-brand-charcoal)]/70 mb-6">
            {{ t('ContactPage.bookingComText') }}
          </p>
          <a href="https://booking.com" target="_blank" rel="noopener" class="btn-brand-outline text-xs">
            {{ t('ContactPage.bookingComCta') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Rent the Entire House -->
    <section class="bg-[var(--color-brand-charcoal)] py-20 px-6">
      <div class="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div class="aspect-[4/3] rounded-sm overflow-hidden border border-[var(--color-brand-gold)]/30">
          <img
            src="/images/house/lounge.webp"
            :alt="t('ContactPage.wholeHouseImageAlt')"
            class="w-full h-full object-cover"
            loading="lazy"
          >
        </div>
        <div>
          <p class="font-montserrat text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold-light)] mb-3">
            {{ t('ContactPage.wholeHouseLabel') }}
          </p>
          <h2 class="font-display text-2xl md:text-3xl text-white mb-5">
            {{ t('ContactPage.wholeHouseTitle') }}
          </h2>
          <p class="font-body text-base text-white/75 leading-relaxed mb-8">
            {{ t('ContactPage.wholeHouseText') }}
          </p>
          <button type="button" class="btn-brand" @click="startWholeHouseInquiry">
            <UIcon name="i-lucide-house" class="w-4 h-4" />
            {{ t('ContactPage.wholeHouseCta') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section id="contact-form" class="bg-stone py-24 px-6">
      <div class="mx-auto max-w-2xl">
        <div class="text-center mb-12">
          <h2 class="font-display text-2xl md:text-3xl text-[var(--color-brand-charcoal)] mb-4">
            {{ t('ContactPage.formTitle') }}
          </h2>
          <p class="font-body text-base text-[var(--color-brand-charcoal)]/70">
            {{ t('ContactPage.formDescription') }}
          </p>
        </div>

        <!-- Fallback if the browser blocked the WhatsApp window -->
        <div v-if="whatsappUrl" class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 font-body text-sm" role="status">
          {{ t('ContactPage.whatsappOpened') }}
          <a :href="whatsappUrl" target="_blank" rel="noopener" class="underline font-semibold">{{ t('ContactPage.whatsappRetry') }}</a>
        </div>

        <form
          toolname="contact-form"
          tooldescription="Prepare a booking inquiry or general message for La Casa de María and send it via WhatsApp"
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <!-- Inquiry type -->
          <div>
            <label for="inquiry-type" class="block font-montserrat text-xs uppercase tracking-[0.1em] text-[var(--color-brand-charcoal)] mb-2">
              {{ t('ContactPage.inquiryTypeLabel') }}
            </label>
            <select
              id="inquiry-type"
              v-model="form.inquiryType"
              class="w-full rounded-sm border border-[var(--color-brand-stone-dark)] bg-white px-4 py-3 font-body text-sm text-[var(--color-brand-charcoal)] placeholder-[var(--color-brand-charcoal)]/40 focus:border-[var(--color-brand-gold)] focus:ring-1 focus:ring-[var(--color-brand-gold)] transition-colors"
            >
              <option value="room-booking">{{ t('ContactPage.typeRoomBooking') }}</option>
              <option value="whole-house">{{ t('ContactPage.typeWholeHouse') }}</option>
              <option value="general">{{ t('ContactPage.typeGeneral') }}</option>
            </select>
          </div>

          <!-- Name -->
          <div>
            <label for="contact-name" class="block font-montserrat text-xs uppercase tracking-[0.1em] text-[var(--color-brand-charcoal)] mb-2">
              {{ t('ContactPage.nameLabel') }} <span class="text-rose-500" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              autocomplete="name"
              aria-required="true"
              class="w-full rounded-sm border border-[var(--color-brand-stone-dark)] bg-white px-4 py-3 font-body text-sm text-[var(--color-brand-charcoal)] placeholder-[var(--color-brand-charcoal)]/40 focus:border-[var(--color-brand-gold)] focus:ring-1 focus:ring-[var(--color-brand-gold)] transition-colors"
              :placeholder="t('ContactPage.namePlaceholder')"
            />
          </div>

          <!-- Stay details (bookings only) -->
          <div v-if="needsStayDetails" class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label for="contact-checkin" class="block font-montserrat text-xs uppercase tracking-[0.1em] text-[var(--color-brand-charcoal)] mb-2">
                {{ t('ContactPage.checkInLabel') }}
              </label>
              <input
                id="contact-checkin"
                v-model="form.checkIn"
                type="date"
                class="w-full rounded-sm border border-[var(--color-brand-stone-dark)] bg-white px-4 py-3 font-body text-sm text-[var(--color-brand-charcoal)] placeholder-[var(--color-brand-charcoal)]/40 focus:border-[var(--color-brand-gold)] focus:ring-1 focus:ring-[var(--color-brand-gold)] transition-colors"
              />
            </div>
            <div>
              <label for="contact-checkout" class="block font-montserrat text-xs uppercase tracking-[0.1em] text-[var(--color-brand-charcoal)] mb-2">
                {{ t('ContactPage.checkOutLabel') }}
              </label>
              <input
                id="contact-checkout"
                v-model="form.checkOut"
                type="date"
                :min="form.checkIn || undefined"
                class="w-full rounded-sm border border-[var(--color-brand-stone-dark)] bg-white px-4 py-3 font-body text-sm text-[var(--color-brand-charcoal)] placeholder-[var(--color-brand-charcoal)]/40 focus:border-[var(--color-brand-gold)] focus:ring-1 focus:ring-[var(--color-brand-gold)] transition-colors"
              />
            </div>
            <div>
              <label for="contact-guests" class="block font-montserrat text-xs uppercase tracking-[0.1em] text-[var(--color-brand-charcoal)] mb-2">
                {{ t('ContactPage.guestsLabel') }}
              </label>
              <input
                id="contact-guests"
                v-model="form.guests"
                type="number"
                min="1"
                max="20"
                inputmode="numeric"
                class="w-full rounded-sm border border-[var(--color-brand-stone-dark)] bg-white px-4 py-3 font-body text-sm text-[var(--color-brand-charcoal)] placeholder-[var(--color-brand-charcoal)]/40 focus:border-[var(--color-brand-gold)] focus:ring-1 focus:ring-[var(--color-brand-gold)] transition-colors"
              />
            </div>
          </div>

          <!-- Message -->
          <div>
            <label for="contact-message" class="block font-montserrat text-xs uppercase tracking-[0.1em] text-[var(--color-brand-charcoal)] mb-2">
              {{ t('ContactPage.messageLabel') }}
              <span v-if="!needsStayDetails" class="text-rose-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              v-model="form.message"
              :required="!needsStayDetails"
              :aria-required="!needsStayDetails"
              aria-describedby="message-hint"
              rows="5"
              class="w-full rounded-sm border border-[var(--color-brand-stone-dark)] bg-white px-4 py-3 font-body text-sm text-[var(--color-brand-charcoal)] placeholder-[var(--color-brand-charcoal)]/40 focus:border-[var(--color-brand-gold)] focus:ring-1 focus:ring-[var(--color-brand-gold)] transition-colors resize-y"
              :placeholder="t('ContactPage.messagePlaceholder')"
            />
            <p id="message-hint" class="mt-1 font-body text-xs text-[var(--color-brand-charcoal)]/50">
              {{ t('ContactPage.whatsappHint') }}
            </p>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-brand w-full justify-center">
            <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
            {{ t('ContactPage.submit') }}
          </button>
        </form>
      </div>
    </section>

    <!-- Location & Contact Info -->
    <section class="bg-ivory py-24 px-6">
      <div class="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Map -->
        <div class="aspect-[4/3] bg-[var(--color-brand-stone)] rounded-sm overflow-hidden border border-[var(--color-brand-gold)]">
          <iframe
            src="https://maps.google.com/maps?q=Algarinejo,+Granada,+Spain&z=14&output=embed"
            :title="t('ContactPage.mapTitle')"
            class="w-full h-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          />
        </div>

        <!-- Contact details -->
        <div class="flex flex-col justify-center">
          <h3 class="font-display text-2xl text-[var(--color-brand-charcoal)] mb-6">
            {{ t('ContactPage.locationTitle') }}
          </h3>
          <ul class="space-y-4 font-body text-base text-[var(--color-brand-charcoal)]/80">
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-[var(--color-brand-gold)] mt-0.5 flex-shrink-0" />
              <span>Algarinejo, Granada, Spain</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-phone" class="w-5 h-5 text-[var(--color-brand-gold)] mt-0.5 flex-shrink-0" />
              <a href="tel:+34670398348" class="hover:text-[var(--color-brand-gold)] transition-colors">+34 670 398 348</a>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-message-circle" class="w-5 h-5 text-[var(--color-brand-gold)] mt-0.5 flex-shrink-0" />
              <a href="https://wa.me/34670398348" target="_blank" rel="noopener" class="hover:text-[var(--color-brand-gold)] transition-colors">
                {{ t('ContactPage.whatsapp') }}
              </a>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-mail" class="w-5 h-5 text-[var(--color-brand-gold)] mt-0.5 flex-shrink-0" />
              <a href="mailto:lacasademaria@yahoo.com" class="hover:text-[var(--color-brand-gold)] transition-colors">lacasademaria@yahoo.com</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-stone py-24 px-6">
      <div class="mx-auto max-w-3xl">
        <h2 class="font-display text-2xl md:text-3xl text-[var(--color-brand-charcoal)] text-center mb-12">
          {{ t('ContactPage.faqTitle') }}
        </h2>

        <div class="space-y-3">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="bg-[var(--color-brand-ivory)] rounded-sm overflow-hidden"
          >
            <button
              class="w-full flex items-center justify-between px-6 py-4 text-left"
              :aria-expanded="openFaq === index"
              @click="toggleFaq(index)"
            >
              <span class="font-body text-base text-[var(--color-brand-charcoal)] pr-4">{{ t(item.q) }}</span>
              <UIcon
                name="i-lucide-chevron-down"
                class="w-5 h-5 text-[var(--color-brand-gold)] flex-shrink-0 transition-transform duration-300"
                :class="{ 'rotate-180': openFaq === index }"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-96 opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-96 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-if="openFaq === index" class="overflow-hidden">
                <p class="px-6 pb-4 font-body text-sm text-[var(--color-brand-charcoal)]/70 leading-relaxed">
                  {{ t(item.a) }}
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
