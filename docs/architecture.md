# Architecture

## Overview

This repo contains a Nuxt 4 static marketing site served via Firebase Hosting, with Cloud Functions handling form submissions from the frontend.

## How the Pieces Fit Together

```
┌────────────────────────────────────────────────────────┐
│  Browser                                               │
│  (Nuxt-generated static HTML/JS/CSS)                   │
└────────┬─────────────────────────────────┬─────────────┘
         │ page requests                   │ form POST
         ▼                                 ▼
┌────────────────────┐       ┌──────────────────────────┐
│  Firebase Hosting  │       │  Cloud Functions          │
│  (firebase/www/)   │       │  (firebase/functions/)    │
└────────────────────┘       └──────────┬───────────────┘
                                        │
                                        ▼
                              ┌────────────────────┐
                              │  Gmail SMTP        │
                              │  (via nodemailer)  │
                              └────────────────────┘
```

## Build & Deploy Flow

1. `cd www && npm run generate` - Nuxt builds static HTML into `.output/public/`.
2. Copy `.output/public/` contents into `firebase/www/`.
3. `cd firebase && firebase deploy` - deploys Hosting + Functions.

The Hosting `public` directory in `firebase.json` is set to `"www"` because the deploy flow places the generated static site there.

## Form Submissions

- The frontend composable `useSubmitForm` POSTs JSON to the `submitForm` Cloud Function.
- The function validates with Zod, verifies reCAPTCHA v3 (score ≥ 0.5), sends a notification email to the configured address, and optionally sends a confirmation email to the submitter.
- CORS is restricted to the production domain + localhost for development.
- Secrets (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_SENDER`, `RECAPTCHA_SECRET_KEY`) are stored via Firebase Functions secrets.

## reCAPTCHA

- Uses v3 (invisible, score-based).
- When running in the Firebase Emulator (`FUNCTIONS_EMULATOR === "true"`), verification is bypassed and returns `{ success: true, score: 1.0 }`.

## Content

- Blog/news content lives in `www/content/news/*.md`.
- Managed by `@nuxt/content` v3 with a defined schema in `www/content.config.ts`.

## Internationalization (i18n)

- Supported locales: `en` (default), `es`.
- Translation files live in `www/i18n/locales/`.
- **All internal navigation MUST use `localePath()`** to ensure the active language persists across page loads.

## Key Conventions

- TypeScript strict mode in Cloud Functions.
- All user-facing copy uses `REPLACE_ME` tokens for easy find-and-replace.
- No auth, Firestore, payments, or other services beyond what's listed here.
