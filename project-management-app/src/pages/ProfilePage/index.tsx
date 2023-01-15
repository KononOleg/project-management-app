import './styles.css';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { updateUser } from '../../store/thunks/AuthThunks';
import UserAvatar from '../../components/UserAvatar';
import { IUser } from '../../types';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IconButton } from '@mui/material';

interface IFormInputs {
  name: string;
  login: string;
  password: string;
}

const ProfilePage: FC = () => {
  const {
    register,
    formState: { errors, isDirty, submitCount },
    handleSubmit,
  } = useForm<IFormInputs>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user, error, isPending } = useAppSelector((state) => state.AuthReducer);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) enqueueSnackbar(t(`PROFILE_EDIT.${error}`), { variant: 'error' });
  }, [error, submitCount]);

  useEffect(() => {
    if (submitCount) enqueueSnackbar(t('PROFILE_EDIT.SUCCESSFUL'), { variant: 'success' });
  }, [user]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(updateUser({ id: user?._id as string, signUpRequest: data }));
  };

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.onloadend = function () {
      console.log('base64', reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="profile-page__wrapper">
      <h2 className="profile__page_title">{user?.name}</h2>
      <div className="profile-page__content">
        <div className="profile-page__avatar">
          <UserAvatar user={user as IUser} size={400} />
          <div className="profile-page-avatar__upload">
            <IconButton aria-label="upload picture" component="label" size="large">
              <input hidden accept="image/*" type="file" onChange={uploadAvatar} />
              <AddAPhotoIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="authorization__form">
          <h3 className="authorization-form__title">{t('PROFILE_EDIT.TITLE')}</h3>

          <div className="authorization-input__wrapper">
            <input
              placeholder={t('AUTHORIZATION.NAME_PLACEHOLDER') as string}
              {...register('name', { required: t('AUTHORIZATION.NAME_ERROR') as string })}
              className={`authorization__input ${errors.name && 'authorization__input_error'}`}
            />
            {errors.name && <p className="authorization-input__error">{errors?.name.message}</p>}
          </div>

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
          <LoadingButton disabled={!isDirty} loading={isPending} type="submit" variant="contained">
            {t('PROFILE_EDIT.SUBMIT')}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
