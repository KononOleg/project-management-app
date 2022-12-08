import './styles.css';
import { FC } from 'react';
import { ITask } from '../../../../types';
import Task from '../../../Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface IProps {
  filteredTasks: ITask[];
  draggableId: string;
}

const TasksList: FC<IProps> = ({ filteredTasks, draggableId }) => {
  return (
    <Droppable droppableId={draggableId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="tasks__wrapper">
          {[...filteredTasks]
            .sort((a, b) => a.order - b.order)
            .map((task: ITask, index: number) => {
              return (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task key={task._id} task={task} isDragging={snapshot.isDragging} />
                    </div>
                  )}
                </Draggable>
              );
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TasksList;
