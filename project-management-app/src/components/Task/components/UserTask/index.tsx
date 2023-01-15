import './styles.css';
import { FC, useState } from 'react';
import { Avatar, Popover } from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux';
import { ITask, IUser } from '../../../../types';
import UserAvatar from '../../../UserAvatar';

interface IProps {
  userId: string;
  task: ITask;
  deleteUserTask: (userId: string) => void;
}

const UserTask: FC<IProps> = ({ userId, deleteUserTask }) => {
  const { users } = useAppSelector((state) => state.UsersSlice);
  const user = users.find((user) => user._id === userId);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  const deleteUserTaskHandler = () => {
    deleteUserTask(userId);
    handleClose();
  };

  return (
    <>
      <div onClick={handleClick} className="task-user__member">
        <UserAvatar user={user as IUser} size={50} />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <div className="task-user-modal__wrapper">
          <div className="task-user-modal__top">
            <UserAvatar user={user as IUser} size={86} />
            <div>
              <p className="task-user-modal__name">{user?.name}</p>
              <p className="task-user-modal__login">{`@${user?.login}`}</p>
            </div>
          </div>
          <div className="task-user-modal__bottom">
            <div className="task-user-modal__line"></div>
            <button className="task-user-modal__button" onClick={deleteUserTaskHandler}>
              Удалить из карточки
            </button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default UserTask;
