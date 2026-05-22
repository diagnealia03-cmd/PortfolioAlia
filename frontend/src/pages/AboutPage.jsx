import About from "../components/About.jsx";
import Experience from "../components/Experience.jsx";

function AboutPage({ profile, experiences, testimonials }) {
  return (
    <main className="page">
      <About profile={profile} />
      <Experience experiences={experiences} testimonials={testimonials} />
    </main>
  );
}

export default AboutPage;
