import { useEffect, useRef, useState } from "react";

// Tracks which scroll step is crossing the middle of the viewport.
export function useActiveStep(count) {
  const [active, setActive] = useState(0);
  const els = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);

  const ref = (i) => (el) => {
    els.current[i] = el;
  };
  return [active, ref];
}

// Page-level reading progress (0 to 1).
export function useReadProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? h.scrollTop / max : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}
