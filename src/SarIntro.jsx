import "./opticalcompare.css"; // shares the optical slider's stylesheet. Keep opticalcompare.css next to this file in src/

// Short intro paragraph that sits between the NDVI / true colour slider and the radar slider.
export default function SarIntro({ text }) {
  return (
    <section className="oc-intro oc-intro--follow">
      <p>{text}</p>
    </section>
  );
}