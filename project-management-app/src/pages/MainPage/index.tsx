import './styles.css';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Loading from '../../components/Loading';
import { IBoard } from '../../types';
import Board from '../../components/Board';
import { useSnackbar } from 'notistack';
import { createBoard, getBoards } from '../../store/thunks/BoardsThunks';
import BoardCreateModal from './components/BoardCreateModal';

const MainPage: FC = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { boards, error, isPending } = useAppSelector((state) => state.BoardsSlice);
  const { user } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  const handlerCreateBoard = (title: string) => {
    if (user) {
      const { _id } = user;
      dispatch(createBoard({ owner: _id, title }));
      setOpenCreateModal(false);
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="main-page__wrapper">
        <h2 className="main-page__title">YOUR BOARDS:</h2>
        <div className="main-page__boards">
          {boards.map((board: IBoard) => (
            <Board key={board._id} id={board._id} title={board.title} />
          ))}
          <div className="main-page__add-button" onClick={() => setOpenCreateModal(true)}>
            <p>Create board</p>
          </div>
        </div>
      </div>
      <BoardCreateModal
        openCreateModal={openCreateModal}
        handlerCloseCreateBoard={() => setOpenCreateModal(false)}
        handlerCreateBoard={handlerCreateBoard}
      />
    </>
  );
};

export default MainPage;
