// Flambart Studio - Content Data File
// All text, portfolio items, and services are managed here
// Edit this file to update website content

export type Language = 'ro' | 'en';

export interface PortfolioItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: { ro: string; en: string };
  category: 'weddings' | 'events' | 'architecture';
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface ServiceCategory {
  id: 'weddings' | 'events' | 'architecture';
  title: { ro: string; en: string };
  description: { ro: string; en: string };
  deliverables: { ro: string[]; en: string[] };
}

export interface ContentData {
  meta: {
    title: { ro: string; en: string };
    description: { ro: string; en: string };
    ogImage: string;
  };
  nav: {
    portfolio: { ro: string; en: string };
    services: { ro: string; en: string };
    about: { ro: string; en: string };
    contact: { ro: string; en: string };
  };
  hero: {
    headline: { ro: string; en: string };
    subheadline: { ro: string; en: string };
    ctaPrimary: { ro: string; en: string };
    ctaSecondary: { ro: string; en: string };
    backgroundImage: string;
  };
  portfolio: {
    title: { ro: string; en: string };
    subtitle: { ro: string; en: string };
    categories: {
      weddings: { ro: string; en: string };
      events: { ro: string; en: string };
      architecture: { ro: string; en: string };
    };
    items: PortfolioItem[];
  };
  services: {
    title: { ro: string; en: string };
    subtitle: { ro: string; en: string };
    cta: { ro: string; en: string };
    categories: ServiceCategory[];
  };
  about: {
    title: { ro: string; en: string };
    description: { ro: string; en: string };
    mission: { ro: string; en: string };
    location: { ro: string; en: string };
    values: {
      title: { ro: string; en: string };
      description: { ro: string; en: string };
    }[];
  };
  contact: {
    title: { ro: string; en: string };
    subtitle: { ro: string; en: string };
    form: {
      name: { ro: string; en: string };
      email: { ro: string; en: string };
      phone: { ro: string; en: string };
      category: { ro: string; en: string };
      date: { ro: string; en: string };
      message: { ro: string; en: string };
      submit: { ro: string; en: string };
    };
    responseTime: { ro: string; en: string };
    email: string;
    phone: string;
    whatsapp: {
      number: string;
      message: { ro: string; en: string };
    };
  };
  footer: {
    copyright: { ro: string; en: string };
    location: { ro: string; en: string };
  };
}

export const content: ContentData = {
  meta: {
    title: {
      ro: 'Flambart Studio | Fotografie & Film Premium',
      en: 'Flambart Studio | Premium Photo & Film',
    },
    description: {
      ro: 'Studio de fotografie și film premium din Cluj-Napoca. Specializați în nunți, evenimente și fotografie de arhitectură.',
      en: 'Premium photo and film studio based in Cluj-Napoca. Specializing in weddings, events, and architecture photography.',
    },
    ogImage: '/placeholder.svg',
  },
  nav: {
    portfolio: { ro: 'Portofoliu', en: 'Portfolio' },
    services: { ro: 'Servicii', en: 'Services' },
    about: { ro: 'Despre', en: 'About' },
    contact: { ro: 'Contact', en: 'Contact' },
  },
  hero: {
    headline: {
      ro: 'Povești vizuale care rămân',
      en: 'Visual stories that last',
    },
    subheadline: {
      ro: 'Fotografie și film pentru momentele care contează',
      en: 'Photography and film for the moments that matter',
    },
    ctaPrimary: {
      ro: 'Verifică disponibilitatea',
      en: 'Check availability',
    },
    ctaSecondary: {
      ro: 'Vezi portofoliu',
      en: 'View portfolio',
    },
    backgroundImage: '/placeholder.svg',
  },
  portfolio: {
    title: { ro: 'Portofoliu', en: 'Portfolio' },
    subtitle: {
      ro: 'O selecție din proiectele noastre recente',
      en: 'A selection from our recent projects',
    },
    categories: {
      weddings: { ro: 'Nunți', en: 'Weddings' },
      events: { ro: 'Evenimente', en: 'Events' },
      architecture: { ro: 'Arhitectură', en: 'Architecture' },
    },
    items: [
      // Weddings
      {
        id: 'w1',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Nuntă elegantă în natură', en: 'Elegant outdoor wedding' },
        category: 'weddings',
        aspectRatio: 'portrait',
      },
      {
        id: 'w2',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Ceremonie de nuntă', en: 'Wedding ceremony' },
        category: 'weddings',
        aspectRatio: 'landscape',
      },
      {
        id: 'w3',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Portret de cuplu', en: 'Couple portrait' },
        category: 'weddings',
        aspectRatio: 'portrait',
      },
      {
        id: 'w4',
        type: 'video',
        src: '/placeholder.svg',
        thumbnail: '/placeholder.svg',
        alt: { ro: 'Film de nuntă', en: 'Wedding film' },
        category: 'weddings',
        aspectRatio: 'landscape',
      },
      {
        id: 'w5',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Detalii de nuntă', en: 'Wedding details' },
        category: 'weddings',
        aspectRatio: 'square',
      },
      // Events
      {
        id: 'e1',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Eveniment corporate', en: 'Corporate event' },
        category: 'events',
        aspectRatio: 'landscape',
      },
      {
        id: 'e2',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Gala de premiere', en: 'Awards gala' },
        category: 'events',
        aspectRatio: 'portrait',
      },
      {
        id: 'e3',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Conferință', en: 'Conference' },
        category: 'events',
        aspectRatio: 'landscape',
      },
      {
        id: 'e4',
        type: 'video',
        src: '/placeholder.svg',
        thumbnail: '/placeholder.svg',
        alt: { ro: 'Highlight eveniment', en: 'Event highlights' },
        category: 'events',
        aspectRatio: 'landscape',
      },
      // Architecture
      {
        id: 'a1',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Interior modern', en: 'Modern interior' },
        category: 'architecture',
        aspectRatio: 'landscape',
      },
      {
        id: 'a2',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Exterior clădire', en: 'Building exterior' },
        category: 'architecture',
        aspectRatio: 'portrait',
      },
      {
        id: 'a3',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Detalii arhitecturale', en: 'Architectural details' },
        category: 'architecture',
        aspectRatio: 'square',
      },
      {
        id: 'a4',
        type: 'image',
        src: '/placeholder.svg',
        alt: { ro: 'Design interior', en: 'Interior design' },
        category: 'architecture',
        aspectRatio: 'landscape',
      },
    ],
  },
  services: {
    title: { ro: 'Servicii', en: 'Services' },
    subtitle: {
      ro: 'Servicii complete de fotografie și film',
      en: 'Complete photography and film services',
    },
    cta: {
      ro: 'Verifică disponibilitatea',
      en: 'Check availability',
    },
    categories: [
      {
        id: 'weddings',
        title: { ro: 'Nunți', en: 'Weddings' },
        description: {
          ro: 'Captăm esența zilei voastre speciale cu o abordare documentară și artistică.',
          en: 'We capture the essence of your special day with a documentary and artistic approach.',
        },
        deliverables: {
          ro: [
            'Fotografie full-day',
            'Film cinematografic 4K',
            'Sesiune foto pre-nuntă',
            'Galerie online privată',
            'Album foto premium',
            'Highlight video 3-5 min',
          ],
          en: [
            'Full-day photography',
            '4K cinematic film',
            'Pre-wedding photo session',
            'Private online gallery',
            'Premium photo album',
            '3-5 min highlight video',
          ],
        },
      },
      {
        id: 'events',
        title: { ro: 'Evenimente', en: 'Events' },
        description: {
          ro: 'De la conferințe la gale, documentăm momentele care definesc brandul tău.',
          en: 'From conferences to galas, we document the moments that define your brand.',
        },
        deliverables: {
          ro: [
            'Fotografie de eveniment',
            'Videografie multi-cameră',
            'Portrete profesionale',
            'Recap video pentru social media',
            'Livrare rapidă în 48h',
            'Drepturi complete de utilizare',
          ],
          en: [
            'Event photography',
            'Multi-camera videography',
            'Professional portraits',
            'Social media recap video',
            'Fast delivery in 48h',
            'Full usage rights',
          ],
        },
      },
      {
        id: 'architecture',
        title: { ro: 'Arhitectură', en: 'Architecture' },
        description: {
          ro: 'Fotografiem spații și structuri care inspiră, cu atenție la lumină și compoziție.',
          en: 'We photograph spaces and structures that inspire, with attention to light and composition.',
        },
        deliverables: {
          ro: [
            'Fotografie de interior',
            'Fotografie de exterior',
            'Imagini aeriene cu dronă',
            'Tour virtual 360°',
            'Retușuri profesionale',
            'Licență comercială',
          ],
          en: [
            'Interior photography',
            'Exterior photography',
            'Aerial drone imagery',
            '360° virtual tour',
            'Professional retouching',
            'Commercial license',
          ],
        },
      },
    ],
  },
  about: {
    title: { ro: 'Despre noi', en: 'About us' },
    description: {
      ro: 'Flambart este un studio de fotografie și film fondat în Cluj-Napoca, dedicat creării de imagini care transcend timpul. Credem că fiecare poveste merită să fie spusă cu autenticitate și rafinament.',
      en: 'Flambart is a photography and film studio founded in Cluj-Napoca, dedicated to creating images that transcend time. We believe every story deserves to be told with authenticity and refinement.',
    },
    mission: {
      ro: 'Misiunea noastră este să transformăm momentele efemere în amintiri durabile, printr-o combinație de tehnică impecabilă și sensibilitate artistică.',
      en: 'Our mission is to transform fleeting moments into lasting memories, through a combination of impeccable technique and artistic sensitivity.',
    },
    location: {
      ro: 'Cluj-Napoca, România',
      en: 'Cluj-Napoca, Romania',
    },
    values: [
      {
        title: { ro: 'Autenticitate', en: 'Authenticity' },
        description: {
          ro: 'Captăm emoții reale, nu momente fabricate.',
          en: 'We capture real emotions, not fabricated moments.',
        },
      },
      {
        title: { ro: 'Atenție la detalii', en: 'Attention to detail' },
        description: {
          ro: 'Fiecare cadru este compus cu grijă și intenție.',
          en: 'Every frame is composed with care and intention.',
        },
      },
      {
        title: { ro: 'Parteneriat', en: 'Partnership' },
        description: {
          ro: 'Colaborăm îndeaproape pentru a înțelege viziunea ta.',
          en: 'We collaborate closely to understand your vision.',
        },
      },
    ],
  },
  contact: {
    title: { ro: 'Contact', en: 'Contact' },
    subtitle: {
      ro: 'Hai să discutăm despre proiectul tău',
      en: "Let's discuss your project",
    },
    form: {
      name: { ro: 'Nume', en: 'Name' },
      email: { ro: 'Email', en: 'Email' },
      phone: { ro: 'Telefon', en: 'Phone' },
      category: { ro: 'Tip proiect', en: 'Project type' },
      date: { ro: 'Data evenimentului', en: 'Event date' },
      message: { ro: 'Mesaj', en: 'Message' },
      submit: { ro: 'Trimite mesaj', en: 'Send message' },
    },
    responseTime: {
      ro: 'Timp de răspuns: 24–48h',
      en: 'Response time: 24–48h',
    },
    email: 'hello@flambart.studio',
    phone: '+40 700 000 000',
    whatsapp: {
      number: '+40700000000',
      message: {
        ro: 'Bună! Aș dori să aflu mai multe despre serviciile Flambart.',
        en: 'Hello! I would like to learn more about Flambart services.',
      },
    },
  },
  footer: {
    copyright: {
      ro: '© 2024 Flambart Studio. Toate drepturile rezervate.',
      en: '© 2024 Flambart Studio. All rights reserved.',
    },
    location: {
      ro: 'Cluj-Napoca, România',
      en: 'Cluj-Napoca, Romania',
    },
  },
};

// Helper function to get text in current language
export function getText<T extends { ro: string; en: string }>(
  textObj: T,
  lang: Language
): string {
  return textObj[lang];
}
