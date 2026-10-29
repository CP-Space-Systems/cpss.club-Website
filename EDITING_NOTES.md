# V10 editing notes

The current revision is documented in V10_EDITING.md and POLLUX_SOURCES.md.
The earlier notes below are retained as history and may refer to old engine
routes/names. The live Castor page is now projects/castor/index.html.

# V09 editing notes

Current revision instructions are in V09_EDITING.md. Source conflicts and
unconfirmed TVC milestones are recorded in CONTENT_NOTES_V09.md. Graphs are
intentionally hidden. The earlier notes below are retained for project history.

# V08 notes

The starting point is the user's edited v07 ZIP. The current Team roster,
headshot status, quarterly article, and sponsorship visibility instructions
are documented in README.md, TEAM_CONTENT.md and SPONSORSHIP_VISIBILITY.md.
Project archival is deferred. The existing project content and chart scripts
are preserved. The following are retained project/data notes from v07.

## Retained v07 content and data notes

The website uses your edited v05 and the two additional survey responses. Respondent email addresses, private survey exports, quiz fields and sign-in photo links are not delivered as public assets.

## Changes completed

- Fuel-pump summary, lead, background, goals, progress and specifications are part of Archerfish. The separate pump folder, listing, links and redirect are absent.
- The public project name is Ablative Engine; its existing ablative-engine-successor folder remains.
- Certification Rockets and Recoverable Booster Program content reflects the supplied October 11 responses.
- Booster pictures and the supplied Sonata II (Ragtime) review are connected. The original PDF/PPTX bytes are unchanged; the review is also in Publications.
- The supplied 4K HEVC MOV is converted to a 1080p H.264/AAC MP4 for browser playback. The large MOV is not included in the deployable website; retain your original upload for archival use.
- Smaller project intro text and capped portrait splash images apply to every project/template page.

## Graph calibration questions

The historical Stratum I recording has 31,771 samples and 26 columns. It is shown under Ablative Engine, with its historical source identified. The source CSV is unchanged.

Confirm:

1. Timestamp units, counter origin and wrap behavior.
2. Pressure-channel units and calibration status.
3. Flow-channel units and calibration; Fuel Flow includes values of 1023.
4. Which sentinel values mean disconnected sensor, fault or invalid measurement. All three load cells are constant -1. Thermocouples are constant zero.
5. Test type/date and which interval is valid for presentation.

Until confirmed, the graph uses timestamp offsets in recorded ticks and sensor values in raw units. Constant load-cell channels are not presented as measured thrust. No scientific conclusions or unit conversions are inferred.

## Other open details

- Archerfish's `193 ips` and pump `500 dp` need units confirmed. Existing pump `500 PSI` remains flagged for reconfirmation.
- Ablative Engine chamber pressure target `279` has no supplied unit.
- Booster vehicle thrust is submitted as `1215.1 lbs`; the page preserves that value and requests confirmation of the force unit. Its specifications are not labeled measured results because the response does not identify their provenance.
- Archerfish PDR month differs between the earlier page and response; CDR and exact launch/test dates still need confirmation as described in prior revisions.
- Certification launches are tentatively “early spring semester”; no exact date is invented. Historical counts remain approximate as submitted.
- Caption text, video captions/transcripts and additional milestone details remain editable where unsupplied.
- The survey's other certification and pump photo links are SharePoint references, not attached image files. Existing local photos are used; add authorized local copies when available.
- Munistic is not supplied; local Space Grotesk and the existing heading fallback remain.

## V07 updates

HF10 timing/pressure/load-cell units are confirmed by the user: microseconds, PSI absolute, lbf. The earlier Stratum I recording remains available for download but is not represented as calibrated HF10 data. Flow channels are excluded. Individual load cells are not combined or baseline-corrected without instructions.

The supplied HF10 filename contains an ambiguous date component; the public dataset label is HF10 and the normalized filename omits a guessed calendar date.

All added project images are incorporated into their relevant galleries. User captions are retained; unknown captions remain marked. A certification video is converted to MP4. Archived DOCX notes and private contact details are not included in the public site.

Local Plotly vendoring is the remaining hosting task: see VENDOR.md. No claim is made that the current graphs work offline.
