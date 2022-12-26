import './styles.css';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumns } from '../../store/thunks/BoardThunks';
import { IColumn, ITask } from '../../types';
import CreateColumn from './components/CreateColumn';
import Column from '../Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../helpers';
import BoardService from '../../service/BoardService';
import { resetColumns, setColumns } from '../../store/reducers/BoardSlice';
import TasksService from '../../service/TasksService';
import { setTasks } from '../../store/reducers/TasksSlice';

interface IProps {
  id: string;
}

const Columns: FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.BoardSlice);
  const { tasks } = useAppSelector((state) => state.TasksSlice);

  useEffect(() => {
    dispatch(resetColumns());
    dispatch(getColumns(id as string));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'COLUMN') {
      const newColumns = reorder(columns, source.index, destination.index);
      const copyNewColumns: IColumn[] = [];
      newColumns.map((newColumn, index) => {
        const { boardId, _id, title } = newColumn;
        copyNewColumns.push({ ...newColumn, order: index + 1 });
        BoardService.updateColumn(boardId, _id, title, index + 1);
      });
      dispatch(setColumns(copyNewColumns));
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    //If dropped inside the same column
    if (start === finish) {
      const newTasksIndex = tasks.findIndex((task) => task.columnId === start);
      const newTasks = reorder(
        tasks[newTasksIndex].tasks,
        source.index,
        destination.index
      ) as ITask[];
      const copyNewTasks: ITask[] = [];
      newTasks.map((newTask, index) => {
        const { boardId, columnId, _id, title, description, userId, users } = newTask;
        copyNewTasks.push({ ...newTask, order: index + 1 });
        TasksService.updateTask(
          boardId,
          columnId,
          _id,
          title,
          index + 1,
          description,
          userId,
          users
        );
      });
      dispatch(setTasks({ columnId: start, tasks: copyNewTasks }));
      return;
    }

    //If dropped in a different column
    const newFirstTasksIndex = tasks.findIndex((task) => task.columnId === start);
    const newFirstTasks = Array.from(tasks[newFirstTasksIndex].tasks);
    newFirstTasks.splice(source.index, 1);
    const copyFirstNewTasks: ITask[] = [];
    newFirstTasks.map((newTask, index) => {
      const { boardId, columnId, _id, title, description, userId, users } = newTask;
      copyFirstNewTasks.push({ ...newTask, order: index + 1 });
      TasksService.updateTask(boardId, columnId, _id, title, index + 1, description, userId, users);
    });
    dispatch(setTasks({ columnId: start, tasks: copyFirstNewTasks }));

    const newSecondTasksIndex = tasks.findIndex((task) => task.columnId === finish);
    const res = Array.from(tasks[newFirstTasksIndex].tasks);
    const [newTask] = res.splice(source.index, 1);
    const newSecondTasks = Array.from(tasks[newSecondTasksIndex].tasks);
    newSecondTasks.splice(destination.index, 0, newTask);

    const copySecondNewTasks: ITask[] = [];
    newSecondTasks.map((newTask, index) => {
      const { boardId, columnId, _id, title, description, userId, users } = newTask;
      copySecondNewTasks.push({ ...newTask, order: index + 1 });
      TasksService.transferTask(
        boardId,
        columnId,
        finish,
        _id,
        title,
        index + 1,
        description,
        userId,
        users
      );
    });
    dispatch(setTasks({ columnId: finish, tasks: copySecondNewTasks }));
  };

  return (
    <div className="columns__wrapper">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="columns__list">
              {[...columns]
                .sort((a, b) => a.order - b.order)
                .map((column: IColumn, index: number) => (
                  <Column key={column._id} {...column} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateColumn boardId={id} orderColumn={columns.length + 1} />
    </div>
  );
};

export default Columns;
