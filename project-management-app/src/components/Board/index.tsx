import './styles.css';
import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { deleteBoard, updateBoard } from '../../store/thunks/BoardsThunks';
import BoardUpdateModal from './components/BoardUpdateModal';
import BoardDeleteModal from './components/BoardDeleteModal';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

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
  return (
    <>
      <div className="board__wrapper">
        <h3>{title}</h3>
        <div className="board-button__wrapper">
          <IconButton onClick={() => setOpenUpdateModal(true)}>
            <UpdateIcon />
          </IconButton>
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

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
