import './styles.css';
import { FC } from 'react';
import { IColumn } from '../../../../types';
import CreateColumnButton from '../CreateColumnButton';
import RenameColumn from './components/RenameColumn';

const Column: FC<IColumn> = ({ title }) => {
  return (
    <div className="column__wrapper">
      <RenameColumn title={title} renameColumn={(newTitle: string) => console.log(newTitle)} />
      <div className="tasks__wrapper"></div>
      <div>
        <CreateColumnButton handleCreateColumn={(title: string) => console.log(title)} />
      </div>
    </div>
  );
};

export default Column;
