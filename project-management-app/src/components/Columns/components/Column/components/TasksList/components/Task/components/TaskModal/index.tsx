import './styles.css';
import { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { ITask } from '../../../../../../../../../../types';
import Button from '@mui/material/Button';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface IProps {
  openModal: boolean;
  handleCloseModal: () => void;
  task: ITask;
}

const TaskModal: FC<IProps> = ({ openModal, handleCloseModal, task }) => {
  const { title } = task;
  return (
    <Dialog open={openModal} onClose={handleCloseModal} fullWidth={true}>
      <DialogTitle className="modal__title">
        <div className="task-modal__buttons">
          <BrandingWatermarkOutlinedIcon />
          <h4>{title}</h4>
        </div>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="task-modal__description">
          <div className="task-modal__buttons">
            <ArticleOutlinedIcon />
            <p>Description</p>
          </div>
          <div className="task-modal-description__input"></div>
        </div>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Button variant="outlined" startIcon={<SaveIcon />}>
          Save
        </Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
