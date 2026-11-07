// Photos per room type, served from public/images/rooms/<slug>/.
// The first image is the type's cover (cards + hero); the rest form its gallery.
// Guests book by room *type*, not by individual room - the owners assign the
// specific room. Slugs map to the three physical categories in the house.
const roomPhotoCounts: Record<string, number> = {
  'top-floor': 5,
  'standard': 13,
  'ground-floor': 6
}

export function getRoomImages(slug: string): string[] {
  const count = roomPhotoCounts[slug] ?? 0
  return Array.from({ length: count }, (_, i) => `/images/rooms/${slug}/${String(i + 1).padStart(2, '0')}.webp`)
}

export function getRoomCover(slug: string): string | undefined {
  return getRoomImages(slug)[0]
}
