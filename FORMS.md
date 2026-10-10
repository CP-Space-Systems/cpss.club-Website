# Inquiry form setup

The form is in `team/index.html` and its shared handler is in `assets/js/site.js`. GitHub Pages serves static files and cannot securely send mail by itself. A mailto draft requires the visitor's email application; it does not silently send a message.

## Default: email draft

In `assets/data/content.js`, set `window.CPSS_SETTINGS.contactEmail` to the confirmed club address and leave `formEndpoint` empty. The handler validates required fields, opens a draft, and uses `encodeURIComponent` separately for subject and body. Spaces become `%20`, line breaks become `%0A`, and actual plus characters become `%2B`, avoiding literal `+` separators in Outlook. No message is sent until the visitor sends it in their mail application.

Until an address is configured, submission shows an explicit setup message. v04 already sets the confirmed cpss@calpoly.edu address.

## Formspree or a similar hosted endpoint

Create and verify a form in your provider account. Copy its actual public submission endpoint into `formEndpoint`, for example `https://formspree.io/f/YOUR_FORM_ID`. Keep `contactEmail` for reference if desired. The existing handler sends the named form fields (`name`, `email`, `topic`, `message`) as FormData using POST with `Accept: application/json`. The endpoint must allow cross-origin requests from your deployed site and respond with a success HTTP status. No package or provider JavaScript is required.

Test success and failure on the deployed site. Configure notifications and spam controls in the provider account. Keep credentials and mail-service secrets out of the site.

Official setup: https://help.formspree.io/articles/building-your-form/building-an-html-form

## Netlify Forms

Netlify's automatic form detection runs when HTML is deployed through Netlify. Adding its attributes to a site hosted only on GitHub Pages does not create a working submission endpoint.

If you later move hosting to Netlify:

1. Change the form opening tag to `<form id="inquiry-form" name="inquiry" method="POST" data-netlify="true">`.
2. Add `<input type="hidden" name="form-name" value="inquiry">` inside it.
3. Remove the inquiry-form submit-handler block in `assets/js/site.js` so the native form POST can run; do not merely set `formEndpoint` to `/` because the generic JSON handler is intended for AJAX endpoints.
4. Leave `formEndpoint` empty and follow the host's detection, notification, and success-page configuration.
5. Deploy through Netlify and submit an actual test inquiry.

Official setup: https://docs.netlify.com/manage/forms/setup/

For another endpoint, adapt only the submission block if its expected format differs. Preserve the visible status messages and the existing labels and required fields.
