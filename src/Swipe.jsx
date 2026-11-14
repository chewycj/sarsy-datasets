import { useState } from "react";

function Layer({ item }) {
  return (
    <div
      className="swipe__layer"
      style={{
        background: item.src ? `center / cover no-repeat url(${item.src})` : item.gradient,
      }}
    >
      <span className="swipe__tag">{item.label}</span>
    </div>
  );
}

// Before/after slider. The native range input gives free drag, touch and keyboard support.
export default function Swipe({ left, right, title, caption }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="swipe">
      <h2 className="swipe__title">{title}</h2>
      <div className="swipe__frame">
        <Layer item={right} />
        <div className="swipe__top" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Layer item={left} />
        </div>
        <div className="swipe__handle" style={{ left: `${pos}%` }} aria-hidden="true">
          <span>⇆</span>
        </div>
        <input
          className="swipe__range"
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare optical and radar imagery"
        />
      </div>
      <figcaption className="swipe__caption">{caption}</figcaption>
    </figure>
  );
}
