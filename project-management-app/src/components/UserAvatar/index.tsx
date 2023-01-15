import './styles.css';
import { FC, useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { IUser } from '../../types';
import { stringAvatar } from '../../helpers';
import { useAppSelector } from '../../hooks/redux';

interface IProps {
  user: IUser;
  size: number;
}

const UserAvatar: FC<IProps> = ({ user, size }) => {
  const { files } = useAppSelector((state) => state.FilesSlice);

  const getImage = () => {
    const findUserImage = files.find((file) => file._id === user._id);
    return findUserImage ? findUserImage.file : '';
  };

  const [userImage, setUserImage] = useState(getImage());
  useEffect(() => {
    setUserImage(getImage());
  }, [files]);

  return (
    <>
      {user &&
        (userImage ? (
          <Avatar sx={{ width: size, height: size }} alt={user.name} src={userImage} />
        ) : (
          <Avatar {...stringAvatar(user.name, size)} />
        ))}
    </>
  );
};

export default UserAvatar;
