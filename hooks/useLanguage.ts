import { useUIStore } from '@/store/uiStore';

export function useLanguage() {
  const { language, setLanguage } = useUIStore();
  
  // বাংলায় বা ইংরেজিতে টেক্সট রিটার্ন করবে
  const t = (bn: string, en: string) => {
    return language === 'bn' ? bn : en;
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };
  
  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isBangla: language === 'bn',
    isEnglish: language === 'en',
  };
}