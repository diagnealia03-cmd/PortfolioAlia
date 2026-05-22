import Contact from "../components/Contact.jsx";

function ContactPage({ profile }) {
  return (
    <main className="page">
      <Contact profile={profile} />
    </main>
  );
}

export default ContactPage;
