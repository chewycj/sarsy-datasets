import { hero, steps, tombstone, compare, outro } from "./content";
import { useActiveStep, useReadProgress } from "./useActiveStep";
import Swipe from "./Swipe";
import "./styles.css";
import HimawariScrolly from "./HimawariScrolly";
import { himawari } from "./himawariContent";
import "./himawari.css";
import OpticalCompare from "./OpticalCompare";
import { opticalCompare } from "./opticalContent";

function Hero() {
  return (
    <header className="hero">
      <div className="hero__smoke" aria-hidden="true" />
      <div className="hero__inner">
        <p className="kicker">{hero.kicker}</p>
        <h1>{hero.title}</h1>
        <p className="dek">{hero.dek}</p>
        <p className="byline">{hero.byline}</p>
      </div>
      <div className="scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </header>
  );
}

function Scrolly() {
  const [active, ref] = useActiveStep(steps.length);
  const current = steps[active];
  const last = active === steps.length - 1;

  return (
    <section className="scrolly">
      <div className="stage" aria-hidden="true">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={"stage__bg" + (i === active ? " is-on" : "")}
            style={{
              background: s.bg.src
                ? `center / cover no-repeat url(${s.bg.src})`
                : s.bg.gradient,
            }}
          />
        ))}
        {/* smoke overlay: thickness follows the active step */}
        <div className="stage__haze" style={{ opacity: current.haze }} />
        {last && (
          <div className="tomb">
            <span>{tombstone.place}</span>
            <b>{tombstone.years}</b>
          </div>
        )}
      </div>

      <div className="steps">
        {steps.map((s, i) => (
          <div className="step" key={s.id} data-index={i} ref={ref(i)}>
            <div className={"card" + (i === active ? " is-on" : "")}>
              <p className="kicker">{s.kicker}</p>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const progress = useReadProgress();
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <Hero />
      <HimawariScrolly {...himawari} />
      <section className="block">
        <OpticalCompare {...opticalCompare} />
      </section>
      <Scrolly />
      <section className="block">
        <Swipe {...compare} />
      </section>
      <section className="block block--text">
        <h2>{outro.heading}</h2>
        <p>{outro.text}</p>
        <ul className="sources">
          {outro.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
