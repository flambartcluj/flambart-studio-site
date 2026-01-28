import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface ServiceItem {
  title: { ro: string; en: string };
  description: { ro: string; en: string };
}

interface ServiceSection {
  id: string;
  title: { ro: string; en: string };
  intro?: { ro: string; en: string };
  services: ServiceItem[];
  ctaLabel?: { ro: string; en: string };
  ctaLink?: string;
}

const serviceSections: ServiceSection[] = [
  {
    id: 'integrated',
    title: { ro: 'Servicii Integrate Foto + Video', en: 'Integrated Photo + Video Services' },
    intro: {
      ro: 'Echipă dedicată, stil unitar (cinematic sau documentar), flux de lucru optim, cadre aeriene incluse și flexibilitate totală în alegerea stilului. Ideal pentru evenimente și proiecte unde coerența vizuală este esențială.\n\nServiciile noastre foto-video transformă momentele speciale în amintiri memorabile, cu un mix perfect între creativitate și profesionalism. Surprindem momentele importante natural, cu atenție la lumină, detalii și emoțiile reale ale zilei.\n\nImaginile sunt atent editate și livrate digital, în galerie online securizată, ușor de accesat și de împărtășit.',
      en: 'Dedicated team, unified style (cinematic or documentary), optimized workflow, aerial footage included, and full flexibility in choosing the visual approach. Ideal for projects where visual coherence is essential.\n\nOur photo-video services transform special moments into memorable keepsakes, with a perfect blend of creativity and professionalism. We capture important moments naturally, with attention to light, details, and the genuine emotions of the day.\n\nImages are carefully edited and delivered digitally, in a secure online gallery, easy to access and share.',
    },
    services: [],
  },
  {
    id: 'weddings',
    title: { ro: 'Nunți & Evenimente Speciale', en: 'Weddings & Special Events' },
    services: [
      {
        title: { ro: 'Fotografie', en: 'Photography' },
        description: {
          ro: 'Imagini naturale și elegante, surprinse discret, cu editare premium și galerie online securizată.',
          en: 'Natural and elegant imagery captured discreetly, with premium editing and secure online gallery.',
        },
      },
      {
        title: { ro: 'Videografie – Cinematic Premium', en: 'Cinematic Videography' },
        description: {
          ro: 'Poveste artistică, regizată, cu cadre spectaculoase, colorizare avansată și sunet cinematic. Durată 8–20 min + teaser 1–2 min.',
          en: 'Artistic, directed storytelling with striking visuals, advanced color grading, and cinematic sound. 8–20 min film + 1–2 min teaser.',
        },
      },
      {
        title: { ro: 'Videografie – Documentar', en: 'Documentary Videography' },
        description: {
          ro: 'Filmare discretă, culori naturale și momente spontane. Film complet 45–90 min + clip best moments.',
          en: 'Discreet filming, natural colors, and spontaneous moments. Full film 45–90 min + best moments clip.',
        },
      },
      {
        title: { ro: 'Drone', en: 'Drone' },
        description: {
          ro: 'Cadre aeriene premium care adaugă rafinament și perspectivă unică.',
          en: 'Premium aerial footage adding refinement and a unique perspective.',
        },
      },
    ],
    ctaLabel: { ro: 'Vezi exemple din portofoliu', en: 'View portfolio examples' },
    ctaLink: '/portofoliu',
  },
  {
    id: 'portraits',
    title: { ro: 'Portret & Ședințe Personale', en: 'Portrait & Personal Sessions' },
    services: [
      {
        title: { ro: 'Fine Art Portraits', en: 'Fine Art Portraits' },
        description: {
          ro: 'Portrete artistice cu lumină controlată și editare avansată.',
          en: 'Artistic portraits with controlled lighting and refined editing.',
        },
      },
      {
        title: { ro: 'Cuplu & Familie', en: 'Couple & Family' },
        description: {
          ro: 'Cadre naturale sau creative, în studio sau outdoor.',
          en: 'Natural or creative imagery, in studio or outdoors.',
        },
      },
      {
        title: { ro: 'Baby & Ședințe Tematice', en: 'Baby & Themed Sessions' },
        description: {
          ro: 'Abordare delicată, lumină soft și compoziții curate.',
          en: 'Gentle approach, soft lighting, and clean compositions.',
        },
      },
      {
        title: { ro: 'Video pentru Social Media', en: 'Social Media Video' },
        description: {
          ro: 'Clipuri scurte, dinamice, optimizate pentru platforme online.',
          en: 'Short, dynamic clips optimized for online platforms.',
        },
      },
      {
        title: { ro: 'Drone (outdoor)', en: 'Drone (outdoor)' },
        description: {
          ro: 'Perspectivă elegantă pentru ședințe în natură.',
          en: 'Elegant aerial perspective for outdoor sessions.',
        },
      },
    ],
  },
  {
    id: 'corporate',
    title: { ro: 'Corporate & Business', en: 'Corporate & Business' },
    services: [
      {
        title: { ro: 'Portrete & Echipe', en: 'Portraits & Teams' },
        description: {
          ro: 'Headshots premium, optimizate pentru site și profiluri profesionale.',
          en: 'Premium headshots optimized for websites and professional profiles.',
        },
      },
      {
        title: { ro: 'Branding & Content', en: 'Branding & Content' },
        description: {
          ro: 'Fotografie de produs, imagini lifestyle și content pentru social media.',
          en: 'Product photography, lifestyle imagery, and social media content.',
        },
      },
      {
        title: { ro: 'Evenimente Corporate', en: 'Corporate Events' },
        description: {
          ro: 'Aftermovie, interviuri și prezentări video.',
          en: 'Aftermovies, interviews, and presentation videos.',
        },
      },
      {
        title: { ro: 'Drone Corporate', en: 'Corporate Drone' },
        description: {
          ro: 'Panorame aeriene pentru sedii și locații.',
          en: 'Aerial panoramas for offices and locations.',
        },
      },
    ],
  },
  {
    id: 'realestate',
    title: { ro: 'Imobiliar & Arhitectură', en: 'Real Estate & Architecture' },
    services: [
      {
        title: { ro: 'Fotografie Imobiliară', en: 'Real Estate Photography' },
        description: {
          ro: 'Cadre luminoase, compoziție corectă și detalii curate.',
          en: 'Bright imagery, correct composition, and clean details.',
        },
      },
      {
        title: { ro: 'Arhitectural', en: 'Architectural' },
        description: {
          ro: 'Linii precise, perspectivă controlată și abordare tehnică.',
          en: 'Precise lines, controlled perspective, and technical approach.',
        },
      },
      {
        title: { ro: 'Tururi Virtuale 360°', en: '360° Virtual Tours' },
        description: {
          ro: 'Walkthrough-uri interactive pentru prezentări moderne.',
          en: 'Interactive walkthroughs for modern presentations.',
        },
      },
      {
        title: { ro: 'Drone', en: 'Drone' },
        description: {
          ro: 'Imagini aeriene spectaculoase pentru marketing vizual.',
          en: 'Striking aerial imagery for visual marketing.',
        },
      },
    ],
  },
];

const pageContent = {
  hero: {
    title: {
      ro: 'Servicii Foto-Video Premium pentru Evenimente, Portrete, Branduri și Proiecte Imobiliare',
      en: 'Premium Photo & Video Services for Events, Portraits, Brands, and Real Estate',
    },
    subtitle: {
      ro: 'Oferim fotografie, videografie și imagini aeriene premium, adaptate fiecărui tip de proiect, în stil cinematic, documentar sau fine art.',
      en: 'We offer premium photography, videography, and aerial imagery, tailored to each project, in cinematic, documentary, or fine art style.',
    },
    reassurance: {
      ro: 'Experiență dovedită · Echipă coordonată · Livrare premium',
      en: 'Proven experience · Coordinated team · Premium delivery',
    },
  },
  cta: {
    label: { ro: 'Solicită ofertă personalizată', en: 'Request a custom quote' },
  },
};

export default function ServicesPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-secondary/20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-lg font-display text-foreground mb-6">
              {t(pageContent.hero.title)}
            </h1>
            <p className="body-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              {t(pageContent.hero.subtitle)}
            </p>
            <p className="text-sm text-muted-foreground/70 tracking-wide">
              {t(pageContent.hero.reassurance)}
            </p>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto space-y-20">
            {serviceSections.map((section) => (
              <div key={section.id} className="scroll-mt-24" id={section.id}>
                {/* Section Header */}
                <div className="mb-8">
                  <h2 className="heading-md font-display text-foreground mb-2">
                    {t(section.title)}
                  </h2>
                  <div className="w-12 h-px bg-primary" />
                </div>

                {/* Section Intro (for integrated services) */}
                {section.intro && (
                  <p className="body-md text-muted-foreground max-w-3xl">
                    {t(section.intro)}
                  </p>
                )}

                {/* Services Grid */}
                {section.services.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {section.services.map((service, idx) => (
                      <div key={idx} className="space-y-2">
                        <h3 className="font-medium text-foreground">
                          {t(service.title)}
                        </h3>
                        <p className="body-sm text-muted-foreground leading-relaxed">
                          {t(service.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Section CTA */}
                {section.ctaLabel && section.ctaLink && (
                  <div className="mt-8">
                    <Button variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary/5">
                      <Link to={section.ctaLink}>
                        {t(section.ctaLabel)}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container-wide">
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleContactClick}
            >
              {t(pageContent.cta.label)}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
