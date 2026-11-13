# DJ Balle retro quiz

An unofficial, Danish-language, early-2000s-inspired static fan quiz about **BalleDj, whose Eventzonen profile lists Silkeborg as his hometown**. Built with HTML, CSS and browser-native JavaScript modules; no build step or runtime dependencies.

## Play

Published at https://jbacim.github.io/dj-balle-quiz/ using GitHub Pages from the repository root on `main`.

For local development, serve this directory over HTTP (for example `python -m http.server 8000`) and open `http://localhost:8000`. ES modules should not be opened using `file://`.

## Content provenance

Seven questions paraphrase the public [BalleDj Eventzonen profile](https://eventzonen.dk/balledj), accessed 13 November 2026: hometown, approximate start year, full-time experience, countries worked in, named venue, audience-led music selection, and reported weddings in 2024. The biography is self-reported; these claims have not been independently corroborated. The site explicitly identifies this profile to avoid confusion with namesakes.

The eighth question, **"Which song does he love?"**, has the answer **"Portugal"**, as explicitly supplied by the person commissioning the quiz. It is labelled creator-supplied and not independently verified online. The other two options are distractors. No artist attribution is invented for "Portugal".

The quiz displays explanations and source links immediately after each answer and in a final review. A polaroid-style portrait embeds the profile photo directly from Eventzonen's Cloudinary image provider, with a visible source link, descriptive Danish alt text, reserved dimensions, and no referrer. The image is not copied into this repository; its original rights holder retains the rights. No music recordings are included. Google Fonts supplies optional typefaces with system-font fallbacks. The animated player is decorative, not a functional audio player; the wordmark is decorative, not a domain claim.

## Behaviour and accessibility

Eight questions, three options each, one scored answer per question, explicit next-question controls, a final score, answer review and restart. All visitor-facing copy and accessible labels are Danish (`lang="da"`). Native buttons support keyboards, feedback is announced through a live region, and headings receive focus on transitions. Animations can be paused and respect `prefers-reduced-motion`. The responsive layout is checked at 320, 375, 768 and 1280 pixels without horizontal overflow, with answer targets at least 44 pixels tall. No cookies, analytics, accounts, or persistent scores.

## Checks

Run `npm test` for quiz data and state-transition tests, and `npm run check` for JavaScript syntax checks. No dependency installation is needed.
