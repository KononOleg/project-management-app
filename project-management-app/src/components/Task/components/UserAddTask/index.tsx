import './styles.css';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/redux';
import { updateTask } from '../../../../store/thunks/TasksThunks';
import { Avatar } from '@mui/material';
import { ITask, IUser } from '../../../../types';
import CheckIcon from '@mui/icons-material/Check';

interface IProps {
  user: IUser;
  task: ITask;
  deleteUserTask: (userId: string) => void;
}

const UserAddTask: FC<IProps> = ({ user, task, deleteUserTask }) => {
  const { _id, name, login } = user;
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (task.users.includes(_id)) setIsActive(true);
    else setIsActive(false);
  }, [task]);

  const addUserTaskHandler = (_id: string) => {
    if (!isActive) dispatch(updateTask({ ...task, users: [...task.users, _id] }));
    else deleteUserTask(_id);
  };

  return (
    <div className="add-users-task-modal__user" onClick={() => addUserTaskHandler(_id)}>
      <div className="add-users-task-modal__left">
        <Avatar sx={{ bgcolor: 'red' }}>{name[0]}</Avatar>
        <p>{`${login} (${name})`}</p>
      </div>

      {isActive && <CheckIcon />}
    </div>
  );
};

export default UserAddTask;
