import SiteHeader from './locales/components/SiteHeader'
import SiteFooter from './locales/components/SiteFooter'
import MobileBookingBar from './locales/components/MobileBookingBar'
import HomePage from './locales/pages/HomePage'
import OurStoryPage from './locales/pages/OurStoryPage'
import RoomsPage from './locales/pages/RoomsPage'
import RoomPage from './locales/pages/RoomPage'
import GalleryPage from './locales/pages/GalleryPage'
import ExperiencePage from './locales/pages/ExperiencePage'
import ContactPage from './locales/pages/ContactPage'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: {
        SiteHeader: SiteHeader.en,
        SiteFooter: SiteFooter.en,
        MobileBookingBar: MobileBookingBar.en,
        HomePage: HomePage.en,
        OurStoryPage: OurStoryPage.en,
        RoomsPage: RoomsPage.en,
        RoomPage: RoomPage.en,
        GalleryPage: GalleryPage.en,
        ExperiencePage: ExperiencePage.en,
        ContactPage: ContactPage.en
      },
      es: {
        SiteHeader: SiteHeader.es,
        SiteFooter: SiteFooter.es,
        MobileBookingBar: MobileBookingBar.es,
        HomePage: HomePage.es,
        OurStoryPage: OurStoryPage.es,
        RoomsPage: RoomsPage.es,
        RoomPage: RoomPage.es,
        GalleryPage: GalleryPage.es,
        ExperiencePage: ExperiencePage.es,
        ContactPage: ContactPage.es
      }
    }
  }
})
