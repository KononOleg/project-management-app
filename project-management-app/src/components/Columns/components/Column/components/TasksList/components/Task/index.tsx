import './styles.css';
import { FC, useState } from 'react';
import { ITask } from '../../../../../../../../types';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TaskModal from './components/TaskModal';

const Task: FC<ITask> = (task) => {
  const { title } = task;
  const [openModal, setOpenModal] = useState(false);

  const handlerOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <div className="task__wrapper" onClick={handlerOpenModal}>
        <p className="task__title">{title}</p>
        <IconButton className="task__edit-icon" size="small">
          <EditIcon />
        </IconButton>
      </div>
      <TaskModal openModal={openModal} handleCloseModal={handleCloseModal} task={task} />
    </>
  );
};

export default Task;
