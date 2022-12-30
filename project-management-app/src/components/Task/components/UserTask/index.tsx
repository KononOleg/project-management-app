import './styles.css';
import { FC, useState } from 'react';
import { Avatar, Popover } from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux';
import { ITask } from '../../../../types';

interface IProps {
  userId: string;
  task: ITask;
  deleteUserTask: (userId: string) => void;
}

const UserTask: FC<IProps> = ({ userId, deleteUserTask }) => {
  const { users } = useAppSelector((state) => state.UsersSlice);

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
      <div onClick={handleClick}>
        <Avatar sx={{ bgcolor: 'red', width: 50, height: 50, cursor: 'pointer' }}>
          {users.find((user) => user._id === userId)?.name[0]}
        </Avatar>
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
            <Avatar sx={{ bgcolor: 'red', width: 86, height: 86 }}>
              {users.find((user) => user._id === userId)?.name[0]}
            </Avatar>
            <div>
              <p className="task-user-modal__name">
                {users.find((user) => user._id === userId)?.name}
              </p>
              <p className="task-user-modal__login">{`@${
                users.find((user) => user._id === userId)?.login
              }`}</p>
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
