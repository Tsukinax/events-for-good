# Steps you must do yourself (they need YOUR GitHub account)

The lab has a few steps I can't complete for you because they require your own GitHub account.
Everything else is already built. Here is exactly what to do.

## Step 2.6 — push this project to your own repository

```bash
cd events-for-good
# git is already initialised with commits. Just add your remote and push:
git remote add origin https://github.com/<your-username>/<your-project-repo>.git
git branch -M main
git push -u origin main
```

## Steps 14.2–14.4 — create the mock server

The event list is served by `my-json-server`, which reads a `db.json` from a **public** GitHub repo.

1. A ready-to-use `db.json` is already in this project root (3 events).
2. Create a **new public** GitHub repository (e.g. `events-mock`).
3. Put `db.json` in the root of that repo and push it:
   ```bash
   # in an empty folder:
   git init
   cp /path/to/events-for-good/db.json .
   git add db.json
   git commit -m "add db.json"
   git remote add origin https://github.com/<your-username>/events-mock.git
   git branch -M main
   git push -u origin main
   ```
4. Your mock server URL is now:
   `https://my-json-server.typicode.com/<your-username>/events-mock`
   and the events endpoint is:
   `https://my-json-server.typicode.com/<your-username>/events-mock/events`
   Open that URL in the browser to confirm you see the 3 events (step 14.4).

## Wire the URL into the app (steps 15/16)

Open `src/services/EventService.ts` and replace the placeholder:

```ts
baseURL: '[your mock server url]',
```

with (note: NO trailing `/events` here — the service adds `/events`):

```ts
baseURL: 'https://my-json-server.typicode.com/<your-username>/events-mock',
```

Save and run `npm run dev`. The event cards will now load from your mock server.

## Step 14.5 — add a new event (staff check)

Add a 4th object to the `events` array in your **mock repo's** `db.json`, commit, and push.
Refresh `https://my-json-server.typicode.com/<your-username>/events-mock/events` to show the staff
that the new event appears.

> Note: `my-json-server` is a free shared service and can be slow or briefly rate-limited. If the
> list doesn't load, wait a few seconds and refresh.
