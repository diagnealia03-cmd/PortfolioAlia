import { CalendarDays } from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";

function Experience({ experiences, testimonials }) {
  return (
    <section className="page-section tinted">
      <div className="container">
        <SectionTitle eyebrow="Parcours" title="Expérience" />

        <div className="timeline compact">
          {experiences.map((experience) => (
            <article className="timeline-item" key={experience.role}>
              <p className="period">
                <CalendarDays size={16} />
                {experience.period}
              </p>
              <h3>{experience.role}</h3>
              <span>{experience.organization}</span>
            </article>
          ))}
        </div>

        {testimonials?.length ? (
          <div className="quote-row">
            {testimonials.slice(0, 2).map((testimonial) => (
              <figure key={testimonial.name}>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>{testimonial.name}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Experience;
