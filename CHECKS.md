# V08 verification

Starting point: the supplied `cpss_static_website_v07 edited.zip`.

## Performed for this revision

- Node syntax checks passed for content.js, site.js, project.js and data-charts.js.
- Checked 24 HTML files, 644 local file/fragment/style references, active CSS
  assets, JSON dataset paths, catalog thumbnails and catalog page routes.
- Verified the 20 roster names/roles against the approved list, five sections,
  Noah's actual headshot, and three local group photographs. The four removed
  survey members are absent from the public roster.
- All 48 links to the sponsorship page have both `data-sponsorship-link` and
  `hidden`. The page, destinations and original anchor code remain.
- Structural comparison confirms the existing homepage and every project page
  retain the edited v07 content/layout, apart from hidden sponsorship links
  and corrected duplicate doctypes. Shared site.css is byte-identical.
- Source comparison confirms project.js, data-charts.js, measurement CSVs,
  CNAME and .nojekyll are unchanged. Headshot bytes are preserved after renaming.
- The Spring 2026 article has a real physical folder route, period label,
  linked local report PDF and working no-JavaScript listing link. Placeholder
  articles are absent from the public catalog and remain as editing drafts.
- A minimal DOM harness initializes shared/project behavior on all 24 pages.
  It exercises mobile menus/Escape, shared and project carousel next/previous/
  keyboard controls, the Team swipe control, all project-tag filters, name and
  date sorting, three homepage features/scroll header, Updates categories,
  publication records, and the contact form's encodeURIComponent mailto URL.
- Catalog project/publication entries, thumbnails and homepage selections are
  preserved. Project archival has not been implemented.

## Practical limits

No browser rendering engine is installed in this environment. DOM tests do
not establish visual rendering, real email-client handoff, native PDF/video
playback or native Plotly interaction. Preview these in a browser before your
normal deployment. Plotly still uses the existing CDN configuration; see
VENDOR.md. Its code/data were preserved rather than redeveloped in v08.

Only Noah's supplied portrait matches the approved roster. Nineteen profiles
have clearly marked photo slots. Kevin/Shiv have no invented role; Evan's
surname and missing person contact details remain unspecified.

## Packaging

The final ZIP is checked for integrity, root index.html/assets/CNAME/.nojekyll,
valid file paths, and exclusion of Git metadata, development scripts, private
survey CSVs and installation dependencies. Each asset is below 100 MB.
