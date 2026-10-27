export default defineAppConfig({
  ui: {
    colors: {
      primary: 'gold',
      secondary: 'stone',
      accent: 'gold',
      success: 'emerald',
      info: 'blue',
      warning: 'amber',
      error: 'rose',
      neutral: 'stone'
    },
    button: {
      variants: {
        solid: {
          base: 'font-montserrat uppercase tracking-[0.15em] text-sm'
        },
        outline: {
          base: 'font-montserrat uppercase tracking-[0.15em] text-sm'
        }
      }
    }
  }
})
