import './styles.css';
import { FC } from 'react';
import logo from '../../assets/icon/trello-logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <header className="header__wrapper">
      <img className="header__logo " src={logo} />
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
