# La Casa de María - Website

Nuxt 4 static marketing site + Firebase Hosting + Cloud Functions for form handling.

## What's in the Box

| Folder | Purpose |
|--------|---------|
| `www/` | Nuxt 4 marketing site (static generation) |
| `firebase/` | Firebase Hosting config + Cloud Functions |
| `docs/` | Internal architecture docs |

## Quick Start

```bash
# 1. Install the marketing site
cd www && npm install

# 2. Run the dev server
npm run dev

# 3. (Separate terminal) Install Cloud Functions deps
cd firebase/functions && npm install
npm run build
firebase emulators:start --only functions
```

## Routing

All internal app navigation uses `@nuxtjs/i18n`. Use `localePath()` to ensure language preferences persist across page loads.

```vue
<NuxtLink :to="localePath('rooms')">Rooms</NuxtLink>
```

## Image Optimization

Run `npm run optimize:images` in `www/` to batch convert `public/images/` content to `.webp`.

```bash
# Preview what would be converted (no changes)
npm run optimize:images -- --dry-run

# Convert with custom quality
npm run optimize:images -- --quality=82 --max-width=1600
```

## Adding a New Form Type

1. Edit `firebase/functions/src/models.ts` - add a new key to `formConfigs` with its Zod schema, notification email, and subjects.
2. Redeploy functions: `cd firebase/functions && npm run deploy`
3. Call from the frontend: `useSubmitForm('your-type', { ...fields })`

## Adding a Legacy Redirect

1. Edit `www/nuxt.config.ts` → `routeRules` section.
2. Update `legacy_urls.md` at the repo root to keep the tracker in sync.

## Required Secrets (before deploying functions)

```bash
firebase functions:secrets:set GMAIL_USER
firebase functions:secrets:set GMAIL_APP_PASSWORD
firebase functions:secrets:set GMAIL_SENDER
firebase functions:secrets:set RECAPTCHA_SECRET_KEY
```

## Deploy

1. Build the Nuxt site so output lands in `firebase/www/`:
   ```bash
   cd www && npm run generate
   # Copy .output/public/ to ../firebase/www/
   ```
2. Deploy everything:
   ```bash
   cd firebase && firebase deploy
   ```

## Keeping dependencies fresh

Versions in `package.json` are pinned to the dates this boilerplate was
generated. They're intentionally NOT auto-updated on install - the goal is
that `npm install && npm run dev` always works on day one.

Recommended workflow when starting a new project from this scaffold:

1. `npm install` in both `www/` and `firebase/functions/` and confirm
   `npm run dev` boots cleanly.
2. Commit the scaffold as your baseline (`git commit -m "initial scaffold"`).
3. Run `npm outdated` in each folder to see drift, and `npm audit` for
   security issues.
4. Upgrade deliberately - one major version at a time, testing between each.
   Watch especially for breaking changes in Nuxt, Nuxt UI, Firebase
   Functions, and zod (these have all shipped breaking majors in the past).
5. After upgrading, re-run `npm run dev` and click through the key pages /
   submit the contact form before committing.

Avoid running `npm update` blindly - it will pull breaking majors without
warning and you'll lose the "clean baseline" property.
