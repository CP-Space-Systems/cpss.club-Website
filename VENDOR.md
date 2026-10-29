# V09 graph visibility

Graph sections are hidden and their page loaders are commented out in v09, so
the delivered pages do not request Plotly or graph datasets. The original code
and data remain. To restore graphs, follow V09_EDITING.md. Once re-enabled,
the preserved controller uses the CDN described below.

# Plotly hosting status

The requested local Plotly bundle could not be retrieved in the authoring environment: CDN, GitHub and package-registry downloads were blocked. V07 uses the same CDN approach as the approved demo so the graphs remain usable online. Other supplied assets are local.

To finish local-only chart hosting:

1. Download the pinned Plotly 4.1.1 distribution from https://cdn.plot.ly/plotly-4.1.1.min.js in your browser.
2. Save it as `assets/js/vendor/plotly-4.1.1.min.js`, retaining the distribution's license notice and license file.
3. In `assets/js/data-charts.js`, replace the `PLOTLY_SOURCE` line with:

```js
const PLOTLY_SOURCE = (document.body.dataset.base || './') + 'assets/js/vendor/plotly-4.1.1.min.js';
```

4. Preview locally through HTTP and test the graphs with the internet disconnected. Commit the library and change together.

You can also upload the downloaded bundle for the next revision. No local bundle is falsely included as a placeholder, and the current loader does not request a nonexistent local file.
