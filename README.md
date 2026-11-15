# Project SARsy datasets

<img width="285" height="290" alt="image" src="https://github.com/user-attachments/assets/0e67d43f-3bcc-42df-956b-d4cc5f3defc2" />



A scrollytelling story about the Indonesian peatland fires that cause haze across Southeast Asia, told with optical satellite data and NISAR radar data. Built for NASA Space Apps 2026.

Try out the project: [https://chewycj.github.io/sarsy-datasets/](https://chewycj.github.io/sarsy-datasets/)

Project Demo Video: [https://youtu.be/xCLWu5po73s](https://youtu.be/xCLWu5po73s)

Team: Kexuan and Chun Jia, from Singapore!

## What it shows

1. **The sky:** JAXA Himawari imagery of smoke drifting from Kalimantan towards Singapore.
2. **The ground in optical:** January vs October, as NDVI and true colour, with the bands and colours explained.
3. **Through the smoke:** NISAR L-band radar over time, which sees through cloud and smoke.
4. **Read the colours:** click the radar image to learn what each colour may mean.

## Run it locally

Requires Node 18 or newer.

```
npm install
npm run dev
```

Then open the address shown in the terminal.

Build and preview the production version:

```
npm run build
npm run preview
```

## Data and credits

- NISAR L-band data: NASA / ISRO, distributed by the Alaska Satellite Facility DAAC (ASF) and NASA Earthdata.
- Himawari imagery: JAXA Himawari Monitor (P-Tree) / Japan Meteorological Agency.
- Optical and NDVI imagery: Contains modified Copernicus Sentinel-2 data.

## How the images were prepared

Himawari frames were captured with the same map view, then converted with `prep_frames.py`
(resized to 960px wide WebP, numbered `f_001.webp`, `f_002.webp`, ...).

## Tech

React + Vite. No runtime dependencies beyond React. The scroll animations use plain browser APIs.
SI was used to generate code for this project.
