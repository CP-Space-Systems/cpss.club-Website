/* Project/publication previews only. Full page content lives in each folder/index.html.
   Catalog paths are relative to the site root; tags build filters automatically.
   featured controls homepage selection; homeProjectLimit sets the maximum. */
window.CPSS_CONTENT = {
  "projects": [
    {
      "slug": "archerfish",
      "title": "Archerfish",
      "status": "Launching December 5, 2026",
      "tags": [
        "Flight Vehicles",
        "Liquid Propulsion"
      ],
      "summary": "A pump-fed liquid rocket bringing together CPSS propulsion, structures, and avionics development into a nitrous oxide and ethanol flight vehicle.",
      "lead": "Jasmine Cheng",
      "date": "",
      "thumbnail": "assets/images/af_thumb1.png",
      "thumbnailAlt": "Archerfish liquid rocket",
      "featured": true
    },
    {
      "slug": "air-brakes",
      "title": "Air Brakes",
      "status": "Ready to Launch.",
      "tags": [
        "Flight Controls",
        "Avionics"
      ],
      "summary": "An active apogee-control system that adjusts air-brake deployment using flight-computer sensor data and a PID controller.",
      "lead": "Brian Payne",
      "date": "2024-2026",
      "thumbnail": "/assets/images/bebop2.jpg",
      "thumbnailAlt": "Rocket air-brake mechanism",
      "featured": true
    },
    {
      "slug": "flyback-boosters",
      "title": "Fly-back Booster Program",
      "status": "[Current status]",
      "tags": [
        "Flight Vehicles",
        "Flight Controls"
      ],
      "summary": "Development of rocket-powered, radio-controlled glide-back boosters, continuing CPSS work on Space Shuttle-inspired launch configurations.",
      "lead": "Shiva Pulmamidi",
      "date": "",
      "thumbnail": "",
      "thumbnailAlt": "Fly-back booster project",
      "featured": false
    },
    {
      "slug": "regen-engine",
      "title": "Regeneratively Cooled Engine",
      "status": "Amid Design and Analysis",
      "tags": [
        "Liquid Propulsion",
        "Research & Development"
      ],
      "summary": "Research and preliminary design of regeneratively cooled engines to support future liquid-propellant vertical takeoff and landing development.",
      "lead": "Sloan Robbins, Ellen Poulsen",
      "date": "",
      "thumbnail": "",
      "thumbnailAlt": "Regeneratively cooled engine project",
      "featured": false
    },
    {
      "slug": "tvc",
      "title": "Thrust Vector Control",
      "status": "[Current status]",
      "tags": [
        "Flight Controls",
        "Research & Development"
      ],
      "summary": "Research into thrust vector control as part of CPSS development toward a liquid-propellant vertical takeoff and landing vehicle.",
      "lead": "Gustavo Chavez",
      "date": "",
      "thumbnail": "",
      "thumbnailAlt": "Thrust vector control project",
      "featured": false
    },
    {
      "slug": "throttling",
      "title": "Engine Throttling",
      "status": "[Current status]",
      "tags": [
        "Liquid Propulsion",
        "Research & Development"
      ],
      "summary": "Research into engine throttling systems to support future liquid-propellant vertical takeoff and landing development.",
      "lead": "Robbert Saunders",
      "date": "",
      "thumbnail": "",
      "thumbnailAlt": "Engine throttling project",
      "featured": false
    },
    {
      "slug": "ablative-engine-successor",
      "title": "Ablative Engine",
      "status": "[Current status]",
      "tags": [
        "Liquid Propulsion",
        "Research & Development"
      ],
      "summary": "[Ablative engine successor project summary]",
      "lead": "Noah Shefer",
      "date": "",
      "thumbnail": "",
      "thumbnailAlt": "Ablative engine successor project",
      "featured": false
    },
    {
      "slug": "sille",
      "title": "SILL-E",
      "status": "Over 20 teams in the design phase",
      "tags": [
        "Liquid Propulsion",
        "Education"
      ],
      "summary": "The Student Introductory Liquids Learning Engine program introduces members to liquid engine design, analysis, manufacturing, and mentored testing.",
      "lead": "Lishen Lin, Ellen Poulsen",
      "date": "",
      "thumbnail": "assets/images/tau-hot-fire-2026-09-27.png",
      "thumbnailAlt": "TAU engine hot-fire test",
      "featured": true
    },
    {
      "slug": "cert-rockets",
      "title": "Certification Rockets",
      "status": "+10 L1 Cert Rockets under construction",
      "tags": [
        "Flight Vehicles",
        "Education"
      ],
      "summary": "A hands-on program helping members build, launch, and recover rockets while working toward Level 1 and Level 2 Tripoli rocketry certifications.",
      "lead": "[Program lead]",
      "date": "",
      "thumbnail": "assets/images/Certs_02.jpg",
      "thumbnailAlt": "Student certification rocket launch",
      "featured": false
    },
    {
      "slug": "tom",
      "title": "TOM Flight Computer",
      "status": "[Current status]",
      "tags": [
        "Avionics",
        "Flight Controls"
      ],
      "summary": "An adaptable flight computer combining onboard sensors, data logging, and LoRa telemetry around a Raspberry Pi Compute Module 5.",
      "lead": "[Project lead]",
      "date": "",
      "thumbnail": "assets/images/TOM_01.jpg",
      "thumbnailAlt": "TOM flight computer board",
      "featured": false
    }
  ],
  "publications": [
    {
      "slug": "archerfish-cdr",
      "title": "Archerfish Critical Design Review",
      "type": "Design review",
      "date": "",
      "tags": [
        "Flight Vehicles",
        "Liquid Propulsion"
      ],
      "summary": "Archerfish design review covering mission scope, fluids, ground support equipment, aerodynamics, structures, recovery, avionics, testing, and budget.",
      "authors": "Cal Poly Space Systems",
      "link": "publications/archerfish-cdr/"
    }
  ],
  "updates": [
    {
      "slug": "professional-update",
      "title": "[Professional update title]",
      "category": "professional",
      "date": "",
      "summary": "[Update excerpt]",
      "thumbnail": ""
    },
    {
      "slug": "club-blog",
      "title": "[Club blog title]",
      "category": "blog",
      "date": "",
      "summary": "[Blog excerpt]",
      "thumbnail": ""
    }
  ]
};

/* Disabled NILE draft from your v03 upload. Copy this object into projects to list it.
{
  "slug": "nile",
  "title": "NILE Test Stand",
  "status": "[Current status]",
  "tags": ["Test Infrastructure", "Liquid Propulsion"],
  "summary": "A liquid rocket engine test stand in Paso Robles designed to support long-duration, low-thrust testing for propulsion and vehicle-development projects.",
  "lead": "[Project lead]",
  "date": "",
  "thumbnail": "",
  "thumbnailAlt": "NILE liquid rocket engine test stand",
  "featured": false
},
*/

/* Confirmed contact address; leave formEndpoint empty for mailto drafts. */
window.CPSS_SETTINGS = {
  "contactEmail": "cpss@calpoly.edu",
  "formEndpoint": "",
  "homeProjectLimit": 3
};
