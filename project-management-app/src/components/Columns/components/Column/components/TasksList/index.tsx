import './styles.css';
import { FC } from 'react';
import { ITask } from '../../../../../../types';
import Task from './components/Task';

interface IProps {
  filteredTasks: ITask[];
}

const TasksList: FC<IProps> = ({ filteredTasks }) => {
  return (
    <div className="tasks__wrapper">
      {filteredTasks.map((task) => (
        <Task key={task._id} {...task} />
      ))}
    </div>
  );
};

export default TasksList;
