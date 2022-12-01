import './styles.css';
import { FC } from 'react';
import { IColumn } from '../../../../types';
import RenameColumn from './components/RenameColumn';
import CreateTask from './components/CreateTask';

const Column: FC<IColumn> = ({ _id, title, boardId }) => {
  return (
    <div className="column__wrapper">
      <RenameColumn title={title} renameColumn={(newTitle: string) => console.log(newTitle)} />
      <div className="tasks__wrapper"></div>
      <div>
        <CreateTask boardId={boardId} columnId={_id} />
      </div>
    </div>
  );
};

export default Column;
