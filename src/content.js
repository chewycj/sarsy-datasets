// ALL STORY CONTENT LIVES HERE. Edit text, swap images, tweak haze: no component changes needed.
// Put images in /public/img/ and reference them as "/img/xxx.jpg". If src is null, a gradient placeholder shows.
// TODO: every claim marked [VERIFY] needs a real source before you submit.

export const hero = {
  kicker: "NISAR · Borneo · Singapore",
  title: "The smoke has a source.",
  dek: "Every dry season, the sky over Southeast Asia turns grey. Let's follow the haze back to where it starts, and see it with a radar that smoke can't hide from.",
  byline: "SARsy Datasets · NASA Space Apps 2026", // TODOz
};

// Scrolly steps. `haze` (0 to 1) controls how thick the smoke overlay is on that step.
export const steps = [
  {
    id: "sg",
    kicker: "(Not so) Blanketed in grey",
    text: "Scientists can use the data to monitor vegatation changes, without being affected by cloud or smoke cover.", 
    bg: { src: null, gradient: "linear-gradient(180deg,#8a8f94,#c9c3b8)" },
    haze: 0.75,
  },
  {
    id: "wind",
    kicker: "Different forces at play",
    text: "The strong 'Godzilla' El Nino has brought severe weather patterns. Seasonal winds carry the smoke across the Strait. The source is more than a thousand kilometres away.", // [VERIFY distance for your chosen fire area]
    bg: { src: null, gradient: "linear-gradient(180deg,#5b5f66,#a39a8a)" },
    haze: 0.55,
  },
  {
    id: "peat",
    kicker: "Into the fray",
    text: "=Exploitation can still be done through legal loopholes. The clearing of forests continues to be done annually, the main driver being the demand for agricultural land and commercialdevelopment.",
    bg: { src: null, gradient: "linear-gradient(180deg,#2f3a2a,#6b5a3a)" },
    haze: 0.25,
  },
  {
    id: "optical",
    kicker: "No room for delay",
    text: "The United Nations Office for Disaster Risk Reduction (UNDRR) emphasises that although hazards are natural, disasters can be man-made. \n\nThere is a need for robust policy frameworks, formulated using scientific evidence as above, to address the root causes of these disasters, with a future shift in focus to preventive action. The rich biodiversity and the daily lives of the people in the region are at stake, and the time to act is now.",
    bg: { src: null, gradient: "linear-gradient(180deg,#9a948a,#cfc8bb)" }, // TODO: optical image (Sentinel-2 / Landsat / MODIS)
    haze: 0
  },
  {
    id: "radar",
    kicker: "An individual paves the way",
    text: "As an individual, there are several tangible advocacy actions that can be taken. Support can be provided to frontline responders through donations to relief and firefighting groups, and consumers can support sustainable supply chains and brands committed to High Carbon Stock (HCS) and zero-deforestation policies.",
    bg: { src: null, gradient: "linear-gradient(180deg,#10151c,#22303f)" }, // TODO: NISAR backscatter image (HV or HH/HV composite)
    haze: 0,
  },
];

// Closing "tombstone" card, an idea borrowed from the best scrolly stories: a named place with its years.
export const tombstone = {
  place: "Peat swamp forest, Central Kalimantan", // TODO real place name
  years: "intact until 2026", // TODO
};

// Before/after swipe. Replace with matching crops of the SAME area.
export const compare = {
  title: "Same place. Two ways of seeing.",
  caption: "Drag to compare. Left: optical, blocked by smoke. Right: NISAR L-band radar.", // TODO adjust
  left: { label: "Optical", src: null, gradient: "linear-gradient(135deg,#b7b0a2,#8d867a)" },
  right: { label: "NISAR L-band", src: null, gradient: "linear-gradient(135deg,#0e141b,#2a3f55)" },
};

export const outro = {
  heading: "What NISAR changes",
  text: "Smoke season doesn't stop satellites that carry their own light. NISAR's radar gives scientists and communities a clear look at burn scars, drained peat and recovery, whatever the sky is doing.",
  sources: [
    { label: "NISAR data via ASF DAAC / NASA Earthdata", url: "https://www.earthdata.nasa.gov/data/platforms/space-based-platforms/nisar" },
    { label: "Fire in Kalimantan's peatlands over two decades (Frontiers)", url: "https://public-pages-files-2025.frontiersin.org/journals/forests-and-global-change/articles/10.3389/ffgc.2024.1221797/xml" },
    // TODO add: hotspot data (NASA FIRMS), Singapore NEA PSI, GFW concessions
  ],
};
