import './styles.css';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumns } from '../../store/thunks/BoardThunks';
import { IColumn } from '../../types';
import CreateColumn from './components/CreateColumn';
import Column from './components/Column';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../helpers';

interface IProps {
  id: string;
}

const Columns: FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.BoardSlice);

  useEffect(() => {
    dispatch(getColumns(id as string));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newColumns = reorder(columns, result.source.index, result.destination.index);
    console.log(newColumns);
    /*    setR(items); */ // change the order on the server
  };

  return (
    <div className="columns__wrapper">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="columns__list">
              {[...columns]
                ?.sort((a, b) => a.order - b.order)
                .map((column: IColumn, index: number) => {
                  return (
                    <Draggable key={column._id} draggableId={column._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Column key={column._id} {...column} isDragging={snapshot.isDragging} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateColumn boardId={id} orderColumn={columns.length} />
    </div>
  );
};

export default Columns;
