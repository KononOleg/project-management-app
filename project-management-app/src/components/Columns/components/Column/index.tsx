import './styles.css';
import { FC } from 'react';
import { IColumn } from '../../../../types';
import CreateColumn from '../CreateColumn';
import RenameColumn from './components/RenameColumn';

const Column: FC<IColumn> = ({ title }) => {
  return (
    <div className="column__wrapper">
      <RenameColumn title={title} renameColumn={(newTitle: string) => console.log(newTitle)} />
      <div className="tasks__wrapper"></div>
      <div>
        <CreateColumn boardId="2" />
      </div>
    </div>
  );
};

export default Column;
