# Editing v09

## Project content and thumbnails

Preview metadata is in `assets/data/content.js`; complete page content remains
in `projects/<slug>/index.html`. SILL-E, TVC and throttling were updated in both
places. Other catalog entries, ordering and featured flags are preserved.
Survey completion dates are content-update dates, not start dates or proof of
milestone completion. Do not infer a successful test from a target value.

New thumbnail examples:

```js
"thumbnail": "assets/images/sille-engine-cutaway.png",
"thumbnailAlt": "Cutaway CAD rendering of a SILLE engine"
```

```js
"thumbnail": "assets/images/tvc-gimbal-assembly.jpg",
"thumbnailAlt": "Thrust vector control gimbal hardware and linear actuators"
```

Keep catalog image paths free of a leading slash. On project detail pages,
use `../../assets/images/filename.ext`. Match case and extension exactly.
If a file fails to load, check those items and the latest deployment first.

## Hidden sections and captions

`hidden` on the outer section removes the entire module and its spacing.
Its content remains in the HTML. Populate it, then remove that attribute:

```html
<section class="content-section" id="video" aria-labelledby="video-heading" hidden>
```

The same approach is used for placeholder captions, hero frames and empty
milestone details. Keep real galleries visible; add a slide by copying one
whole figure. No second JavaScript list needs editing.

## Restore graphs

All graph sections are hidden in this release. Ablative Engine's HF10
configuration and all original CSVs are intact. To restore a page's graph:

1. Remove `hidden` from its outer `section id="data"`.
2. Uncomment its `data-charts.js` script in the head, using the existing path.
3. Configure a real dataset in its `data-chart-config` JSON if the list is empty.
4. Preview through HTTP and test the graph before deployment.

Example active loader for project pages:

```html
<script defer src="../../assets/js/data-charts.js"></script>
```

The preserved chart controller still uses the previously configured Plotly CDN
when re-enabled. See `VENDOR.md` for local hosting. No Plotly script or CSV is
requested while these page loaders are disabled.

## Fonts

`assets/css/site.css` declares local Munistic Regular using WOFF and an original
TTF fallback. The heading stack starts with Munistic; body/navigation use local
Space Grotesk. The font is a single regular face, not a 100–900 variable font.
Keep both Munistic files and the supplied Space Grotesk file in the repository.

Stylesheet query strings are now `?v=09`. On a future CSS revision, updating that
version across page stylesheet links helps devices fetch the changed CSS.
After GitHub Pages finishes deploying, reload on the iPad. Device rendering
was not available for testing in this authoring environment.

## Team and sponsors

The five Team section eyebrows have class `team-eyebrow`; edit its font size
in `assets/css/team.css`. Empty headshot slots keep initials but have no
“Photo coming soon” text. Roster edits remain in `team/index.html`.

Sponsorship links remain marked `data-sponsorship-link hidden`. Restore them
using `SPONSORSHIP_VISIBILITY.md` when that page is ready. Its code is retained.
