import './styles.css';
import { FC } from 'react';
import logo from '../../assets/icon/trello-logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <header className="header__wrapper">
      <Link to="/">
        <img className="header__logo " src={logo} />
      </Link>
      <div className="header__buttons">
        <LanguageSwitcher />
        <Link to="signin" className="header__signin">
          {t('LOGIN_LINK')}
        </Link>
        <Link to="signup" className="header__signup">
          {t('SIGNUP_LINK')}
        </Link>
      </div>
    </header>
  );
};

export default Header;
