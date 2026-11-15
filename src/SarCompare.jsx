import { useState } from "react";
import "./opticalcompare.css"; // reuses the optical slider's styles. Keep opticalcompare.css next to this file in src/

// Shows an image, or a plain colour block if the file isn't there yet
function Pic({ src, alt, className, style }) {
  return src ? (
    <img className={className} src={src} alt={alt} style={style} draggable="false" />
  ) : (
    <div className={className} style={{ background: "#1a2026", ...style }} role="img" aria-label={alt} />
  );
}

// One before/after radar slider, same layout as OpticalCompare but with a single image type
// (no tabs). The info panel beside it explains the channels and colours.
export default function SarCompare({
  title,
  beforeLabel,
  afterLabel,
  aspect = "1478 / 1267",
  before,
  after,
  caption,
  bands,
  legend,
  warning,
  credit,
}) {
  const [pos, setPos] = useState(50);

  return (
    <section className="oc oc--sar">
      <header className="oc__head">
        <h2>{title}</h2>
      </header>

      <div className="oc__body">
        {/* LEFT: the slider */}
        <div className="oc__main">
          <figure className="oc__fig">
            <div className="oc__frame" style={{ aspectRatio: aspect }}>
              <Pic className="oc__img" src={after.src} alt={`Radar, ${afterLabel}`} />
              <Pic
                className="oc__img"
                src={before.src}
                alt={`Radar, ${beforeLabel}`}
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              />

              <span className="oc__tag oc__tag--l">{beforeLabel}</span>
              <span className="oc__tag oc__tag--r">{afterLabel}</span>

              <div className="oc__handle" style={{ left: `${pos}%` }} aria-hidden="true">
                <span>⇆</span>
              </div>
              <input
                className="oc__range"
                type="range"
                min="0"
                max="100"
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label={`Drag to compare ${beforeLabel} and ${afterLabel}`}
              />
            </div>
            <figcaption className="oc__caption">
              {caption}
              <br />
              {credit && <span className="oc__credit"> {credit}</span>}
            </figcaption>
          </figure>
        </div>

        {/* RIGHT: info beside the slider */}
        <aside className="oc__panel">
          <div className="oc__card">
            <h3>Channels used</h3>
            <ul className="oc__bands">
              {bands.items.map((b) => (
                <li key={b.code}>
                  <i style={{ background: b.swatch }} />
                  <div>
                    <b>{b.code}</b> <span>{b.name}</span>
                    {b.note && <em>{b.note}</em>}
                  </div>
                </li>
              ))}
            </ul>
            {bands.formula && <p className="oc__formula">{bands.formula}</p>}
          </div>

          <div className="oc__card">
            <h3>What the colours mean</h3>
            <ul className="oc__legend">
              {legend.map((l) => (
                <li key={l.name}>
                  <i style={{ background: l.color }} />
                  <div>
                    <b>{l.name}</b>
                    <span>{l.meaning}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {warning && <p className="oc__warn">{warning}</p>}
        </aside>
      </div>
    </section>
  );
}