import './styles.css';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getColumns } from '../../store/thunks/BoardThunks';
import { IColumn } from '../../types';
import CreateColumn from './components/CreateColumn';
import Column from './components/Column';

interface IProps {
  id: string;
}

const Columns: FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.BoardSlice);

  useEffect(() => {
    dispatch(getColumns(id as string));
  }, []);

  return (
    <div className="columns__wrapper">
      {columns?.map((column: IColumn) => (
        <Column key={column._id} {...column} />
      ))}
      <CreateColumn boardId={id} />
    </div>
  );
};

export default Columns;
