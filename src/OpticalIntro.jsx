import "./opticalcompare.css"; // shares the optical slider's stylesheet. Keep opticalcompare.css next to this file in src/

// Short intro paragraph that sits above the NDVI / true colour slider.
export default function OpticalIntro({ text }) {
  return (
    <section className="oc-intro">
      <p>{text}</p>
    </section>
  );
}