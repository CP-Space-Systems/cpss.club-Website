# Editing v10

## Castor and Pollux

- `assets/data/content.js`: titles, statuses, tags, summaries, leads, dates,
  thumbnails and homepage featured flags.
- `projects/castor/index.html`: existing engine renamed Castor. Its supplied
  specifications and milestones are preserved.
- `projects/pollux/index.html`: NILE/TVC twin engine, including source-qualified
  targets/model results and editable image figures.
- `projects/ablative-engine-successor/index.html`: legacy forwarder to Castor.
  Keep it to preserve old links. Do not edit its fallback text as the main page.

Pollux is inserted after Castor in the catalog but is not homepage-featured.
The homepage retains Archerfish, the booster program and Castor, with limit 3.
Changing tags still builds filter buttons automatically from those same tags.
An empty lead field now hides that preview line. The actual Pollux lead/date
were not supplied, so those fields remain blank rather than copying TVC's lead
or Castor's milestones. Add confirmed details later in the catalog and HTML.

## Pollux images

The original supplied image bytes are retained under normalized names:

- `assets/images/pollux-cad.png`: listing thumbnail, hero and gallery.
- `assets/images/pollux-cross-section.png`: full-width figure and gallery.

Copy a complete gallery figure to add a slide. Keep existing carousel data
attributes and controls. All new content uses the established project layout.

## Names, portraits and paths

Metztli's profile id is now `metztli-singha`; the actual headshot file is
`assets/images/team/metztli-singha.jpg`. Both were updated consistently.
Newly supplied board/member portraits use the same sizing as Noah's portrait.
Their alt text names the corresponding member. The added NILE team photograph
and all of the user's existing Team-carousel slides are preserved.

Team image paths start with `../assets/images/`; project images start with
`../../assets/images/`; catalog thumbnails start with `assets/images/`.
Do not add a leading slash. If an image fails, check the relative location,
filename, extension and capitalization before changing anything else.

The following supplied names were normalized with every reference updated:

- `Pollux_cad.png` to `pollux-cad.png`
- `Pollux_cross_section.png` to `pollux-cross-section.png`
- `CPSS_NileTeam.jpg` to `nile-team.jpg`
- `tvc-CAD.png` to `tvc-integration-cad.png`
- `metzli-singha.jpg` to `metztli-singha.jpg`
- `Shiva-pulmamidi.jpg` to `shiva-pulmamidi.jpg`

## Retained visibility settings

Sponsors remain marked `data-sponsorship-link hidden`. Graph sections remain
hidden and their loader scripts commented out. Measurement files are intact.
Pollux does not inherit historical Stratum/HF10 recordings or Castor's dated
milestones. It keeps empty timeline/video/data modules hidden for future use.
For re-enabling modules and graphs, see V09_EDITING.md. No archival feature
is introduced by the legacy route forwarder.


## Regen content update (same v10)

Source: “CPSS Website Info Request form.xlsx”, Regen Engine response, Sloan Robbins.
The page at projects/regen-engine/index.html now contains the submitted summary,
status, leads, background, five goals, current work, design specifications and
development timeline. The catalog summary/status match the page. Other catalog
fields and projects are unchanged.

All specifications are presented as submitted design/analysis values, not
measured hotfire results. The response does not establish an absolute/gauge
reference for pressure. The PDR is listed as October 17 without adding a year;
future test dates remain TBD. “Indefinite” cooling is an objective, not a result.

Four design-image links and the PDR link point to the supplied SharePoint files.
The attempted image request returned HTTP 403, so no remote image is embedded,
downloaded or claimed to be locally available. Supply exported image files to
populate the hero, gallery and thumbnail; the existing empty modules stay hidden.
Graphs, video and sponsorship visibility settings are unchanged.
The private form workbook and respondent email are not included in the website.
