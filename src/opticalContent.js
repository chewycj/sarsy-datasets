export const opticalCompare = {
  title: "Optical satellites: before and after",
  intro:
    "Central Kalimantan, seen by an optical satellite. Drag the slider to compare May with November, then switch between a natural-colour view and a vegetation index.",

  beforeLabel: "May", 
  afterLabel: "Nov",
  aspect: "1270 / 800", 

  // Credit line shown under the slider.
  credit: "Contains modified Copernicus Sentinel data.", // TODO confirm the sensor (Sentinel-2? Landsat?) and year

  modes: [
    {
      id: "ndvi",
      label: "NDVI",
      before: { src: "/img/optical/ndvi-may.png" },
      after: { src: "/img/optical/ndvi-nov.png" },
      caption: "NDVI: a score for how much healthy green vegetation each pixel contains.",
      bands: {
        // Sentinel-2 bands. TODO: if your imagery is Landsat 8/9, use B5 (NIR) and B4 (Red) instead.
        items: [
          { code: "B08", name: "Near-infrared (NIR)", swatch: "#7a4a9a", note: "Invisible to the eye. Healthy leaves reflect it strongly." },
          { code: "B04", name: "Red", swatch: "#d33a3a", note: "Chlorophyll absorbs most of it." },
        ],
        formula: "NDVI = (NIR − Red) / (NIR + Red)",
      },
      // TODO: make these match the legend of the tool you exported from.
      ramp: {
        colors: ["#f3efd9", "#d9c98f", "#9fcf5a", "#4e9a1c", "#1f6b0a"],
        low: "Low NDVI",
        high: "High NDVI",
      },
      legend: [
        { name: "Cream / white", color: "#f3efd9", meaning: "Very low or no vegetation signal: cloud, smoke, bare ground, or open water." },
        { name: "Tan", color: "#d9c98f", meaning: "Low: sparse plants or bare, cleared or recently disturbed soil." },
        { name: "Light green", color: "#9fcf5a", meaning: "Medium: grass, young plantation or regrowth." },
        { name: "Dark green", color: "#2f7d12", meaning: "High: dense, healthy forest canopy." },
        { name: "Light grey", color: "#e2e2e2", meaning: "Open sea, where NDVI sits near or below zero." },
      ],
      warning:
        "Cloud and smoke also score as low NDVI. A pale patch in October can mean the land is hidden, not that it burned.",
    },
    {
      id: "true",
      label: "True colour",
      before: { src: "/img/optical/true-may.png" },
      after: { src: "/img/optical/true-nov.png" },
      caption: "True colour: close to what your eyes would see from orbit.",
      bands: {
        items: [
          { code: "B04", name: "Red", swatch: "#d33a3a", note: "Shown in the red channel." },
          { code: "B03", name: "Green", swatch: "#3a9a3a", note: "Shown in the green channel." },
          { code: "B02", name: "Blue", swatch: "#3a5ad3", note: "Shown in the blue channel." },
        ],
        formula: "Red, green and blue light combined, as in a normal photo.",
      },
      legend: [
        { name: "Dark green", color: "#2d5a2a", meaning: "Dense vegetation: forest and plantations." },
        { name: "Rust brown", color: "#8a4b2a", meaning: "Bare, cleared or possibly burned ground. Check against hotspot data before calling it a burn scar." },
        { name: "White / grey haze", color: "#e8e8e8", meaning: "Cloud or smoke. It hides the ground beneath." },
        { name: "Brown or blue-green water", color: "#2d5f6e", meaning: "Sea and rivers. Brown usually means suspended sediment." },
      ],
      warning:
        "In October most of the scene is covered by cloud and smoke. Optical sensors cannot see through it. Radar can.",
    },
  ],
};
