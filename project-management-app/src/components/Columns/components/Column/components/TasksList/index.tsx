import './styles.css';
import { FC } from 'react';
import { ITask } from '../../../../../../types';

interface IProps {
  filteredTasks: ITask[];
}

const TasksList: FC<IProps> = ({ filteredTasks }) => {
  return (
    <div className="tasks__wrapper">
      {filteredTasks.map((task) => (
        <p key={task._id}>{task.title}</p>
      ))}
    </div>
  );
};

export default TasksList;
