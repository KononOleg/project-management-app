import './styles.css';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumns } from '../../store/thunks/BoardThunks';
import { IColumn } from '../../types';
import CreateColumn from './components/CreateColumn';
import Column from '../Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../helpers';
import BoardService from '../../service/BoardService';
import { resetColumns, setColumns } from '../../store/reducers/BoardSlice';

interface IProps {
  id: string;
}

const Columns: FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.BoardSlice);

  useEffect(() => {
    dispatch(resetColumns());
    dispatch(getColumns(id as string));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
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
      return;
    }

    //If dropped in a different column
  };

  return (
    <div className="columns__wrapper">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
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
