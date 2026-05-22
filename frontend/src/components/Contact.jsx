import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { sendContactMessage } from "../api/portfolioApi.js";
import SectionTitle from "./SectionTitle.jsx";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

function Contact({ profile }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await sendContactMessage(form);
      setStatus({ type: "success", message: response.message });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "MongoDB doit être lancé pour enregistrer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-section contact-section">
      <div className="container contact-grid">
        <div>
          <SectionTitle eyebrow="Contact" title="Travailler avec Alia" />

          <div className="contact-details">
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} />
              {profile.email}
            </a>
            <a href={`tel:${profile.phone}`}>
              <Phone size={18} />
              {profile.phone}
            </a>
            <span>
              <MapPin size={18} />
              {profile.location}
            </span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nom
            <input name="name" value={form.name} onChange={updateField} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={updateField} required />
          </label>
          <label>
            Sujet
            <input name="subject" value={form.subject} onChange={updateField} required />
          </label>
          <label>
            Message
            <textarea name="message" value={form.message} onChange={updateField} rows="5" required />
          </label>

          {status.message ? (
            <p className={`form-status ${status.type}`} role="status">
              {status.message}
            </p>
          ) : null}

          <button className="button primary" type="submit" disabled={isSubmitting}>
            <Send size={18} />
            {isSubmitting ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
