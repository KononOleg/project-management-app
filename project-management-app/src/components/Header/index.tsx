import './styles.css';
import { FC } from 'react';
import logo from '../../assets/icon/trello-logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authSlice } from '../../store/reducers/AuthSlice';

const Header: FC = () => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();
  const { signOut } = authSlice.actions;

  return (
    <header className="header__wrapper">
      <Link to="/">
        <img className="header__logo " src={logo} />
      </Link>
      <div className="header__buttons">
        <LanguageSwitcher />
        {!isAuth ? (
          <>
            <Link to="signin" className="header__signin">
              {t('LOGIN_LINK')}
            </Link>
            <Link to="signup" className="header__signup">
              {t('SIGNUP_LINK')}
            </Link>
          </>
        ) : (
          <button onClick={() => dispatch(signOut())} className="header__exit">
            {t('EXIT_BUTTON')}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
