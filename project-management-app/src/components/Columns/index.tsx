import './styles.css';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getColumns } from '../../store/thunks/BoardThunks';
import { IColumn } from '../../types';

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
        <p>{column._id}</p>
      ))}
    </div>
  );
};

export default Columns;
