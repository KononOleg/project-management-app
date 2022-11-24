import './styles.css';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/icon/trello-logo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signIn, signUp } from '../../store/thunks/AuthThunks';
import CustomizedSnackbar from '../../components/CustomizedSnackbar';
import { useSnackbar } from 'notistack';

interface IFormInputs {
  name: string;
  login: string;
  password: string;
}

interface IProps {
  isSignUp?: boolean;
}

const Authorization: FC<IProps> = ({ isSignUp }) => {
  const {
    register,
    formState: { errors, isDirty, submitCount },
    handleSubmit,
    reset,
  } = useForm<IFormInputs>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAuth, error } = useAppSelector((state) => state.AuthReducer);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [isAuth]);

  useEffect(() => {
    reset();
  }, [isSignUp]);

  useEffect(() => {
    if (error) enqueueSnackbar(t(`AUTHORIZATION.${error}`), { variant: 'error' });
  }, [error, submitCount]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (isSignUp) dispatch(signUp(data));
    else dispatch(signIn(data));
  };

  return (
    <div className="authorization__wrapper">
      <img src={logo} className="authorization__logo" />
      <form onSubmit={handleSubmit(onSubmit)} className="authorization__form">
        <h3 className="authorization-form__title">
          {isSignUp ? t('AUTHORIZATION.TITLE_SIGNUP') : t('AUTHORIZATION.TITLE_SIGNIN')}
        </h3>

        {isSignUp && (
          <div className="authorization-input__wrapper">
            <input
              placeholder={t('AUTHORIZATION.NAME_PLACEHOLDER') as string}
              {...register('name', { required: t('AUTHORIZATION.NAME_ERROR') as string })}
              className={`authorization__input ${errors.name && 'authorization__input_error'}`}
            />
            {errors.name && <p className="authorization-input__error">{errors?.name.message}</p>}
          </div>
        )}

        <div className="authorization-input__wrapper">
          <input
            placeholder={t('AUTHORIZATION.LOGIN_PLACEHOLDER') as string}
            {...register('login', { required: t('AUTHORIZATION.LOGIN_ERROR') as string })}
            className={`authorization__input ${errors.login && 'authorization__input_error'}`}
          />
          {errors.login && <p className="authorization-input__error">{errors?.login.message}</p>}
        </div>
        <div className="authorization-input__wrapper">
          <input
            placeholder={t('AUTHORIZATION.PASSWORD_PLACEHOLDER') as string}
            type="password"
            {...register('password', {
              required: t('AUTHORIZATION.PASSWORD_ERROR') as string,
              minLength: { value: 8, message: t('AUTHORIZATION.PASSWORD_ERROR_LENGTH') },
            })}
            className={`authorization__input ${errors.password && 'authorization__input_error'}`}
          />
          {errors.password && (
            <p className="authorization-input__error">{errors?.password.message}</p>
          )}
        </div>
        <input
          type="submit"
          className="authorization__submit"
          disabled={!isDirty}
          value={t('AUTHORIZATION.SUBMIT') as string}
        />

        {isSignUp ? (
          <Link to="/signin" className="authorization__link">
            {t('AUTHORIZATION.LINK_SINGIN')}
          </Link>
        ) : (
          <Link to="/signup" className="authorization__link">
            {t('AUTHORIZATION.LINK_SINGUP')}
          </Link>
        )}
      </form>
    </div>
  );
};

export default Authorization;
