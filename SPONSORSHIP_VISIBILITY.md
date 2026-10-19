# Sponsorship page visibility — v08

`support-us/index.html` is kept intact for editing and remains accessible by
typing its URL. Its menu/footer links, and all other links pointing to that
page, are hidden with native HTML attributes:

```html
<a href="../support-us/" data-sponsorship-link hidden>Sponsors</a>
```

The existing `[hidden]` CSS rule removes these links from display and keyboard
navigation, including without JavaScript. No anchor destination was deleted.
The contact form's Sponsorship inquiry option remains usable.

To restore the links when ready, search all HTML files for
`data-sponsorship-link hidden` and replace it with `data-sponsorship-link`.
Do this across all pages and templates so the header/footer stay consistent.
To hide them again, restore `hidden` on those marked anchors.

This is presentation control, not password protection or a way to prevent
someone opening the sponsorship URL directly.
