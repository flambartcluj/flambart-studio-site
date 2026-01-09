import { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    date: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: language === 'ro' ? 'Mesaj trimis!' : 'Message sent!',
      description:
        language === 'ro'
          ? 'Te vom contacta în 24-48 de ore.'
          : "We'll get back to you within 24-48 hours.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      date: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="caption text-primary mb-4">{t(content.contact.title)}</p>
          <h2 className="heading-md font-serif">{t(content.contact.subtitle)}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                {t(content.contact.form.name)}
              </label>
              <Input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border focus:border-primary"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t(content.contact.form.email)}
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t(content.contact.form.phone)}
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                />
              </div>
            </div>

            {/* Category & Date */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t(content.contact.form.category)}
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weddings">
                      {t(content.portfolio.categories.weddings)}
                    </SelectItem>
                    <SelectItem value="events">
                      {t(content.portfolio.categories.events)}
                    </SelectItem>
                    <SelectItem value="architecture">
                      {t(content.portfolio.categories.architecture)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  {t(content.contact.form.date)}
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                {t(content.contact.form.message)}
              </label>
              <Textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background border-border focus:border-primary resize-none"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-premium bg-primary text-primary-foreground hover:bg-primary/90 py-6"
            >
              {isSubmitting ? (
                <span className="animate-pulse">
                  {language === 'ro' ? 'Se trimite...' : 'Sending...'}
                </span>
              ) : (
                <>
                  <Send size={18} />
                  {t(content.contact.form.submit)}
                </>
              )}
            </Button>

            {/* Response Time */}
            <p className="text-center text-xs text-muted-foreground">
              {t(content.contact.responseTime)}
            </p>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              {/* Email */}
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-250">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Email
                  </p>
                  <p className="text-foreground group-hover:text-primary transition-colors duration-250">
                    {content.contact.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${content.contact.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-250">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {language === 'ro' ? 'Telefon' : 'Phone'}
                  </p>
                  <p className="text-foreground group-hover:text-primary transition-colors duration-250">
                    {content.contact.phone}
                  </p>
                </div>
              </a>

              {/* Location Info */}
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {t(content.footer.location)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
