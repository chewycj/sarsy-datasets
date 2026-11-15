import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

const frameUrl = (frames, i) =>
  frames.pattern.replace("{n}", String(i + (frames.first ?? 1)).padStart(frames.pad ?? 3, "0"));

const frameDate = (frames, i) =>
  frames.times
    ? new Date(frames.times[i])
    : new Date(new Date(frames.start).getTime() + i * frames.intervalMin * 60000);

const fmtTime = (d) =>
  d.toLocaleString("en-GB", {
    timeZone: "Asia/Singapore",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }) + " SGT";

// which part of the source image to show, given a centre (0..1) and zoom (>=1), keeping canvas aspect
function cropFor(v, iw, ih, W, H) {
  let cw, ch;
  if (iw / ih > W / H) { ch = ih; cw = (ih * W) / H; } else { cw = iw; ch = (iw * H) / W; }
  cw /= v.z;
  ch /= v.z;
  return {
    sx: clamp(v.cx * iw - cw / 2, 0, iw - cw),
    sy: clamp(v.cy * ih - ch / 2, 0, ih - ch),
    cw,
    ch,
  };
}

// Scroll position -> satellite frame + camera. Each card is pinned to a frame number and a view,
// like the "targetTime" cards in video scrollytelling, but robust when scrolling backwards.
export default function HimawariScrolly({ frames, bbox, pins = [], steps, credit }) {
  const secRef = useRef(null);
  const canvasRef = useRef(null);
  const imgs = useRef([]);
  const dims = useRef(null);
  const pRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [active, setActive] = useState(0);
  const [label, setLabel] = useState("");
  const S = steps.length; // needs at least 2 steps

  const toXY = useCallback(
    (lon, lat) => ({
      x: (lon - bbox.west) / (bbox.east - bbox.west),
      y: (bbox.north - lat) / (bbox.north - bbox.south),
    }),
    [bbox]
  );

  const compute = useCallback(
    (p) => {
      const sp = clamp(p) * (S - 1);
      const i = Math.min(S - 2, Math.floor(sp));
      const t = ease(sp - i);
      const a = steps[i];
      const b = steps[i + 1];
      const pa = toXY(a.view.lon, a.view.lat);
      const pb = toXY(b.view.lon, b.view.lat);
      return {
        sp,
        frame: lerp(a.frame, b.frame, t),
        v: { cx: lerp(pa.x, pb.x, t), cy: lerp(pa.y, pb.y, t), z: lerp(a.view.zoom, b.view.zoom, t) },
      };
    },
    [steps, S, toXY]
  );

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    const { sp, frame, v } = compute(pRef.current);

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#05070a";
    ctx.fillRect(0, 0, W, H);

    const d = dims.current;
    if (d) {
      const { sx, sy, cw, ch } = cropFor(v, d.w, d.h, W, H);
      const f0 = Math.floor(frame);
      const f1 = Math.min(frames.count - 1, f0 + 1);
      // with few frames, hold each one crisp and only blend in the middle 40% of the gap
      const a = clamp((frame - f0 - 0.3) / 0.4);
      const paint = (i, alpha) => {
        const im = imgs.current[i];
        if (im && im.complete && im.naturalWidth) {
          ctx.globalAlpha = alpha;
          ctx.drawImage(im, sx, sy, cw, ch, 0, 0, W, H);
        }
      };
      paint(f0, 1);
      if (a > 0.001) paint(f1, a); // crossfade into the next frame
      ctx.globalAlpha = 1;

      // pins, drawn in the same projected space as the image
      const dpr = W / c.clientWidth;
      pins.forEach((pin) => {
        const n = toXY(pin.lon, pin.lat);
        const px = (((n.x * d.w) - sx) / cw) * W;
        const py = (((n.y * d.h) - sy) / ch) * H;
        if (px < 0 || py < 0 || px > W || py > H) return;
        ctx.beginPath();
        ctx.arc(px, py, 5 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "#ff6a2b";
        ctx.fill();
        ctx.lineWidth = 2 * dpr;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.font = `600 ${13 * dpr}px system-ui, sans-serif`;
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 4 * dpr;
        ctx.fillStyle = "#fff";
        ctx.fillText(pin.name, px + 10 * dpr, py + 4 * dpr);
        ctx.shadowBlur = 0;
      });
    }

    setActive(Math.round(sp));
    // no timestamps supplied yet -> hide the label instead of showing a wrong date
    setLabel(
      frames.times || frames.start
        ? fmtTime(frameDate(frames, clamp(Math.round(frame), 0, frames.count - 1)))
        : ""
    );
  }, [compute, frames, pins, toXY]);

  // preload every frame
  useEffect(() => {
    let alive = true;
    imgs.current = [];
    dims.current = null;
    setLoaded(0);
    for (let i = 0; i < frames.count; i++) {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        if (!alive) return;
        if (!dims.current) dims.current = { w: im.naturalWidth, h: im.naturalHeight };
        setLoaded((n) => n + 1);
        draw();
      };
      im.onerror = () => alive && setLoaded((n) => n + 1);
      im.src = frameUrl(frames, i);
      imgs.current[i] = im;
    }
    return () => { alive = false; };
  }, [frames, draw]);

  // canvas size
  useEffect(() => {
    const c = canvasRef.current;
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
      draw();
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [draw]);

  // scroll progress through this section
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = secRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      pRef.current = total > 0 ? clamp(-r.top / total) : 0;
      draw();
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [draw]);

  return (
    <section className="hw" ref={secRef}>
      <div className="hw__stage">
        <canvas ref={canvasRef} className="hw__canvas" role="img" aria-label="Satellite view of smoke haze over Southeast Asia, animated with scroll" />
        <div className="hw__vignette" />
        <div className="hw__time">{label}</div>
        {loaded < frames.count && (
          <div className="hw__loading">Loading satellite frames {loaded}/{frames.count}</div>
        )}
        <p className="hw__credit">{credit}</p>
      </div>

      <div className="hw__steps">
        {steps.map((s, i) => (
          <div className="hw__step" key={i}>
            <div className={"hw__card" + (i === active ? " is-on" : "")}>
              <p className="kicker">{s.kicker}</p>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
