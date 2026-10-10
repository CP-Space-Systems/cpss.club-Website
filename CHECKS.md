# Verification — v04

Checked on 2026-10-06:

- All 22 physical HTML pages have a main landmark, one main heading, local shared assets, and a topo background.
- All 485 local HTML references resolve, including images, font preloads, document files, physical folder routes, and fragment destinations. CSS background/font references were also checked.
- Header and footer structures and destinations were compared across all pages after resolving relative paths. They match, apart from current-page indicators.
- Every active catalog project has a physical detail page, matching title, preview summary, and thumbnail path. There are ten active projects. Disabled NILE is not listed.
- Archerfish's stale browser title and invalid checklist markup were repaired. Its six checklist items, goals, timeline, and technical values were retained.
- The supplied PDF and presentation are connected to a real publication record and direct download links. Document files are organized under assets/documents.
- Both JavaScript files pass Node syntax validation.
- The shipped script initializes against DOM trees parsed from every page without exceptions.
- Every actual project tag was tested against the active ten-project catalog. Additional tests cover tag renaming with special characters, alphabetical/date ordering, invalid dates last, and empty filtered results.
- Tests cover mobile menu toggling, Escape/focus return, link-close, homepage header reveal, category controls, gallery wrap-around, keyboard/swipe navigation, one-slide disabled controls, and image enlargement.
- The homepage displays the user's three featured projects; a configurable limit of two was also tested.
- A background-video mock receives exactly one toggle handler; consecutive clicks play and pause. The duplicate handler was removed.
- Form tests cover a correctly encoded mailto draft with Unicode, newlines, ampersands, and literal plus signs, as well as mocked submission success/failure. No external message was sent.
- HTML, CSS, and JavaScript remain readable multiline files. The ZIP places website files at its root and contains no Git directory.

Limit: no browser executable is available in this environment. Browser rendering, real mobile overflow/focus behavior, external video/album availability, browser PDF playback, and the final email-application launch still need an actual browser check. DOM tests verify behavior rather than pixel layout. Original supplied images/documents are preserved; their technical accuracy and remaining content placeholders are listed in EDITING_NOTES.md.
