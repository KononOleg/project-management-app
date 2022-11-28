import './styles.css';
import { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useAppDispatch } from '../../hooks/redux';
import { deleteBoard, updateBoard } from '../../store/thunks/BoardsThunks';

interface IProps {
  id: string;
  title: string;
}

const Board: FC<IProps> = ({ id, title }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [name, setName] = useState(title);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (name !== title) setDisabled(false);
    else setDisabled(true);
  }, [name]);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleClickOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleClickOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(id));
    handleCloseDeleteModal();
  };
  const handleUpdateBoard = () => {
    dispatch(updateBoard({ id: id, title: name }));
    handleCloseUpdateModal();
  };
  return (
    <>
      <div className="board__wrapper">
        <h3>{name}</h3>
        <div className="board-button__wrapper">
          <IconButton aria-label="delete" onClick={handleClickOpenUpdateModal}>
            <UpdateIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleClickOpenDeleteModal}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{' Do you want to delete this board?'}</DialogTitle>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleCloseDeleteModal}>
            Disagree
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteBoard} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{' Do you want to update this board?'}</DialogTitle>

        <DialogContent>
          <TextField
            defaultValue={name}
            autoFocus
            margin="normal"
            id="name"
            label="Board name"
            type="text"
            fullWidth
            variant="filled"
            onChange={(e) => setName(e.target.value)}
          />

          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              onClick={handleUpdateBoard}
              disabled={disabled}
            >
              Edit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Board;
