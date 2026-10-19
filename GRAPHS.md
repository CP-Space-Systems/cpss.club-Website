# V07 interactive graphs

The approved Plotly layout replaces the custom SVG renderer. Every project page and the project template contains a small `data-chart-config` JSON block in its Data & Telemetry Curves section. Page text stays in HTML; this block only describes datasets and graph channels.

Ablative Engine publishes the supplied HF10 recording: all 64,496 samples, six absolute-PSI pressure channels, and three individual lbf load-cell channels. Timestamp microseconds are converted to seconds from the first sample. Flow channels are omitted. No load-cell summation or baseline subtraction is applied.

## Add a prepared recording

Put your UTF-8 CSV in `assets/data/measurements/`. Keep clear headers, confirmed units, ascending x values and finite numeric measurements. Prepare/calibrate each test before publication; do not guess units. CSV cells should contain numbers, not unit suffixes. The reader supports quoted fields and UTF-8 BOMs. Blank/invalid selected-channel values produce a visible error rather than fabricated measurements.

Copy this configuration into the relevant page's existing JSON block, adapting file paths and columns to your actual recording:

```json
{
  "datasets": [
    {
      "label": "[Actual test name]",
      "file": "assets/data/measurements/your-test.csv",
      "xColumn": "time_s",
      "xOrigin": "first",
      "xScale": 1,
      "xLabel": "Time since recording start",
      "xUnit": "s",
      "note": "[Confirmed measurement units, calibration and source]",
      "groups": [
        {
          "title": "Pressures",
          "unit": "PSI absolute",
          "floorZero": true,
          "columns": ["chamber_pressure_psi", "fuel_pressure_psi"]
        },
        {
          "title": "Thrust",
          "unit": "lbf",
          "columns": ["thrust_lbf"]
        }
      ]
    }
  ]
}
```

Column names must match CSV headers exactly, including spaces/case. This example is a format guide, not test data. Units apply to a whole group: keep different units in different plots. Add another dataset entry for another test. An empty `datasets` array displays “Test data not yet published.”

`xScale` converts the recorded x values: 1 for seconds, 0.000001 for confirmed microseconds. `xOrigin: "first"` subtracts the first recorded x value before scaling. Prepare x to start at zero if origin mode is omitted. `floorZero` only affects axis padding; it never changes recorded measurements.

## Interaction

Drag a time window in either plot to zoom both plots together. Vertical axes fit visible curves in the selected interval. Pan, zoom buttons and Reset work across the linked plots. Legend entries and checkboxes hide/show curves. Double-click a plot resets the recording.

Hover or tap/drag for full-resolution nearest-sample readouts below the plot. Focus a plot and use Left/Right or Home/End to inspect recorded samples. Wide views reduce line vertices using bucket minima/maxima; zooming redraws the selected interval in more detail. Full-resolution data remains in memory and the source CSV download is unchanged. Lines connect measured samples; assess missing-data gaps during CSV preparation.

## Preview and files

CSV loading requires HTTP hosting. Run `python -m http.server 8000` at the site root, then open `http://localhost:8000/projects/ablative-engine-successor/`.

- Shared charts: `assets/js/data-charts.js`.
- Goal reveals and galleries: `assets/js/project.js`.
- Dataset definitions: the relevant project HTML.
- Chart styles: `assets/css/project.css`.

V07 currently loads pinned Plotly 4.1.1 from its CDN because library downloads were blocked during authoring. Graphs need internet access until it is vendored. See `VENDOR.md` for the exact local-file change. This is the sole external runtime library; no npm/build/server application is required by the website.
