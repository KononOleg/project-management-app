import './styles.css';
import { FC, useRef, useState } from 'react';
import { ITask } from '../../../../types';
import { Popover } from '@mui/material';
import AddUsersTaskModal from '../AddUsersTaskModal';
import UserTask from '../UserTask';
import { updateTask } from '../../../../store/thunks/TasksThunks';
import { useAppDispatch } from '../../../../hooks/redux';

interface IProps {
  task: ITask;
}

const UsersTask: FC<IProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const divEl = useRef(null);

  const handleClick = () => setAnchorEl(divEl.current);
  const handleClose = () => setAnchorEl(null);

  const deleteUserTask = (userId: string) => {
    const copyTask = [...task.users];
    copyTask.splice(task.users.indexOf(userId), 1);
    dispatch(updateTask({ ...task, users: copyTask }));
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <h3 className="task-users__title">Members</h3>
      <div className="task-users__users" ref={divEl}>
        {task.users.map((user) => (
          <UserTask key={user} userId={user} task={task} deleteUserTask={deleteUserTask} />
        ))}
        <button className="task-users__add" onClick={handleClick}>
          <span>+</span>
        </button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <AddUsersTaskModal task={task} deleteUserTask={deleteUserTask} />
        </Popover>
      </div>
    </div>
  );
};
export default UsersTask;
