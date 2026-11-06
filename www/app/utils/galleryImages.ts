// Catalog of photos for the /gallery page, grouped by category.
// Paths are served from public/images/. Keeping the list explicit (rather than
// globbing at runtime) keeps the static build deterministic and lets us order
// images deliberately.

export interface GalleryImage {
  src: string
  /** i18n key for the category this image belongs to */
  category: GalleryCategory
}

export type GalleryCategory = 'house' | 'grounds' | 'details' | 'rooms'

// Category tab order + their i18n label keys live in the page; this util only
// owns the image → category mapping.
const house = [
  'lounge', 'lounge-tiles', 'dining-room', 'dining-room-2', 'chandelier',
  'lounge-dining', 'hallway', 'staircase', 'staircase-2', 'staircase-3', 'staircase-4',
  'cellar', 'cellar-2', 'cellar-copper', 'cellar-bottle',
  'facade-entrance', 'facade-street'
].map(name => ({ src: `/images/house/${name}.webp`, category: 'house' as const }))

const grounds = [
  'courtyard', 'patio-seating', 'patio-lounge', 'patio-fountain',
  'patio-pots', 'patio-vines', 'patio-wall', 'patio-wall-2',
  'window-vines', 'flowers', 'flowers-2',
  'town-rooftops', 'town-valley', 'town-hilltop'
].map(name => ({ src: `/images/outdoors/${name}.webp`, category: 'grounds' as const }))

const details = [
  'tiles-tap', 'painted-table', 'blue-plate', 'clay-urn', 'clay-jars',
  'wall-lamp', 'pillows', 'cushion', 'towels', 'room-key'
].map(name => ({ src: `/images/details/${name}.webp`, category: 'details' as const }))

// A representative selection from each room type (the galleries themselves live
// on the room pages; here we show a curated taste).
const rooms: GalleryImage[] = [
  { src: '/images/rooms/top-floor/01.webp', category: 'rooms' },
  { src: '/images/rooms/top-floor/02.webp', category: 'rooms' },
  { src: '/images/rooms/top-floor/03.webp', category: 'rooms' },
  { src: '/images/rooms/top-floor/05.webp', category: 'rooms' },
  { src: '/images/rooms/standard/01.webp', category: 'rooms' },
  { src: '/images/rooms/standard/02.webp', category: 'rooms' },
  { src: '/images/rooms/standard/03.webp', category: 'rooms' },
  { src: '/images/rooms/ground-floor/01.webp', category: 'rooms' },
  { src: '/images/rooms/ground-floor/02.webp', category: 'rooms' }
]

export const galleryImages: GalleryImage[] = [
  ...house,
  ...grounds,
  ...details,
  ...rooms
]

export const galleryCategories: GalleryCategory[] = ['house', 'grounds', 'details', 'rooms']
