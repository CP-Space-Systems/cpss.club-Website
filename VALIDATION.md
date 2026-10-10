# Validation

- JavaScript syntax passed for both shared files.
- 15 HTML pages and 350 local references/fragments checked; no missing targets.
- No runtime CDN dependencies or remote image sources.
- Folder-based pages and relative asset paths support repository subfolder hosting.
- All four supplied topo SVGs and three official logo files included locally.

## Interaction checks

These checks execute the delivered JavaScript against a simulated DOM. They do not substitute for a real browser visual review.

- Tag filters and name sorting: passed
- Date sorting, missing dates, renamed catalog tags: passed
- Shared homepage/catalog previews: passed
- Carousel buttons, wraparound, keyboard, touch swipe, slide visibility: passed
- Team carousel and mobile menu open/close/Escape: passed
- Missing contact configuration and correctly encoded mailto spaces/newlines/plus signs: passed
- Hosted form success/failure UI with simulated responses: passed
- Professional/blog category navigation: passed
- Publication catalog records and relative links: passed
- Image enlargement dialog handler: passed

## Limitations

A real browser could not be installed because its download was blocked in this environment. Desktop/mobile rendering, physical tap behavior, browser PDF/video playback, and real email/provider delivery remain unverified. Responsive CSS and accessibility controls are implemented, but review the site locally before publishing. Missing font, media, document files, external URLs, and the confirmed contact address remain explicit placeholders.
