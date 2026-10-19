# CPSS static website — v08

Extract `cpss_static_website_v08.zip` into your Git repository. `index.html`, `assets/`, and the page folders belong directly at the repository root. No install, build step, framework, or server application is needed.

## What changed in v08

V08 starts from your **edited v07 ZIP**. The existing homepage/project content,
project listing, shared styles, thumbnails, graphs, galleries and hosting setup
are preserved. No project archival feature has been added.

- The Team page contains the approved 20-person roster: Elected Board,
  Archerfish, Booster, Liquids and one Advisor. Names and roles are editable
  directly in its HTML. Noah's supplied headshot is connected. The other four
  uploaded headshots do not belong to the approved roster and remain as unused
  assets; they have not been assigned to anyone else.
- Team photographs include the current homepage hero photograph plus the two
  supplied certification-team photographs, using the existing carousel.
- The Spring 2026 quarterly update has its own physical page under
  `updates/spring-2026-quarterly-update/`, is listed in Updates, and links to the
  original PDF. Its label is a reporting period, not an invented publication date.
- Every link to the sponsorship/support page has `data-sponsorship-link hidden`.
  The page and anchor code remain. See `SPONSORSHIP_VISIBILITY.md` to restore them.
- Newly supplied headshot filenames are lowercase and hyphenated under
  `assets/images/team/`. Photo bytes are unchanged. See `TEAM_CONTENT.md`.
- Duplicate doctypes inherited from the export are corrected.

`CHECKS.md` records v08 validation and its limits. The existing Plotly CDN
dependency remains; see `VENDOR.md`. This revision does not change chart code.

## Folder structure

- `index.html`: homepage text, meetings, full-screen video area, featured projects, YouTube and album links.
- `assets/css/project.css`: approved Stitch project layout and aligned timeline geometry.
- `assets/js/project.js`: project goal reveal, gallery and CSV parsing helper.
- `assets/js/data-charts.js`: shared Plotly dataset loading and interaction.
- `assets/data/measurements/`: measurement CSVs and a header-only template.
- `assets/css/team.css`: Team-page headshot slots and bounded, uncropped group photos.
- `assets/css/site.css`: shared style, font declarations, gold accents, topo placements, mobile rules.
- `assets/js/site.js`: shared navigation, filtering/sorting, galleries, video controls, image enlargement, inquiry handling.
- `assets/data/content.js`: project/publication/update previews and contact settings.
- `assets/images/`: supplied photos, logos, and topo SVGs.
- `assets/documents/`: Archerfish CDR PDF and PowerPoint.
- `assets/fonts/`: supplied Space Grotesk variable webfont, license, and author information.
- `projects/index.html`: all active projects, with tag filters and sorting.
- `projects/project-template/index.html`: complete modular template for duplication.
- `projects/<slug>/index.html`: one real page for every listed project.
- `publications/index.html`: publication directory.
- `publications/archerfish-cdr/index.html`: supplied CDR record and downloads.
- `publications/publication-template/index.html`: reusable record template.
- `team/index.html`: group-photo carousel, editable roster, inquiry form.
- `support-us/index.html`: sponsor placeholders and support pathways.
- `updates/index.html`: Professional Updates and Club Blog.
- `updates/article-template/index.html`: reusable article template.
- `updates/spring-2026-quarterly-update/index.html`: published quarterly roundup. The two older sample articles remain as unlisted editing drafts.
- `.nojekyll`: serve the site directly through GitHub Pages.

## Edit project previews and homepage selection

Edit `assets/data/content.js`. Each object in `projects` controls its preview title, status, tags, summary, lead, date, thumbnail, alt text, and homepage selection. Full project body content stays in HTML.

All ten active entries from your upload remain listed. NILE's disabled draft is preserved in a comment after the catalog; it is intentionally not listed and has no detail page until activated.

Tags are quoted strings, such as `"Liquid Propulsion"`. Tag buttons are created automatically from the same strings used for matching. Use consistent capitalization. Sorting defaults to catalog order; name/date sorting is also available. Use a single `YYYY-MM-DD` date for date sorting. Missing or invalid dates sort last. Air Brakes retains your edited `2024` date value. A full `YYYY-MM-DD` is preferable when you know the exact date.

To select homepage projects, set `featured: true` only on the chosen objects. Your upload selects Archerfish, Air Brakes, and SILL-E. `CPSS_SETTINGS.homeProjectLimit` is currently `3`; set it to `2` to show only the first two featured entries. All projects remain on the Projects directory regardless of this setting.

Thumbnail example:

```js
"thumbnail": "assets/images/archerfish-01.png",
"thumbnailAlt": "Archerfish liquid rocket",
"featured": true
```

Use site-root-relative paths without a leading slash, with the actual file extension. An empty thumbnail shows a neutral placeholder. The Projects directory preserves the original image aspect ratio. The homepage intentionally uses wide featured-image areas.

## Edit or add project detail pages

Edit `projects/<slug>/index.html` for background, goals, current work, specifications, optional modules, and gallery captions. These pages were populated from the uploaded catalog; unknown material remains clearly marked rather than invented. Archerfish retains your submitted technical fields and milestones.

1. Copy `projects/project-template/` into `projects/my-project/`.
2. Replace the title, description, heading, summary, status, tags, and lead in its HTML.
3. Add the matching preview to `assets/data/content.js` using `slug: "my-project"`.
4. Add supplied photos/documents and remove optional modules you do not need.
5. Preview and click its directory link.

Slug spelling and capitalization must exactly match the folder. Keep slugs lowercase with hyphens. In detail pages, keep `data-base="../../"` and existing `../../` asset paths.

Preview metadata and detail-page header text are intentionally separate static HTML. If a title, status, summary, or lead changes, update both the catalog and the detail page.

Specifications use a `<dl>`: duplicate a `<div>` containing `<dt>` (label) and `<dd>` (value and units). All supplied Archerfish numbers were retained; see `EDITING_NOTES.md` for fields needing confirmation.

### Galleries

Find the `GALLERY FIGURE` comment. Copy a complete figure to add a slide:

```html
<figure data-slide>
  <img src="../../assets/images/my-photo.jpg" alt="Describe the actual photograph" loading="lazy">
  <figcaption>Your caption</figcaption>
</figure>
```

Team-page images use `../assets/images/...`. Slides are read directly from HTML. Previous/next, arrow keys, and swipes work without a separate data array. Single-slide galleries disable previous/next. Galleries never advance automatically.

To enable image enlargement, wrap a real image with `<button type="button" data-enlarge aria-label="Enlarge photograph">...</button>`. The existing shared dialog handles dismissal.

## Publications and documents

PDFs and presentations belong in `assets/documents/`, not images. The supplied Archerfish files are:

- `assets/documents/liquid-rocket-2025-26-cdr.pdf`
- `assets/documents/liquid-rocket-2025-26-cdr.pptx`

To add another publication, copy the publication template to a new folder and add its metadata to the catalog. Keep a normal Open PDF link and a `download` link beside embedded previews for browsers that cannot show the PDF inline. Do not infer publication dates from file timestamps.

## Homepage, team, updates, and support

Meeting details and club text are in `index.html`. Your Monday 6:00 PM and Saturday 10:00 AM schedules were preserved. Member names, positions, headshots, group photos, and personal links are in `team/index.html`. Sponsor and support content is in `support-us/index.html`. Missing Team headshots remain clearly marked; unavailable person links are omitted. Other unfinished sponsor and project content remains editable.

Unavailable optional person/sponsor destinations are now plain text rather than fake links. To activate one, replace the span with an anchor containing the real URL. External web links use `target="_blank" rel="noopener noreferrer"`; mail links use `mailto:`.

The header and footer are static HTML on every page for easy editing. If you change their structure later, apply the same change to every HTML page, including templates. Relative URL prefixes vary by depth.

## Video, typography, and topo

Your YouTube embed and Nextcloud album-cover link remain on Home. The full-screen hero currently displays your supplied `photo-album-thumbnail.jpg` image. To switch to footage, replace that hero image with:

```html
<video class="home-hero-media" data-background-video autoplay muted loop playsinline poster="./assets/images/video-poster.jpg" aria-label="CPSS club footage">
  <source src="./assets/videos/club.mp4" type="video/mp4">
</video>
```

Add `<button type="button" data-video-toggle>Pause video</button>` inside the same hero section, and provide the referenced local files. The shared handler respects reduced motion and handles the button once per video. Use native controls and captions for foreground videos containing speech.

Space Grotesk is supplied locally. Munistic remains reserved for headings but was not provided; headings fall back to Space Grotesk. Add your licensed `assets/fonts/Munistic.woff2` and enable the commented font declaration to use it.

Each body sets `--topo-image`. Main and local section pseudo-elements place the supplied SVGs. Shared gold variables and all v02/v03/v04 refinements are labeled in `site.css`.

## Contact

`CPSS_SETTINGS.contactEmail` is now `cpss@calpoly.edu`, matching your supplied links. The inquiry form opens an encoded email draft; the visitor must send it. GitHub Pages cannot send mail by itself. A hosted endpoint can be configured later; see `FORMS.md`.

## Preview and publish

From the extracted root, run `python -m http.server 8000` (or `py -m http.server 8000` on Windows), then open `http://localhost:8000/`. VS Code Live Server also works. Folder routes need a static server rather than `file://`.

Publish the repository root through GitHub Pages. Relative paths work on both custom-domain roots and `username.github.io/repository/`. Keep trailing slashes on folder routes. No URL rewriting or Git directory is included. The supplied `CNAME` contains `cpss.club`; retain it and your GitHub Pages custom-domain setting.

Normal PowerShell workflow:

```powershell
git pull
# Edit files and preview locally.
git status
git add .
git commit -m "Describe change"
git push
```

See `CHECKS.md` for verification and `EDITING_NOTES.md` for unfinished content.

## Project editing

Edit each project's visible content directly in `projects/<slug>/index.html`. The HTML comments mark blocks to duplicate for specifications, goal rows, milestones, datasets and gallery figures. The template follows the same layout as real projects.

Milestone status values are `completed`, `ongoing`, or `planned`; change the visible status label too. Dates alone do not establish completion. Additional details use native `<details>` blocks.

Local media in HTML uses `../../assets/images/filename.jpg` for project details. Catalog thumbnails use `assets/images/filename.jpg` without a leading slash. Match `.JPG` versus `.jpg` exactly. If an image fails, check the slash, case and latest Pages deployment first.

The domain file `CNAME` contains `cpss.club`. Keep it and `.nojekyll` at the publishing root. Publish from `main` / `(root)` in GitHub Pages settings and preserve the configured custom domain when updating the repository.

## Previously completed feedback

- Pump content is part of Archerfish, not a separately listed project.
- Ablative Engine naming is consistent; its existing folder route is retained.
- Project summaries below titles use 17–20 px responsive type.
- Primary project images have a desktop cap of 640 px / 70vh, and a mobile cap of 55vh, with `object-fit: contain`.
- New booster/certification replies and supplied booster media are incorporated.
- Historical test data is connected to the Ablative Engine page without guessed physical calibration.

Before pushing, run `git pull` and retain any repository changes not present in this archive. The archive contains the site files at its root, not a wrapper folder. Local CSV loading requires the local HTTP preview described above.

## Editing v07 galleries/history

In a project HTML file, copy a `figure` marked `data-project-slide` to add a gallery photo. In the homepage history carousel, copy a `figure` marked `data-slide`. Set the local path, meaningful alt text and caption. Preserve the controls and data attributes.

Edit history prose directly in `index.html`; source notes are in `HISTORY_SOURCES.md`. Change preview thumbnails in `assets/data/content.js`, using `assets/images/filename.jpg` without a leading slash. Changing filenames requires updating every reference; `ASSET_NAMES.md` records this revision's changes.

For the booster PDF, edit the `<object>` inside its Documentation & Publications section. Its Open/Download links remain available if a mobile browser cannot embed PDFs.

## Edit Updates

The preview is in `assets/data/content.js` under `updates`; the full article is
in its own `updates/<slug>/index.html`. To add a post, copy
`updates/article-template/` to a new slug folder, edit its HTML, and add one
matching catalog entry. Use category `professional` or `blog` for the filters.
The sample professional/blog drafts are intentionally not listed publicly.

Use `date: "YYYY-MM-DD"` when known. If only the quarter is known, leave date
empty and add `dateLabel: "Spring 2026"`, as in the included post. The short
description and title in the catalog control the listing; keep its title in
sync with the full article. The source report is in `assets/documents/`.

For Team photos and sponsorship-link visibility, see `TEAM_CONTENT.md` and
`SPONSORSHIP_VISIBILITY.md` respectively.
