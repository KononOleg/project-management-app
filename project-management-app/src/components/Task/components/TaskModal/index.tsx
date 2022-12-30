import './styles.css';
import { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { ITask } from '../../../../types';
import Button from '@mui/material/Button';
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import TaskDescription from '../TaskDescription';
import UsersTask from '../UsersTask';

interface IProps {
  openModal: boolean;
  handleCloseModal: () => void;
  task: ITask;
}

const TaskModal: FC<IProps> = ({ openModal, handleCloseModal, task }) => {
  const { title, description } = task;

  return (
    <Dialog open={openModal} onClose={handleCloseModal} fullWidth={true}>
      <DialogTitle className="modal__title" sx={{ backgroundColor: '#091e420a' }}>
        <div className="task-modal__buttons">
          <BrandingWatermarkOutlinedIcon />
          <h4>{title}</h4>
        </div>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#091e420a' }}>
        <UsersTask task={task} />
        <TaskDescription description={description} />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          backgroundColor: '#091e420a',
        }}
      >
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
