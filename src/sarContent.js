export const sarIntro =
  "However, as seen from the satellite imagery, images can be unclear due to blockage from dense clouds. \n\n NISAR bypasses the issue by using active microwave radar, which is especially crucial in tropical regions like SEA.";

export const sarCompare = {
  title: "Radar: before and after",

  beforeLabel: "Jun",
  afterLabel: "Oct",
  aspect: "1478 / 1267", // matches the June image. The October one is nearly identical, so it fits cleanly

  before: { src: "/img/sar/jun_sar.png" },
  after: { src: "/img/sar/oct_sar.png" },

  caption: "NISAR L-band radar, June and October. Drag the slider to compare. The view is clear in both months, even with smoke overhead.",
  credit: "Contains NISAR data via ASF DAAC / NASA Earthdata.", // TODO confirm the exact credit wording

  // TODO: replace with the real channel mapping of your composite (check the processing notes / tool you exported from).
  // The mapping below is the common one for HH + HV false colour: R = HH, G = HV, B = HH.
  bands: {
    items: [
      { code: "HH", name: "Horizontal send, horizontal receive", swatch: "#d33a8f", note: "Strong over smooth or open ground and wet surfaces. Shown in red and blue." },
      { code: "HV", name: "Horizontal send, vertical receive", swatch: "#3a9a3a", note: "Strong over dense leaves and branches. Shown in green." },
    ],
    formula: "Composite: R = HH, G = HV, B = HH", // TODO verify
  },

  // TODO: check each meaning against your scene before submitting.
  legend: [
    { name: "Pale green / white", color: "#bfeccb", meaning: "Strong HV return: dense, tall vegetation (e.g. peat swamp forest)." },
    { name: "Pink / magenta", color: "#d77fd1", meaning: "Stronger HH than HV: lower or cleared vegetation, plantations and open ground." },
    { name: "Black", color: "#1b0f22", meaning: "Very weak return: calm sea and wide rivers, where the signal bounces away." },
    { name: "Bright white spots", color: "#ffffff", meaning: "Very strong return: buildings and boats." },
  ],

  warning:
    "Radar sends its own signal and passes through cloud and smoke, so both months show the ground clearly. Optical imagery could not do that in October.",
};