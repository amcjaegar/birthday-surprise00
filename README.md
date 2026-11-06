# 🎁 Birthday Surprise

A cinematic, romantic birthday website built with React + Vite.
Gift box → letter → "ONE LAST SURPRISE" → video → HAPPY BIRTHDAY celebration.

## Run it locally
```bash
npm install
npm run dev        # open the URL it prints
```
Requires Node.js 18+.

## Make it yours
| What | Where |
|---|---|
| Message, signature, button labels, final text, **storybook pages & proposal wording** | `src/config.js` |
| Background video (page 1) | replace `public/assets/background.mp4` |
| Surprise video (pop-up) | replace `public/assets/surprise-video.mp4` |
| Background music | replace `public/assets/birthday-music.mp3` |
| Colours | CSS variables at the top of `src/App.css` (`--rose`, `--gold`, `--lav`, `--plum`, `--cream`) |
| Fonts | the `<link>` in `index.html` and `--serif` / `--sans` in `src/App.css` |

The files in `public/assets` are tiny placeholders. Keep the same filenames or change the paths in `src/config.js`.
Write the message in `config.message`; a blank line starts a new paragraph, and any length works.

**Media tips:** use H.264 `.mp4` (plays everywhere). Keep the surprise video under ~50 MB
(GitHub limit is 100 MB per file). For the background video, 720p and 10–20 s is plenty.

## How it behaves
- The background video is muted and loops (browsers only allow muted autoplay).
- Music never starts on its own. It starts when she clicks **OPEN YOUR GIFT** (set `startMusicOnGiftOpen: false` to disable) and the 🎵 button toggles it. It pauses during the surprise video and resumes afterwards.
- The **ONE LAST SURPRISE** button appears only once the end of the letter is visible.
- The final screen appears only after the video ends. The × button just closes the pop-up; the surprise button stays so it can be reopened.
- Missing media never breaks the site: no background video shows the gradient, no music does nothing, and no surprise video shows a message with a Continue button.

## The storybook (exactly 4 pages)
**Watch it again** opens a storybook: Pages 1–3 are story pages, and turning Page 3 reveals Page 4, the proposal (YES / NO).
The NO button dodges the cursor/finger and stays on screen. YES plays the ring, diamond sparkles, sunflower petals and golden confetti.
All text lives in `config.storybook`.

## Mobile
Styles are mobile-first (designed for 360–430px, with safe-area/notch support and a dedicated landscape-phone layout), then enhanced for tablets and desktops.

## Deploy to GitHub Pages

### Option A: automatic (recommended)
1. Create a new repository on GitHub, e.g. `birthday-surprise`.
2. Upload this project (the `.github` folder included), then:
   ```bash
   git init
   git add .
   git commit -m "Birthday surprise"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/birthday-surprise.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Each push to `main` builds and publishes. Your link will be
   `https://YOUR-USERNAME.github.io/birthday-surprise/` (see the **Actions** tab for progress).

### Option B: one command
```bash
npm run deploy
```
Then in **Settings → Pages**, choose **Deploy from a branch → `gh-pages` → `/ (root)`**.

The site uses relative paths (`base: './'`), so no config change is needed for any repository name.

## Troubleshooting
- **Video doesn't play on iPhone:** re-encode as H.264 + AAC `.mp4`.
- **Changes not showing after deploy:** hard-refresh (Ctrl/Cmd + Shift + R).
- **Blank page on Pages:** make sure Pages source is set to *GitHub Actions* (Option A).

## Structure
```
src/App.jsx                    scene switching, music, transitions
src/config.js                  all editable content
src/components/GiftPage.jsx    page 1
src/components/MessagePage.jsx page 2 (letter + end-of-scroll button)
src/components/VideoModal.jsx  surprise video pop-up
src/components/BirthdayReveal.jsx  final celebration
src/components/Storybook.jsx   4-page storybook (3 story pages + proposal page)
src/components/Proposal.jsx    page 4: Will you marry me? + dodging NO button
src/components/Celebration.jsx page 4 after YES
src/components/Ring.jsx        engagement ring animation
src/components/Sunflower.jsx   sunflower decoration
src/components/Particles.jsx   glitter, confetti, hearts, fireworks (one canvas)
```
