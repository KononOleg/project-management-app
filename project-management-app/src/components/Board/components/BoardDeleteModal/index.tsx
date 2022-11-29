import './styles.css';
import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface IProps {
  openDeleteModal: boolean;
  handleCloseDeleteModal: () => void;
  handleDeleteBoard: () => void;
}

const BoardDeleteModal: FC<IProps> = ({
  openDeleteModal,
  handleCloseDeleteModal,
  handleDeleteBoard,
}) => {
  return (
    <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
      <DialogTitle>{'Do you want to delete this board?'}</DialogTitle>
      <DialogActions sx={{ justifyContent: 'center', padding: '16px 24px' }}>
        <Button variant="outlined" color="success" onClick={handleCloseDeleteModal}>
          Disagree
        </Button>
        <Button variant="outlined" color="error" onClick={handleDeleteBoard}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardDeleteModal;
