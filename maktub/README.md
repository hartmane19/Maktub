# Maktub

A daily field journal — daily rituals, a morning task ledger, an evening
reflection, and a book journal — built as an installable web app (PWA).

## What's in this project

- `src/App.jsx` — the whole app (all four screens + bottom navigation)
- `src/storage.js` — saves your data permanently in the browser (localStorage)
- `public/manifest.json` — tells iOS this is an installable app
- `public/sw.js` — lets the app work offline once loaded
- `public/icons/` — the app icon

## Deploying it (no coding required after this point)

1. Create a free account at netlify.com (or vercel.com — either works the
   same way).
2. Create a free GitHub account if you don't have one, and create a new
   repository. Upload this entire folder to it (GitHub's website lets you
   drag and drop files directly — no command line needed).
3. In Netlify, choose "Add new site" → "Import an existing project" →
   connect your GitHub account → pick the repository you just created.
4. When it asks for build settings, use:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click deploy. After a minute you'll get a live URL like
   `https://maktub-yourname.netlify.app`.

## Installing it on your iPad

1. Open that URL in **Safari** on your iPad (must be Safari, not Chrome).
2. Tap the Share icon (square with an arrow pointing up).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

Maktub will now appear as an app icon on your Home Screen, open full-screen
with no browser bar, and keep working even without an internet connection.

## Your data

Everything you write — tasks, journal entries, books, quotes — is saved
directly on your iPad in the browser's storage, tied to this app. It is not
sent to any server. If you ever clear Safari's website data for this app,
or delete the app and reinstall it fresh, that data would be lost, so it's
worth keeping this in mind (a future improvement could add a proper backend
so entries sync and back up automatically).
