import './styles.css';
import { FC } from 'react';
import logo from '../../assets/icon/trello.png';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <header className="header__wrapper">
      <a className="header__logo" href="/">
        <img className="logo__img" src={logo} />
        <h1 className="logo__title">Trello</h1>
      </a>
      <div className="header__buttons">
        <LanguageSwitcher />
        <a className="header__signin" href="signin">
          {t('LOGIN_LINK')}
        </a>
        <a className="header__signup" href="signup">
          {t('SIGNUP_LINK')}
        </a>
      </div>
    </header>
  );
};

export default Header;
