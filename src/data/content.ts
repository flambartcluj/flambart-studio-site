// Flambart Studio - Content Data File
// Text and services are managed here
// Portfolio gallery items are managed in /public/gallery.json

import heroImage from '@/assets/hero-wedding.jpg';

export type Language = 'ro' | 'en';

export interface ServiceCategory {
  id: 'weddings' | 'baptisms' | 'portraits' | 'corporate' | 'architecture';
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
      baptisms: { ro: string; en: string };
      portraits: { ro: string; en: string };
      corporate: { ro: string; en: string };
      architecture: { ro: string; en: string };
    };
  };
  services: {
    title: { ro: string; en: string };
    subtitle: { ro: string; en: string };
    cta: { ro: string; en: string };
    viewAllCta: { ro: string; en: string };
    categories: ServiceCategory[];
    editorial: {
      title: { ro: string; en: string };
      intro: { ro: string; en: string };
      photography: {
        title: { ro: string; en: string };
        description: { ro: string; en: string };
        cta: { ro: string; en: string };
      };
      video: {
        title: { ro: string; en: string };
        intro: { ro: string; en: string };
        cinematic: {
          title: { ro: string; en: string };
          description: { ro: string; en: string };
          cta: { ro: string; en: string };
        };
        documentary: {
          title: { ro: string; en: string };
          description: { ro: string; en: string };
          cta: { ro: string; en: string };
        };
      };
      combined: {
        title: { ro: string; en: string };
        description: { ro: string; en: string };
        cta: { ro: string; en: string };
      };
    };
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
    backgroundImage: heroImage,
  },
  portfolio: {
    title: { ro: 'Portofoliu', en: 'Portfolio' },
    subtitle: {
      ro: 'O selecție din proiectele noastre recente',
      en: 'A selection from our recent projects',
    },
    categories: {
      weddings: { ro: 'Nunți', en: 'Weddings' },
      baptisms: { ro: 'Botezuri', en: 'Baptisms' },
      portraits: { ro: 'Portrete', en: 'Portraits' },
      corporate: { ro: 'Corporate & Branding', en: 'Corporate & Branding' },
      architecture: { ro: 'Arhitectură', en: 'Architecture' },
    },
  },
  services: {
    title: { ro: 'Servicii foto & video', en: 'Photo & video services' },
    subtitle: {
      ro: 'Servicii foto-video pentru evenimente, portrete și business, realizate cu atenție la detalii, emoție și coerență vizuală.',
      en: 'Photo and video services for events, portraits, and business, delivered with attention to detail, emotion, and visual consistency.',
    },
    cta: {
      ro: 'Verifică disponibilitatea',
      en: 'Check availability',
    },
    viewAllCta: {
      ro: 'Vezi toate serviciile',
      en: 'View all services',
    },
    categories: [
      {
        id: 'weddings',
        title: { ro: 'Nunți & Evenimente Speciale', en: 'Weddings & Special Events' },
        description: {
          ro: 'Fotografie și videografie premium pentru evenimente, în stil cinematic sau documentar, completate de cadre aeriene spectaculoase.',
          en: 'Premium photography and videography for events, in cinematic or documentary style, complemented by striking aerial footage.',
        },
        deliverables: { ro: [], en: [] },
      },
      {
        id: 'baptisms',
        title: { ro: 'Portret & Ședințe Personale', en: 'Portrait & Personal Sessions' },
        description: {
          ro: 'Portrete fine art, cuplu, familie și ședințe tematice, realizate cu lumină controlată și cadre creative.',
          en: 'Fine art portraits, couple, family, and themed sessions, created with controlled lighting and creative compositions.',
        },
        deliverables: { ro: [], en: [] },
      },
      {
        id: 'portraits',
        title: { ro: 'Corporate & Business', en: 'Corporate & Business' },
        description: {
          ro: 'Fotografie și video profesionale pentru branduri, echipe și evenimente corporate.',
          en: 'Professional photography and video for brands, teams, and corporate events.',
        },
        deliverables: { ro: [], en: [] },
      },
      {
        id: 'corporate',
        title: { ro: 'Imobiliar & Arhitectură', en: 'Real Estate & Architecture' },
        description: {
          ro: 'Fotografie premium, tururi virtuale 360° și imagini aeriene pentru prezentări de impact.',
          en: 'Premium photography, 360° virtual tours, and aerial imagery for high-impact presentations.',
        },
        deliverables: { ro: [], en: [] },
      },
      {
        id: 'architecture',
        title: { ro: 'Servicii Integrate Foto + Video', en: 'Integrated Photo + Video Services' },
        description: {
          ro: 'Experiență completă foto + video, cu echipă coordonată, stil unitar și opțiuni premium cu dronă.',
          en: 'A complete photo and video experience, with a coordinated team, unified visual style, and premium drone options.',
        },
        deliverables: { ro: [], en: [] },
      },
    ],
    editorial: {
      title: {
        ro: 'Serviciile noastre foto-video',
        en: 'Our photo & video services',
      },
      intro: {
        ro: 'Serviciile noastre foto-video imortalizează momentele tale speciale cu pasiune și profesionalism, transformându-le în amintiri de neuitat.',
        en: 'Our photo and video services capture your most important moments with passion and professionalism, turning them into lasting memories.',
      },
      photography: {
        title: { ro: 'Servicii Fotografie', en: 'Photography Services' },
        description: {
          ro: 'Fotografia surprinde momentele importante natural, cu atenție la lumină, detalii și emoțiile reale ale zilei. Documentăm pregătirile, ceremonia, momentele alături de familie sau în cuplu și atmosfera petrecerii, în funcție de pachetul ales. Imaginile sunt atent editate și livrate digital, într-o galerie online securizată, ușor de accesat și de împărtășit. Fotografia poate fi aleasă ca serviciu de sine stătător sau alături de video, pentru o amintire completă.',
          en: 'Photography captures important moments naturally, with attention to light, details, and genuine emotions. We document the preparations, ceremony, moments with family or as a couple, and the atmosphere of the celebration, depending on the chosen package. Images are carefully edited and delivered digitally in a secure online gallery, easy to access and share. Photography can be chosen as a standalone service or together with video for a complete memory.',
        },
        cta: { ro: 'Vezi exemple de fotografie', en: 'View photography examples' },
      },
      video: {
        title: { ro: 'Servicii Video', en: 'Video Services' },
        intro: {
          ro: 'Filmarea este amintirea pe care o vei revizita ani la rând, o poveste vie care prinde viață la fiecare vizionare.',
          en: 'Video is the memory you will revisit for years, a living story that comes alive with every viewing.',
        },
        cinematic: {
          title: { ro: 'Cinematic', en: 'Cinematic' },
          description: {
            ro: 'Poveste cu regie planificată împreună cu voi, cu impact vizual ridicat prin colorizare artistică, sunet cinematic și cadre atent compuse. Durată: 8–20 minute + teaser 1–2 minute (inclusiv format vertical, dacă se stabilește anterior). Potrivit pentru evenimente cu focus pe estetică și distribuire online.',
            en: 'A carefully planned, story-driven film with strong visual impact through artistic color grading, cinematic sound, and composed frames. Duration: 8–20 minutes + 1–2 minute teaser (including vertical format if agreed in advance). Ideal for events focused on aesthetics and online sharing.',
          },
          cta: { ro: 'Vezi un exemplu cinematic', en: 'View a cinematic example' },
        },
        documentary: {
          title: { ro: 'Documentar', en: 'Documentary' },
          description: {
            ro: 'Filmare autentică și discretă, cu intervenții minime și culori naturale, aproape de realitate. Momente spontane, surprinse exact așa cum se întâmplă. Se livrează un film complet de 45–90 minute și un clip „best moments" de 1–4 minute.',
            en: 'Authentic, discreet filming with minimal intervention and natural colors true to reality. Spontaneous moments captured as they happen. Delivered as a full 45–90 minute film and a 1–4 minute best moments highlight.',
          },
          cta: { ro: 'Vezi un exemplu documentar', en: 'View a documentary example' },
        },
      },
      combined: {
        title: { ro: 'Servicii Complete Foto + Video', en: 'Complete Photo + Video Services' },
        description: {
          ro: 'Oferă cea mai fluidă experiență, cu o echipă dedicată care lucrează coordonat pentru o capturare coerentă și o editare unitară. Elimină complicațiile logistice și livrează amintiri consistente, cu o viziune artistică integrată.',
          en: 'Offers the most seamless experience, with a dedicated team working in sync for cohesive capture and unified editing. Eliminates logistical complexity and delivers consistent memories with an integrated artistic vision.',
        },
        cta: { ro: 'Verifică disponibilitatea', en: 'Check availability' },
      },
    },
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
    email: 'flambartcluj@gmail.com',
    phone: '+40 774 902 262',
    whatsapp: {
      number: '+40774902262',
      message: {
        ro: 'Bună! Am văzut portofoliul Flambart și aș dori mai multe detalii.',
        en: 'Hi! I saw the Flambart portfolio and would like more details.',
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
