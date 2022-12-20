import './styles.css';
import { FC, useEffect, useState } from 'react';
import { IColumn, ITask } from '../../types';
import EditColumn from './components/EditColumn';
import CreateTask from './components/CreateTask';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getTasks } from '../../store/thunks/TasksThunks';
import TasksList from './components/TasksList';
import { Draggable } from 'react-beautiful-dnd';

interface IProps extends IColumn {
  index: number;
}

const Column: FC<IProps> = ({ index, ...column }) => {
  const { _id, title, boardId, order } = column;
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const { tasks } = useAppSelector((state) => state.TasksSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks({ boardId, columnId: _id }));
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks.find((task) => task.columnId === _id)?.tasks || []);
  }, [tasks]);

  return (
    <Draggable key={_id} draggableId={_id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          /*         className={`column__wrapper ${snapshot.isDragging ? 'column__wrapper_dragging' : ''}`} */
          className={'column__wrapper'}
        >
          <EditColumn titleColumn={title} columnId={_id} boardId={boardId} orderColumn={order} />
          <TasksList filteredTasks={filteredTasks} draggableId={_id} />
          <CreateTask boardId={boardId} columnId={_id} order={filteredTasks.length + 1} />
        </div>
      )}
    </Draggable>
  );
};
{
}

export default Column;
