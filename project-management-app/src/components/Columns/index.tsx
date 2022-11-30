import './styles.css';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getColumns } from '../../store/thunks/BoardThunks';
import { IColumn } from '../../types';
import CreateColumnButton from './components/CreateColumnButton';

interface IProps {
  id: string;
}

const Columns: FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.BoardSlice);

  useEffect(() => {
    dispatch(getColumns(id as string));
  }, []);

  const handleCreateColumn = (title: string) => {
    dispatch(createColumn({ boardId: id, titleColumn: title }));
  };

  return (
    <div className="columns__wrapper">
      {columns?.map((column: IColumn) => (
        <p>{column.title}</p>
      ))}
      <CreateColumnButton handleCreateColumn={handleCreateColumn} />
    </div>
  );
};

export default Columns;
