import { MessageCircle } from 'lucide-react';
import { content } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';

export function WhatsAppButton() {
  const { t } = useLanguage();

  const handleClick = () => {
    const message = encodeURIComponent(t(content.contact.whatsapp.message));
    const number = content.contact.whatsapp.number.replace(/\D/g, '');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-250 hover:scale-110"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}
