import './styles.css';
import { FC, useEffect, useState } from 'react';
import { IColumn, ITask } from '../../../../types';
import EditColumn from './components/EditColumn';
import CreateTask from './components/CreateTask';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getTasks } from '../../../../store/thunks/TasksThunks';

interface IProps extends IColumn {
  isDragging: boolean;
}

const Column: FC<IProps> = ({ _id, title, boardId, order, isDragging }) => {
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const { tasks } = useAppSelector((state) => state.TasksSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks({ boardId, columnId: _id }));
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.columnId === _id));
  }, [tasks]);

  return (
    <div className={`column__wrapper ${isDragging ? 'column__wrapper_dragging' : ''}`}>
      <EditColumn titleColumn={title} columnId={_id} boardId={boardId} orderColumn={order} />
      <div className="tasks__wrapper">
        {filteredTasks.map((task) => (
          <p key={task._id}>{task.title}</p>
        ))}
      </div>
      <CreateTask boardId={boardId} columnId={_id} order={filteredTasks.length + 1} />
    </div>
  );
};

export default Column;
