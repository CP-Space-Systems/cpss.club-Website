# v11 changes

Built from the supplied cpss_static_website_v10(3) edited.zip.
Only the requested Regen media/PDR integration and Bebop correction are applied.

- Regen: show the supplied horizontal CAD image as the hero; retain the existing
  catalog thumbnail; include all four supplied design images in separate gallery slides.
- Regen: embed the local PDR PDF and provide open/download links for the PDF and
  original PowerPoint. Files are retained byte-for-byte with their supplied names.
  The PDF provides the preview; the PowerPoint downloads as an editable source file.
- Preserve the edited Regen content and its four goals. Alternating goal borders
  and numbers were already fixed in the uploaded CSS and remain unchanged.
- Rename the displayed Air Brakes project to Bebop, identify it as a launch vehicle
  with an air-brake subsystem, and add the existing Flight Vehicles classification.
  Retain projects/air-brakes/ and its catalog slug to preserve public links.
- Update the projects listing fallback label and its catalog cache query to v11.
- Other project content, layout, behavior scripts, header/footer, featured flags,
  hidden sponsorship links, and hidden graph sections are preserved.

If an image fails, check its relative path, filename case and extension. Project
page images use ../../assets/images/; catalog thumbnails use assets/images/.
Avoid a leading slash.

The PDF preview depends on browser PDF support. The separate Open PDF and
download links remain available when the embedded viewer is unavailable.
