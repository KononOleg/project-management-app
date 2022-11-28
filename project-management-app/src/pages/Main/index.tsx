import './styles.css';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Loading from '../../components/Loading';
import { IBoard } from '../../types';
import Board from '../../components/Board';
import { useSnackbar } from 'notistack';
import { createBoard, getBoards } from '../../store/thunks/BoardsThunks';

const MainPage: FC = () => {
  const { boards, error, isPending } = useAppSelector((state) => state.BoardsSlice);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  return (
    <>
      {isPending && <Loading />}
      <div className="main-page__wrapper">
        <h2 className="main-page__title">YOUR BOARDS</h2>
        <div className="main-page__boards">
          {boards.map((board: IBoard) => (
            <Board id={board._id} title={board.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;
