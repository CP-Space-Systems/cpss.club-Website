# Team content — v08

All visible roster content is in `team/index.html`; no JavaScript roster is used.
The page retains the supplied profile grid, typography, header, footer and form.
The approved list contains 20 people in five sections. Only Noah Shefer's
provided contact email is carried over from the earlier survey. Missing titles
for Kevin Quintana and Shiv Patel, and Evan's surname, are not invented.

## Edit a profile

Find its `MEMBER:` comment. Change the name, role and any supplied contact links
inside that article. To add a person, copy one entire article, change its id
to a unique lowercase slug, and update the visible section member count.
To add a group, copy one complete `TEAM SECTION`, change its id and heading id,
then update `aria-labelledby` to match that heading id.

## Headshots

Noah's image is `assets/images/team/noah-shefer.jpg`. His original photo bytes
are preserved. The uploaded Colson, Radmehr, Santiago and Tino headshots are
kept under `assets/images/team/`, but are intentionally not displayed because
those people were removed from the approved roster.

For another member, add the actual image under `assets/images/team/`. Replace
the entire pending-photo div in that person's article with:

```html
<img
  class="team-member-photo mb-space-md"
  src="../assets/images/team/spencer-biernat.jpg"
  alt="Portrait of Spencer Biernat"
  loading="lazy"
  decoding="async">
```

Each missing-photo article has its own suggested path in a comment. Use the
actual extension and exact filename case. HTML on the Team page uses
`../assets/...`, not a path beginning with `/`. If an image fails, check the
leading slash, relative location, filename, extension and case first.
Images fit inside their existing 4:5 slots without cropping.

Headshots still needed:

- Spencer Biernat
- Devin Chen
- Metzli Singha
- Arjan Reyes
- Jasmine Cheng
- Kevin Quintana
- Shiv Patel
- Brandon Muck
- Anthony Casagrande
- Jenna Hatfield
- Shiva Pulmamidi
- Alister Haines
- Gustavo Chavez
- Sloan David Robbins
- Ellen Poulsen
- Calla Woodruff Lyons
- Alvin He
- Evan
- Dr. Dianne Deturris

## Group-photo carousel

The first image is `photo-album-thumbnail.jpg`, also used by the homepage hero.
The other two are `certification-team-01.jpg` and `certification-team-02.jpeg`.
Copy one complete `TEAM PHOTO FIGURE` block to add a slide. The shared gallery
reads the HTML figures automatically; no second list needs editing.
Images retain their aspect ratios and have a maximum display height of 560px.

The public page does not include the survey export, internal form metadata,
SharePoint sign-in links, or made-up biographies/contact information.
