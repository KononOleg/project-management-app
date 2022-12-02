import './styles.css';
import { FC } from 'react';
import { IColumn } from '../../../../types';
import EditColumn from './components/EditColumn';
import CreateTask from './components/CreateTask';

interface IProps extends IColumn {
  isDragging: boolean;
}

const Column: FC<IProps> = ({ _id, title, boardId, order, isDragging }) => {
  return (
    <div className={`column__wrapper ${isDragging ? 'column__wrapper_dragging' : ''}`}>
      <EditColumn titleColumn={title} columnId={_id} boardId={boardId} orderColumn={order} />
      <div className="tasks__wrapper"></div>
      <div>
        <CreateTask boardId={boardId} columnId={_id} />
      </div>
    </div>
  );
};

export default Column;
