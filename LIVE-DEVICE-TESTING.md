# KODE live-device testing

Test candidate: 3 November 2026. Actual device results are still pending.

Use one shared HTTPS address for every device. A Windows file path or OneDrive preview is not a hosted app. Publish the contents of live-test-release to the chosen static host; index.html must be at the site's root. Existing settings and saved recipes are browser/device/site-specific. Export any recipes needed before changing site address.

## Devices

- iPhone: Safari, portrait and landscape; note model and iOS version.
- Android: Chrome, portrait and landscape; note model and Android version.
- Windows: Chrome or Edge at 100% zoom, small laptop and large display.
- Mac if available: Safari and Chrome.

## First visit

1. Open Home. Verify both paths, setup and learning actions are readable and reachable.
2. Open Equipment & setup. Close it. Open Discover. Return Home.
3. Open Settings: choose Ask me each time, Real time, guidance on. Close and reload. Check persistence.
4. Choose Foundation. Select each brew size and strength; verify the recipe changes together.
5. View the recipe, close it, reopen it; no blank screen or trapped overlay.

## Learning

1. Go through all eight Foundation slides. Back and Next must remain in the same desktop position.
2. Check all text, illustrations, captions and controls; no clipping or overlap.
3. Run water practice: start, pause, continue, finish and replay. Continue to the next slide.
4. Open demonstration. It must replace the slides and wait for your Start click.
5. Play/pause, drag timeline, show/hide guidance, open/close recipe.
6. Test Real time, 2x, 4x and 8x; verify speed setting survives reload.
7. Watch the countdown, following pour and final drawdown. Check alert does not obscure essential controls.
8. During learning, select another EVO tab. Confirm its guide starts at the beginning.
9. Home must always return to path choice and stop the previous playback.

## Foundation and dilution

1. Foundation must not request a dilution finish.
2. Dilution: choose size, starting brew and a lighter destination. Try both small and large water additions.
3. Check route name, colour, destination, amount and recipe card agree.
4. Finish the brew. Planned dilution should continue without a second path-selection request.
5. Zero the scale, start dilution, pause, resume and complete. It must stop at the stated amount.
6. Smaller additions pour gently; larger additions taper near the target.
7. Try the standalone calculator with your own figures. Invalid inputs must not produce a plausible-looking result.

## Saved recipes and printing

1. Save, rename and load a Foundation recipe and a dilution recipe.
2. Check loaded size, strength, target and added-water amount.
3. Export; verify the saved file exists. Import it and verify recipes remain usable.
4. Preview playing-card and A6 formats. Check no text is cut off; dilution instructions included.
5. Test PDF saving on a desktop; phone print/save options depend on the browser.

## Report an issue

Device / OS / browser:
Screen and path:
Brew size / starting strength / destination:
Steps to reproduce:
Expected:
Actual:
Screenshot or screen recording:

Start with navigation blockers and incorrect amounts, then clipping/overlap, then visual polish. Make one fix at a time and recheck the affected route on phone and desktop.

## Preparation checks already completed

- Mobile viewport and UK English document language present.
- Linked local files exist and are included in the release folder.
- Active JavaScript and inline scripts parse.
- Original mixing animation retained; experimental overlays removed.
- No physical iPhone, Android or desktop browser acceptance test has been completed by the assistant.
