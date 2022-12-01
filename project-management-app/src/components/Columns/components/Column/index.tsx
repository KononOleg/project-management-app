import './styles.css';
import { FC } from 'react';
import { IColumn } from '../../../../types';
import EditColumn from './components/EditColumn';
import CreateTask from './components/CreateTask';

const Column: FC<IColumn> = ({ _id, title, boardId, order }) => {
  return (
    <div className="column__wrapper">
      <EditColumn titleColumn={title} columnId={_id} boardId={boardId} orderColumn={order} />
      <div className="tasks__wrapper"></div>
      <div>
        <CreateTask boardId={boardId} columnId={_id} />
      </div>
    </div>
  );
};

export default Column;
