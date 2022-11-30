import './styles.css';
import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { deleteBoard, updateBoard } from '../../store/thunks/BoardsThunks';
import BoardUpdateModal from './components/BoardUpdateModal';
import BoardDeleteModal from './components/BoardDeleteModal';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Link } from 'react-router-dom';

interface IProps {
  id: string;
  title: string;
}

const Board: FC<IProps> = ({ id, title }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(id));
    setOpenDeleteModal(false);
  };
  const handleUpdateBoard = (newTitle: string) => {
    dispatch(updateBoard({ id: id, title: newTitle }));
    setOpenUpdateModal(false);
  };

  const handleOpenCreateModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenUpdateModal(true);
  };
  const handleOpenDeleleModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenDeleteModal(true);
  };
  return (
    <>
      <Link to={`/board/${id}`} className="board__wrapper">
        <h3>{title}</h3>
        <div className="board-button__wrapper">
          <IconButton onClick={handleOpenCreateModal}>
            <UpdateIcon />
          </IconButton>
          <IconButton onClick={handleOpenDeleleModal}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Link>

      <BoardDeleteModal
        openDeleteModal={openDeleteModal}
        handleDeleteBoard={handleDeleteBoard}
        handleCloseDeleteModal={() => setOpenDeleteModal(false)}
      />

      <BoardUpdateModal
        title={title}
        openUpdateModal={openUpdateModal}
        handleUpdateBoard={handleUpdateBoard}
        handleCloseUpdateModal={() => setOpenUpdateModal(false)}
      />
    </>
  );
};

export default Board;
