import { useState } from "react";
import "./opticalcompare.css"; // the slider's own styles. Keep opticalcompare.css next to this file in src/

// Shows an image, or a plain colour block if the file isn't there yet 
function Pic({ src, alt, className, style }) {
  return src ? (
    <img className={className} src={src} alt={alt} style={style} draggable="false" />
  ) : (
    <div className={className} style={{ background: "#1a2026", ...style }} role="img" aria-label={alt} />
  );
}

// One before/after slider. Options above it switch the image type (NDVI / True colour).
// The info panel beside it explains the bands and colours for the selected type.
export default function OpticalCompare({
  title,
  intro,
  beforeLabel,
  afterLabel,
  aspect = "1320 / 1405",
  modes,
  credit,
}) {
  const [modeId, setModeId] = useState(modes[0].id);
  const [pos, setPos] = useState(50);
  const mode = modes.find((m) => m.id === modeId) ?? modes[0];

  return (
    <section className="oc">
      <header className="oc__head">
        <h2>{title}</h2>
      </header>

      <div className="oc__body">
        {/* LEFT: options above, then the slider */}
        <div className="oc__main">
          <div className="oc__toggle" role="group" aria-label="Image type">
            {modes.map((m) => (
              <button
                key={m.id}
                className={m.id === modeId ? "is-on" : ""}
                aria-pressed={m.id === modeId}
                onClick={() => setModeId(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          <figure className="oc__fig">
            <div className="oc__frame" style={{ aspectRatio: aspect }}>
              {/* both image types are stacked; only the selected one is visible */}
              {modes.map((m) => (
                <div
                  key={m.id}
                  className={"oc__mode" + (m.id === modeId ? " is-on" : "")}
                  aria-hidden={m.id !== modeId}
                >
                  <Pic className="oc__img" src={m.after.src} alt={`${m.label}, ${afterLabel}`} />
                  <Pic
                    className="oc__img"
                    src={m.before.src}
                    alt={`${m.label}, ${beforeLabel}`}
                    style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                  />
                </div>
              ))}

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
              {mode.caption}
              <br />
              {credit && <span className="oc__credit"> {credit}</span>}
            </figcaption>
          </figure>
        </div>

        {/* RIGHT: info beside the slider */}
        <aside className="oc__panel">
          <div className="oc__card">
            <h3>Bands used</h3>
            <ul className="oc__bands">
              {mode.bands.items.map((b) => (
                <li key={b.code}>
                  <i style={{ background: b.swatch }} />
                  <div>
                    <b>{b.code}</b> <span>{b.name}</span>
                    {b.note && <em>{b.note}</em>}
                  </div>
                </li>
              ))}
            </ul>
            {mode.bands.formula && <p className="oc__formula">{mode.bands.formula}</p>}
          </div>

          <div className="oc__card">
            <h3>What the colours mean</h3>
            {mode.ramp && (
              <div className="oc__ramp">
                <div style={{ background: `linear-gradient(90deg, ${mode.ramp.colors.join(",")})` }} />
                <span>{mode.ramp.low}</span>
                <span>{mode.ramp.high}</span>
              </div>
            )}
            <ul className="oc__legend">
              {mode.legend.map((l) => (
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

          {mode.warning && <p className="oc__warn">{mode.warning}</p>}
        </aside>
      </div>
    </section>
  );
}
