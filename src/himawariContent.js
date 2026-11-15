// Content for the Himawari scrolly (section 2), set up for 14 frames.

export const himawari = {
  // Required credit. Check JAXA's terms page for the exact wording you want to use.
  credit: "Himawari imagery: JAXA Himawari Monitor (P-Tree) / Japan Meteorological Agency",

  frames: {
    pattern: "img/himawari/f_{n}.webp", // public/img/himawari/f_001.webp ... f_014.webp
    count: 14,
    first: 1,
    pad: 3,
    times: ["2026-10-05T00:00:00+00:00", "2026-10-06T00:00:00+00:00", "2026-10-07T00:00:00+00:00", "2026-10-08T00:00:00+00:00", "2026-10-09T00:00:00+00:00", "2026-10-10T00:00:00+00:00", "2026-10-11T00:00:00+00:00", "2026-10-12T00:00:00+00:00", "2026-10-13T00:00:00+00:00", "2026-10-14T00:00:00+00:00", "2026-10-15T00:00:00+00:00", "2026-10-16T00:00:00+00:00", "2026-10-17T00:00:00+00:00", "2026-10-18T00:00:00+00:00"],
  },

  // Estimated from coastlines in your captures (Banda Aceh, Singapore, Lampung, Kudat, south Kalimantan).
  // Fine for pin placement; nudge by 0.1-0.3 degrees if a pin sits slightly off its landmark.
  bbox: { west: 93.5, east: 123.7, south: -6.8, north: 8.1 },

  pins: [
    { name: "Singapore", lon: 103.6, lat: 1.28 },
    { name: "Study area, Central Kalimantan", lon: 113.2, lat: -2.5 }, 
  ],

  // Cards are pinned to frame numbers (0 to 13) and a camera view (lon/lat centre + zoom >= 1).
  // Keep `frame` values increasing so scrolling down moves forward in time.
  // Card text below only describes what is visible in your frames. Verify it against your final frame
  // order, and against NASA FIRMS hotspots and NEA PSI, before you submit.
  steps: [
    {
      kicker: "The region",
      text: "Sumatra on the left, Borneo on the right, the Strait in between.",
      frame: 0,
      view: { lon: 108.5, lat: 0.8, zoom: 1.0 },
    },
    {
      kicker: "The source",
      text: "A grey-brown plume builds over Kalimantan in Borneo.",
      frame: 4,
      view: { lon: 113.5, lat: -2.5, zoom: 2.2 },
    },
    {
      kicker: "The drift",
      text: "The smoke streams west along the coast, across the sea towards Sumatra and the Malay Peninsula.",
      frame: 9,
      view: { lon: 108.0, lat: -1.0, zoom: 1.7 },
    },
    {
      kicker: "Arrival",
      text: "Worsened air quality in South-east Asia, with the haze visible from space.",
      frame: 13,
      view: { lon: 103.8, lat: 1.3, zoom: 2.4 },
    },
  ],
};
