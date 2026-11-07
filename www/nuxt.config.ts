// https://nuxt.com/docs/api/configuration/nuxt-config

const tailscaleHost = process.env.TAILSCALE_HOST
const tailscalePort = process.env.TAILSCALE_PORT ? Number(process.env.TAILSCALE_PORT) : undefined

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  vite: {
    server: {
      hmr: tailscaleHost
        ? { protocol: 'wss', host: tailscaleHost, clientPort: tailscalePort }
        : undefined,
      allowedHosts: tailscaleHost ? true : undefined,
    },
  },

  future: {
    compatibilityVersion: 4
  },

  devtools: {
    enabled: true,
    timeline: { enabled: true }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    'nuxt-gtag',
    '@nuxtjs/i18n'
  ],

  fonts: {
    families: [
      { name: 'Cormorant Garamond', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Montserrat', provider: 'google', weights: [300, 400, 500, 600, 700] },
      { name: 'Lora', provider: 'google', weights: [400, 500, 600], styles: ['normal', 'italic'] }
    ]
  },

  i18n: {
    restructureDir: false,
    vueI18n: './i18n/i18n.config.ts',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'es', language: 'es-ES', name: 'Español' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  },

  runtimeConfig: {
    public: {
      submitFormUrl: 'REPLACE_ME'
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/icon-192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', as: 'image', href: '/images/brand/iso.webp', type: 'image/webp' }
      ],
      meta: [
        { name: 'theme-color', content: '#2A2925' }
      ]
    }
  },

  gtag: {
    id: 'REPLACE_ME_GA_ID'
  },

  site: {
    url: 'https://lacasademaria.com',
    name: 'La Casa de María',
    description: 'A 200-year-old boutique rural hotel in Algarinejo, Granada. Unique rooms with heritage character in the Andalusian countryside.',
    defaultLocale: 'en'
  },

  seo: {
    metaDataFiles: false,
  },

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  image: {
    provider: 'none'
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error', 'neutral']
    }
  },

  routeRules: {
    // ────────────────────────────────────────────────────────────
    // LEGACY URL REDIRECTS
    // Add 301 redirects for old URLs from a prior site or domain
    // restructure. Keep this list in sync with /legacy_urls.md.
    //
    // Pattern A - single page:
    //   '/old-path': { redirect: { to: '/new-path', statusCode: 301 } },
    //
    // Pattern B - directory with wildcard:
    //   '/old-section/**': { redirect: { to: '/new-section', statusCode: 301 } },
    //
    // Pattern C - section merged into another:
    //   '/team': { redirect: { to: '/about#team', statusCode: 301 } },
    // ────────────────────────────────────────────────────────────

    // '/example-old': { redirect: { to: '/', statusCode: 301 } },

    // Named rooms were replaced by room *types* (Top Floor / Standard). The old
    // per-room pages no longer exist - send their traffic to the rooms page.
    '/rooms/la-alcoba': { redirect: { to: '/rooms', statusCode: 301 } },
    '/rooms/el-mirador': { redirect: { to: '/rooms', statusCode: 301 } },
    '/rooms/la-bodega': { redirect: { to: '/rooms', statusCode: 301 } },
    '/rooms/el-patio': { redirect: { to: '/rooms', statusCode: 301 } },
    '/rooms/la-sierra': { redirect: { to: '/rooms/top-floor', statusCode: 301 } },
    '/rooms/el-olivo': { redirect: { to: '/rooms', statusCode: 301 } },
  }
})
