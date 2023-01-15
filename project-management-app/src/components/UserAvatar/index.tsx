import './styles.css';
import { FC } from 'react';
import { Avatar } from '@mui/material';
import { IUser } from '../../types';
import { stringAvatar } from '../../helpers';

interface IProps {
  user: IUser;
  size: number;
}

const UserAvatar: FC<IProps> = ({ user, size }) => {
  const { name } = user;
  const userImage = '';
  return (
    <>
      {userImage ? (
        <Avatar sx={{ width: size, height: size }} alt={name} src={userImage} />
      ) : (
        <Avatar {...stringAvatar(name, size)} />
      )}
    </>
  );
};

export default UserAvatar;
