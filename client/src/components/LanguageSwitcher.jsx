import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={() => changeLanguage(i18n.language === 'en' ? 'id' : 'en')}
      >
        <Globe className="h-5 w-5" />
        <span className="hidden sm:inline">
          {i18n.language === 'en' ? 'ID' : 'EN'}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
