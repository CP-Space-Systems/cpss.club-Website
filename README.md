# CPSS static website — v04

Extract `cpss_static_website_v04.zip` into your Git repository. `index.html`, `assets/`, and the page folders belong directly at the repository root. No install, build step, framework, or server application is needed.

## What changed

This version starts from your edited v03. Your homepage text, meeting times, YouTube video, album link, photographs, project catalog, and Archerfish technical content are preserved. All ten listed projects now have physical detail pages. Headers and footers share the same structure and routes across all pages, with the confirmed club email and social links. Local paths work under either a custom domain or a GitHub Pages repository subfolder.

The Archerfish CDR has a publication record, an embedded PDF preview, and PDF/presentation downloads. Documents moved out of images into `assets/documents/`. The hot-fire thumbnail filename was simplified; its image bytes are unchanged. The incorrect Archerfish browser title, broken checklist markup, stale example routes, and duplicated background-video handler were fixed.

## Folder structure

- `index.html`: homepage text, meetings, full-screen video area, featured projects, YouTube and album links.
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
- `updates/article-template/index.html`: article template; the existing two placeholder articles remain linked.
- `.nojekyll`: serve the site directly through GitHub Pages.

## Edit project previews and homepage selection

Edit `assets/data/content.js`. Each object in `projects` controls its preview title, status, tags, summary, lead, date, thumbnail, alt text, and homepage selection. Full project body content stays in HTML.

All ten active entries from your upload remain listed. NILE's disabled draft is preserved in a comment after the catalog; it is intentionally not listed and has no detail page until activated.

Tags are quoted strings, such as `"Liquid Propulsion"`. Tag buttons are created automatically from the same strings used for matching. Use consistent capitalization. Sorting defaults to catalog order; name/date sorting is also available. Use a single `YYYY-MM-DD` date for date sorting. Missing or invalid dates sort last. Air Brakes retains your `2024-2026` range, which needs a single date if you want it included in date sorting.

To select homepage projects, set `featured: true` only on the chosen objects. Your upload selects Archerfish, Air Brakes, and SILL-E. `CPSS_SETTINGS.homeProjectLimit` is currently `3`; set it to `2` to show only the first two featured entries. All projects remain on the Projects directory regardless of this setting.

Thumbnail example:

```js
"thumbnail": "assets/images/af_thumb1.png",
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

Meeting details and club text are in `index.html`. Your Monday 6:00 PM and Saturday 10:00 AM schedules were preserved. Member names, positions, headshots, group photos, and personal links are in `team/index.html`. Sponsor and support content is in `support-us/index.html`. Unknown team, sponsor, article, and project details remain labeled placeholders.

Unavailable optional person/sponsor destinations are now plain text rather than fake links. To activate one, replace the span with an anchor containing the real URL. External web links use `target="_blank" rel="noopener noreferrer"`; mail links use `mailto:`.

The header and footer are static HTML on every page for easy editing. If you change their structure later, apply the same change to every HTML page, including templates. Relative URL prefixes vary by depth.

## Video, typography, and topo

Your YouTube embed and Nextcloud album-cover link remain on Home. The full-screen hero is still a video placeholder because no background footage was supplied. Replace its placeholder with:

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

Publish the repository root through GitHub Pages. Relative paths work on both custom-domain roots and `username.github.io/repository/`. Keep trailing slashes on folder routes. No URL rewriting, Git directory, or CNAME is included. Retain any existing CNAME when merging into your repository.

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
