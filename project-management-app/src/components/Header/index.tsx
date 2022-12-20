import './styles.css';
import { FC, useState } from 'react';
import logo from '../../assets/icon/trello-logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authSlice } from '../../store/reducers/AuthSlice';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';

const Header: FC = () => {
  const { t } = useTranslation();
  const { isAuth, user } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();
  const { signOut } = authSlice.actions;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header__wrapper">
      <Link to="/welcome">
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
          <>
            <Link to="/" className="header__boards">
              Перейти к вашим доскам
            </Link>
            <>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32, backgroundColor: 'red' }}>
                    {user?.name[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar />
                  <Link to="/profile" className="header__link">
                    Edit Profile
                  </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => dispatch(signOut())}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  {t('EXIT_BUTTON')}
                </MenuItem>
              </Menu>
            </>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
