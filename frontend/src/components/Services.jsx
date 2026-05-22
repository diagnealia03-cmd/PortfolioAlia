import { Cable, CloudCog, LayoutDashboard, PanelsTopLeft } from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";

const icons = {
  Cable,
  CloudCog,
  LayoutDashboard,
  PanelsTopLeft
};

function Services({ services }) {
  return (
    <section className="page-section tinted">
      <div className="container">
        <SectionTitle eyebrow="Services" title="Ce que je propose" />

        <div className="services-grid">
          {services.map((service) => {
            const Icon = icons[service.icon] || LayoutDashboard;
            return (
              <article className="service-card" key={service.title}>
                <div className="card-icon">
                  <Icon size={23} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.points.slice(0, 3).join(" · ")}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
