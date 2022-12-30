import './styles.css';
import { FC, useState } from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import { ITask, IUser } from '../../../../types';
import UserAddTask from '../UserAddTask';

interface IProps {
  task: ITask;
  deleteUserTask: (userId: string) => void;
}

const AddUsersTaskModal: FC<IProps> = ({ task, deleteUserTask }) => {
  const [searchMember, setSearchMember] = useState('');
  const { users } = useAppSelector((state) => state.UsersSlice);

  const filterCallback = (user: IUser) =>
    user.name.toLowerCase().includes(searchMember.toLowerCase()) ||
    user.login.toLowerCase().includes(searchMember.toLowerCase());

  return (
    <div className="add-users-task-modal__wrapper">
      <div className="add-users-task-modal__header">
        <h5 className="add-users-task-modal__title">Участники</h5>
      </div>
      <input
        type="text"
        placeholder="Поиск участников"
        autoFocus
        className="add-users-task-modal__input"
        onChange={(e) => setSearchMember(e.target.value)}
      />
      <h6>Участники доски</h6>
      <div>
        {users.filter(filterCallback).map((user) => (
          <UserAddTask user={user} task={task} deleteUserTask={deleteUserTask} key={user._id} />
        ))}
      </div>
    </div>
  );
};

export default AddUsersTaskModal;
