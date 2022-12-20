import './styles.css';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {i18n.resolvedLanguage === 'en' ? (
        <a className="language-switcher" onClick={() => i18n.changeLanguage('ru')}>
          EN
        </a>
      ) : (
        <a className="language-switcher" onClick={() => i18n.changeLanguage('en')}>
          RU
        </a>
      )}
    </>
  );
};

export default LanguageSwitcher;
