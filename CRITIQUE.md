# Design critique — Digital Invite v2 (live build, Nov 7 2026)

Reviewed: shots/closed.png, crack.png, flap.png, mid-open.png, opened.png, opened-full.png, opening.mp4 at 390×844.

## What works
- The ginkgo-relief texture and photoreal wax seal sell the "luxury stationery" moment immediately. The closed state is the strongest frame.
- The seal crack reads clearly and the palette is cohesive.

## Problems (most to least important)
1. **The reveal has no payoff (motion/story).** After the flap opens, ~1.5 s of empty petal texture (mid-open.png) before a hard swap to a flat cream page. Nothing comes *out of* the envelope. That's the moment the reel is about, and it's missing.
2. **Opened card is a generic web page (hierarchy/typography).** Names, "&" and date all have similar weight; "&" in the script face at 64px is as loud as the names. Section labels, plain hairlines and outline pill buttons look like a template. No ornament, frame or paper feel; the jump from tactile envelope to flat #fbf6f1 is jarring.
3. **Timing/easing.** Total ~5.2 s with dead time; the flap and slide-away use similar curves, so it feels mechanical. The flap flips up off-screen instead of reading as hinged paper. No anticipation on tap (the seal doesn't depress).
4. **Realism.** No envelope liner when the flap opens; the pocket and flap edges have no paper thickness/edge highlight. Shadow under the flap is uniform.
5. **Spacing/rhythm.** Sections are evenly 36px with identical dividers; nothing breathes around the names; RSVP form is cramped and the inputs are default-styled.
6. **Mobile feel.** No haptic or press feedback, no way to replay, the page jumps when scroll unlocks, no personalization (every guest sees the same thing).
7. **Accessibility.** Placeholder-only form labels; low-contrast hint text over texture; no visible focus ring; no reduced-motion path (a 5 s forced animation); music toggle has no state.
8. **Performance.** 290 KB PNG seal + 225 KB JPG texture; render-blocking Google Fonts with no preconnect; frame capture shows the large drop-shadow filter repainting.
9. **Configurability.** Only raw colors; the monogram is baked into the seal; no themes.

## Fixes made (v3)
- New choreography (~4.6 s, reduced-motion = 0.6 s fade): seal depresses on press (+ haptic) → cracks with a short gold-dust burst → flap opens on a slow ease-out with visible **liner** → **invitation card rises out of the pocket** with names letterpressed → envelope drops away and the full card settles in. Sections then reveal with a gentle stagger on scroll.
- Card redesign: framed paper with subtle grain, double-rule frame, ornament dividers, small-caps labels, names large with a quieter italic "&", date line with hierarchy, live **countdown**, styled form with real labels, filled primary button.
- Envelope realism: liner pattern, paper-edge highlight on flap and pocket, softer layered shadow; subtle **parallax tilt** (pointer / device motion where allowed) on the closed envelope only.
- Options: themes (blush, sage, navy, ivory), seal colors, `?to=Name` personalization, replay button, optional music with fade-in, particles on/off.
- A11y/perf: real labels, focus-visible rings, aria-live status, prefers-reduced-motion, WebP assets (seal 290→40 KB, texture 225→163 KB), font preconnect + display=swap, fewer animated filters.
- Cut on purpose: falling-petal loops, confetti, sparkle cursor, auto-playing audio. They cheapen it.
