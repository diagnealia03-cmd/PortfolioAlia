const portfolioSeed = {
  profile: {
    name: "Alia DIAGNE",
    title: "Étudiante en Systèmes, Réseaux et Télécommunications",
    subtitle:
      "Sérieuse, motivée et dynamique, je recherche une première expérience professionnelle en informatique ou support administratif.",
    location: "Dakar, Sénégal",
    email: "diagnealia03@gmail.com",
    phone: "+221 75 015 77 29",
    availability:
      "Disponible à temps plein pour stages, emplois saisonniers ou missions temporaires",
    bio:
      "Étudiante en deuxième année de licence en Systèmes, Réseaux et Télécommunications à l'Université Alioune Diop de Bambey.",
    highlights: [
      "Licence 2 en Systèmes, Réseaux et Télécommunications",
      "Bases solides en programmation, web et systèmes",
      "Travail en équipe, adaptabilité et motivation"
    ],
    stats: [
      { value: "L2", label: "niveau d'étude" },
      { value: "SRT", label: "spécialité" },
      { value: "2", label: "langues" }
    ],
    socials: {
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/",
      email: "mailto:diagnealia03@gmail.com"
    }
  },
  projects: [
    {
      title: "Projet académique de développement web",
      category: "Développement web",
      description:
        "Réalisation de pages web académiques avec HTML, CSS et PHP, avec une attention portée à la structure et à la clarté.",
      impact: "Mise en pratique des bases du web et de la logique côté serveur.",
      technologies: ["HTML", "CSS", "PHP"],
      githubUrl: "https://github.com/",
      demoUrl: "https://example.com",
      image: "tailwind",
      featured: true,
      order: 1
    },
    {
      title: "Exercices de programmation",
      category: "Programmation",
      description:
        "Exercices en C et Java pour travailler l'algorithmique, la logique et la résolution de problèmes.",
      impact: "Renforcement des bases de programmation et de raisonnement informatique.",
      technologies: ["C", "Java", "Algorithmique"],
      githubUrl: "https://github.com/",
      demoUrl: "https://example.com",
      image: "react",
      featured: true,
      order: 2
    },
    {
      title: "Travaux d'administration système",
      category: "Systèmes",
      description:
        "Pratique sur environnements Linux et Windows dans le cadre de la formation en systèmes et réseaux.",
      impact: "Meilleure compréhension des systèmes d'exploitation et du support informatique.",
      technologies: ["Linux", "Windows", "Support informatique"],
      githubUrl: "https://github.com/",
      demoUrl: "https://example.com",
      image: "docker",
      featured: false,
      order: 3
    },
    {
      title: "Bases de données SQL",
      category: "Base de données",
      description:
        "Manipulation de bases SQL pour organiser les données et comprendre les requêtes de base.",
      impact: "Capacité à structurer et interroger des données simples.",
      technologies: ["SQL", "Base de données"],
      githubUrl: "https://github.com/",
      demoUrl: "https://example.com",
      image: "cloud",
      featured: false,
      order: 4
    }
  ],
  skillGroups: [
    {
      title: "Programmation",
      icon: "ServerCog",
      accent: "coral",
      skills: ["C", "Java", "Algorithmique", "Logique"],
      order: 1
    },
    {
      title: "Développement web",
      icon: "MonitorSmartphone",
      accent: "teal",
      skills: ["HTML", "CSS", "PHP"],
      order: 2
    },
    {
      title: "Base de données",
      icon: "Database",
      accent: "gold",
      skills: ["SQL", "Requêtes", "Organisation des données"],
      order: 3
    },
    {
      title: "Systèmes",
      icon: "CloudCog",
      accent: "teal",
      skills: ["Linux", "Windows", "Administration système", "Support informatique"],
      order: 4
    },
    {
      title: "Qualités",
      icon: "Sparkles",
      accent: "rose",
      skills: ["Français courant", "Anglais intermédiaire", "Travail en équipe", "Adaptabilité"],
      order: 5
    }
  ],
  experiences: [
    {
      role: "Licence en Systèmes, Réseaux et Télécommunications",
      organization: "Université Alioune Diop de Bambey (UADB)",
      period: "2024 - Présent",
      location: "Bambey, Sénégal",
      description:
        "Formation en systèmes, réseaux, télécommunications, programmation et bases informatiques.",
      achievements: [
        "Deuxième année de licence",
        "Travaux pratiques en programmation et systèmes",
        "Développement progressif des compétences informatiques"
      ],
      order: 1
    },
    {
      role: "Projets académiques",
      organization: "Formation universitaire",
      period: "2024 - Présent",
      location: "Sénégal",
      description:
        "Réalisation de projets académiques en développement web, programmation et administration système.",
      achievements: [
        "Développement web avec HTML, CSS et PHP",
        "Exercices en C et Java",
        "Pratique Linux et Windows"
      ],
      order: 2
    },
    {
      role: "Baccalauréat Série S2",
      organization: "Parcours scolaire",
      period: "Avant 2024",
      location: "Sénégal",
      description: "Formation scientifique avant l'entrée en licence informatique.",
      achievements: ["Base scientifique", "Rigueur", "Logique"],
      order: 3
    }
  ],
  services: [
    {
      title: "Support informatique",
      description: "Aide aux utilisateurs et résolution de problèmes techniques simples.",
      icon: "LayoutDashboard",
      points: ["Linux", "Windows", "Assistance"],
      order: 1
    },
    {
      title: "Développement web simple",
      description: "Création de pages web avec HTML, CSS et PHP.",
      icon: "PanelsTopLeft",
      points: ["HTML", "CSS", "PHP"],
      order: 2
    },
    {
      title: "Support administratif",
      description: "Organisation, saisie et appui aux tâches confiées.",
      icon: "Cable",
      points: ["Organisation", "Adaptabilité", "Sérieux"],
      order: 3
    }
  ],
  testimonials: []
};

export default portfolioSeed;
