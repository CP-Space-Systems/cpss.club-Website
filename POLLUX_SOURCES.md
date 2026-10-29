# Pollux specification sources

Source: `assets/documents/tvc-preliminary-design-review.pptx`, supplied inside
the edited v09 ZIP. User clarification identifies Pollux as the TVC/NILE engine
and Castor's twin. The page links the unchanged PDR as its source document.

| Published field | Source | Meaning |
|---|---|---|
| Target thrust: at least 300 lbf | Slide 6, requirement 4 | Design requirement |
| Model-predicted thrust: 283.39 lbf | Slide 12, embedded calculation output: 283.390107 lbs | Calculated estimate, rounded |
| Modeled chamber pressure: 270 psia | Slide 13 code comments identify chamber conditions at 270 psia | Model input condition, not a test result |
| Total mass flow: 0.66799 kg/s | Slide 12 embedded calculation output | Calculated estimate |
| Fuel mass flow: 0.167 kg/s | Slide 12 output and its mass-flow split code | Calculated estimate; shares total-flow units |
| Oxidizer mass flow: 0.50099 kg/s | Slide 12 output and its mass-flow split code | Calculated estimate; shares total-flow units |
| Chamber length: 5.209 in | Slide 12 output: 5.209206 inches | Calculated geometry, rounded |
| Hotfire-duration requirement: at least 10 s | Slide 6, requirement 4 | Design/test requirement |

The predicted thrust is below the stated 300 lbf requirement. Neither the page
nor the catalog claims successful hotfire performance or demonstrated compliance.

The output's 317.64 run-line pressure lacks an explicit unit in the displayed
result, so it is not published as a specification. No unit is guessed. Slide 6
has a separate pressure-withstand requirement; that is not substituted for the
modeled operating pressure.

The PDR names ethanol in its propellant requirement, while a later slide refers
to IPA. Fuel identity is therefore not added as a definite Pollux specification.
Earlier DOCX/PDR differences on burn duration/revolutions are recorded in
CONTENT_NOTES_V09.md; those original source files remain unchanged.

The dedicated engine lead, current manufacturing completion, and dated Pollux
milestones are not separately established by the supplied material. Current
work is described in terms of documented CAD/calculations and intended NILE/TVC
integration. Castor's dates and historical Stratum datasets are not copied over.
