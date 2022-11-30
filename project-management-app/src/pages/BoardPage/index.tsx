import './styles.css';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Loading from '../../components/Loading';
import { useSnackbar } from 'notistack';
import { getBoard } from '../../store/thunks/BoardThunks';

const BoardPage: FC = () => {
  let { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { board, error, isPending } = useAppSelector((state) => state.BoardSlice);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  useEffect(() => {
    dispatch(getBoard(boardId as string));
  }, []);

  return (
    <>
      {isPending && <Loading />}
      <div className="board-page__wrapper">
        <h2 className="board-page__title">{board?.title}</h2>
      </div>
    </>
  );
};

export default BoardPage;
