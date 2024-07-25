// import { url } from "inspector";

export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projets", link: "#projects" },
    { name: "Expérience", link: "#experience" },
    {name: "Méthodes", link :"#methodes"},
    { name: "Contact", link: "#contact" },
  ];
  
  export const gridItems = [
    {
      id: 1,
      title: "Créativité, Réflexivité ",
      description: "et persévérance.",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/computer-1.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 2,
      title: "Flexible & Ouverte à des opportunités à l'international",
      description: "Je suis Polyglotte.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    {
      id: 3,
      title: "Mes Stacks",
      description: "Apprentissage Continu.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "Background.png",
    },
    {
      id: 4,
      title: "Riche d'Expérience dans la Communication & Marketing",
      description: "Exellent Relationnel.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
  
    {
      id: 5,
      title: "Formée chez\nAda Tech School",
      description: "École Inclusive & Apprentissage par Projets.",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/image_Ada_purple.png",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Contactez-Moi !",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
  
  export const projects = [
    {
      id: 1,
      title: "YouTube Clone",
      des: "Plateforme de streaming. Appel API avec RapidAPI.",
      img: "/P3_YOUTUBE.png",
      iconLists: ["/re.svg","rapidapi-icon.svg", "material-ui-1.svg" ],
      link: "https://youtubeclone55.netlify.app",
    },
    {
      id: 2,
      title: "Squisse",
      des: "Application mobile pour Android: Modèle Vue Contrôleur.",
      img: "/Urbanspots-App_3.png",
      iconLists: ["/kotlin.svg", "/spring.svg"],
      link: "https://github.com/adatechschool/projet-collectif-mobile-les-zencas",
    },
    {
      id: 3,
      title: "OnMeuble ",
      des: "Site e-commerce : Création d'une API REST.",
      img: "/OnMeuble.png",
      iconLists: ["/re.svg", "/expressjs-icon_w.png","/node-js.svg"],
      link: "https://github.com/adatechschool/onmeuble",
    },
    
    {
      id: 4,
      title: "D-reader",
      des: "Extention Navigateur pour Chrome. Modification de Typo.",
      img: "/D-read.png",
      iconLists: ["/file-type-js-official.svg","/html5.svg","/file-type-css.svg"],
      link: "https://github.com/Arteinsana7/Zappel-Philipp",
    },
    {
      id: 5,
      title: "The Daily Space.",
      des: "Appel API de la NASA. Une image de l'espace par jour.",
      img: "/daily.png",
      iconLists: ["/file-type-js-official.svg","/html5.svg","/file-type-css.svg"],
      link: "https://quanghung0.github.io/The-Daily-Space/planetes.html",
    },
    {
      id: 6,
      title: "Zappel-Phillip",
      des: "Application mobile pour iOS. Gestion de taches.",
      img: "/ZAPP.png",
      iconLists: ["/swift.svg","/file-type-xcode.svg"],
      link: "https://github.com/Arteinsana7/Zappel-Philipp",
    },
  ];
  
  
  
  export const workExperience = [
    {
      id: 1,
      title: "Chargée de Communication & Événementielle.",
      desc: "Marketing Digital & Planification événementielle. Gestion de projet, mise en avant des produits via les réseaux sociaux et newsletters",
      className: "md:col-span-2",
      thumbnail: "/Icons_comm_violet_2.png",
    },
    {
      id: 2,
      title: "Responsable de ventes et marketing digitale",
      desc: "Analyse de données de vente, stratégies & campagnes en ligne",
      className: "md:col-span-2", 
      thumbnail: "/icons_loop_violet.png",
    },
    {
      id: 3,
      title: "Assistante à la réalisation de films",
      desc: "Logistique, organisation et planning d'un tournage. Régie, management et gestion d'imprévus",
      className: "md:col-span-2", 
      thumbnail: "/icons_orga_violet.png",
    },
    {
      id: 4,
      title: "Graphiste Freelance",
      desc: "Conception - Maquettes - Direction Artistique. Études du marché, tendances & positionnement",
      className: "md:col-span-2",
      thumbnail: "/icons_idee_violet.png",
    },
  ];
 

  
  export const socialMedia = [
    {
      id: 1,
      img: "/git.svg",
      url: "https://github.com/Arteinsana7?tab=repositories"
    },
    {
      id: 2,
      img: "/link.svg",
      url:"https://www.linkedin.com/in/eliana-yepez/"
    },
  ];