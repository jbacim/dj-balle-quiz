# DJ Balle retro quiz

An unofficial, Danish-language, early-2000s-inspired static fan quiz about **BalleDj, whose Eventzonen profile lists Silkeborg as his hometown**. Built with HTML, CSS and browser-native JavaScript modules; no build step or runtime dependencies.

## Play

Published at https://jbacim.github.io/dj-balle-quiz/ using GitHub Pages from the repository root on `main`.

For local development, serve this directory over HTTP (for example `python -m http.server 8000`) and open `http://localhost:8000`. ES modules should not be opened using `file://`.

## Content provenance

Questions cite the [BalleDj Eventzonen profile](https://eventzonen.dk/balledj) and [123festmusik's Mobil Diskotek ODEON - BalleDJ profile](https://www.123festmusik.dk/djvenga), accessed 13 November 2026. Both list Silkeborg. The booking profiles contain self-reported biography and service details, while Eventzonen includes customer reviews. These biographical claims have not been independently corroborated. The Eventzonen rating was 4.8/5 on the access date and may change; 123festmusik has a separate rating.

The answers **"Portugal"** and **"Lille Nat Mix"** (including its December 2011 dating) were supplied by the person commissioning the quiz. Both are labelled creator-supplied and not independently verified online. Other song and mix titles are distractors, not claims about preferences or releases.

The quiz displays explanations and source links immediately after each answer and in a final review. A polaroid-style portrait embeds the profile photo directly from Eventzonen's Cloudinary image provider, with a visible source link, descriptive Danish alt text, reserved dimensions, and no referrer. The image is not copied into this repository; its original rights holder retains the rights. No music recordings are included. Google Fonts supplies optional typefaces with system-font fallbacks. The animated player is decorative, not a functional audio player; the wordmark is decorative, not a domain claim.

## Behaviour and accessibility

Fifteen questions, with three or four options each, one scored answer per question, explicit next-question controls, a final score, answer review and restart. All visitor-facing copy and accessible labels are Danish (`lang="da"`). Native buttons support keyboards, feedback is announced through a live region, and headings receive focus on transitions. Animations can be paused and respect `prefers-reduced-motion`. The responsive layout is checked at 320, 375, 768 and 1280 pixels without horizontal overflow, with answer targets at least 44 pixels tall. No cookies, analytics, accounts, or persistent scores.

## Checks

Run `npm test` for quiz data and state-transition tests, and `npm run check` for JavaScript syntax checks. No dependency installation is needed.
