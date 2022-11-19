import './styles.css';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="language-switcher__wrapper">
      <a
        className={
          i18n.resolvedLanguage === 'en'
            ? 'language-switcher__link_active'
            : 'language-switcher__link '
        }
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </a>
      <a
        className={
          i18n.resolvedLanguage === 'ru'
            ? 'language-switcher__link_active'
            : 'language-switcher__link '
        }
        onClick={() => i18n.changeLanguage('ru')}
      >
        RU
      </a>
    </div>
  );
};

export default LanguageSwitcher;
