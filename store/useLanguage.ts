import { useUIStore } from '@/store/uiStore';

export function useLanguage() {
  const { language, setLanguage } = useUIStore();
  
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