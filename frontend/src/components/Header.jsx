import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { portraitImage } from "../data/projectImages.js";

const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/projets", label: "Projets" },
  { to: "/parcours", label: "Parcours" },
  { to: "/contact", label: "Contact" }
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" onClick={closeMenu} aria-label="Accueil">
        <span className="brand-avatar" aria-hidden="true">
          <img src={portraitImage} alt="" />
        </span>
        <span>Alia DIAGNE</span>
      </NavLink>

      <nav className={isOpen ? "nav is-open" : "nav"} aria-label="Navigation principale">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        className="menu-button"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

export default Header;
