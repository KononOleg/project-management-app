import './styles.css';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumns } from '../../store/thunks/BoardThunks';
import { IColumn } from '../../types';
import CreateColumn from './components/CreateColumn';
import Column from './components/Column';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface IProps {
  id: string;
}

const Columns: FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.BoardSlice);

  const [r, setR] = useState([]);

  useEffect(() => {
    dispatch(getColumns(id as string));
    setR(columns as any);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(r);
    const [reorderDate] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderDate);
    setR(items);
  };

  return (
    <div className="columns__wrapper">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}
            >
              {r?.map((column: IColumn, index: number) => {
                return (
                  <Draggable key={column._id} draggableId={column._id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Column key={column._id} {...column} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <CreateColumn boardId={id} />
    </div>
  );
};

export default Columns;
