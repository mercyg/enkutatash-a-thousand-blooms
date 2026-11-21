# Enkutatash · A Thousand Blooms 🌼

A browser game inspired by Ethiopian New Year. Explore a sunlit village, collect golden adey flowers, and bring bouquets to your neighbors before the 90-second round ends.

**[Play the game](https://enkutatash-a-thousand-blooms.blue-sky.chatgpt.site)**

## How to play

1. Enter a name—no email, password, or sign-up required.
2. Collect five golden flowers to make a bouquet.
3. Follow the golden trail to the highlighted home and walk into its delivery circle.
4. Keep delivering before sunset. Quick deliveries build a score multiplier.
5. Watch out for goats! They can knock a flower out of your bouquet. Dash past them to protect it.

| Action | Control |
| --- | --- |
| Move | WASD or arrow keys |
| Dash | Space |
| Pause / resume | P, Escape, or the pause button |
| Music | Music button in the header |

Touch devices have an on-screen joystick and dash button.

## The leaderboard

Completed rounds automatically submit a score to a shared leaderboard. It shows the top 20 players, keeps each player's best score, and displays your own rank. Ties go to whoever reached the score first.

Players are remembered using a private browser cookie. Two people can choose the same name without sharing scores. Clearing browser data or using another browser or device creates a separate player; there is no account login or cross-device recovery.

Names and best scores are visible to everyone on the leaderboard. The hosted database and private player tokens are **not included in this repository**.

This is a casual game. The server validates round timing and scoring events, but it is not a fully cheat-proof competitive system.

## Run locally

Use Node.js 24 or newer and npm. The local server uses Node's built-in SQLite support.

```bash
git clone https://github.com/mercyg/enkutatash-a-thousand-blooms.git
cd enkutatash-a-thousand-blooms
npm ci
npm run build
npm run dev
```

Open [localhost:4174](http://localhost:4174).

The local leaderboard uses `.local-game.sqlite`, which is created automatically and ignored by Git. Local play does not write to the live game's leaderboard.

After editing the source, rebuild and restart the development server; it serves the compiled files rather than reloading changes automatically.

## How it is built

- **Game:** plain JavaScript and HTML Canvas, with CSS for the interface.
- **Sound:** synthesized in the browser with the Web Audio API.
- **Backend:** a Cloudflare Worker with a D1 database for players and scores.
- **Database migrations:** Drizzle-generated SQL.
- **Hosting:** Sites.

| File or directory | Purpose |
| --- | --- |
| `game.js` | Village rendering, movement, flower collecting, and scoring |
| `community.js` | Player names, score submission, and leaderboard interface |
| `index.html`, `style.css` | Page structure and styling |
| `worker/` | Backend routes and player-session handling |
| `db/schema.ts`, `drizzle/` | Database schema and migrations |
| `scripts/` | Build tools and local development server |
| `tests/` | Backend and scoring tests |

## Tests and database changes

```bash
npm run build
npm test
```

Tests cover player sessions, score persistence, ranking, duplicate submissions, input validation, and scoring rules.

After changing `db/schema.ts`, generate and inspect a new migration:

```bash
npm run db:generate
```

## Hosting your own copy

The checked-in `.openai/hosting.json` identifies the original Sites project. For a separate deployment, register your own project and replace that project ID. The backend needs a D1 binding named `DB` and the migrations in `drizzle/` applied before serving requests. The build produces the Worker entry point at `dist/server/index.js`.

Pushing to GitHub alone does not deploy the game. GitHub Pages cannot run the leaderboard backend.
