import './styles.css';
import { FC, useState } from 'react';
import { ITask } from '../../types';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TaskModal from './components/TaskModal';
import RenameTaskModal from './components/RenameTaskModal';

interface IProps {
  task: ITask;
  isDragging: boolean;
}

const Task: FC<IProps> = ({ task }) => {
  const { title } = task;
  const [openModal, setOpenModal] = useState(false);
  const [openRenameModal, setOpenRenameModal] = useState(false);

  const handlerOpenModal = () => !openRenameModal && setOpenModal(true);
  const handlerCloseModal = () => setOpenModal(false);

  const handlerOpenRenameModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenRenameModal(true);
  };
  const closeRenameModal = () => setOpenRenameModal(false);

  return (
    <>
      <div className="task__wrapper" onClick={handlerOpenModal}>
        <p className="task__title">{title}</p>
        <IconButton className="task__edit-icon" size="small" onClick={handlerOpenRenameModal}>
          <EditIcon />
        </IconButton>
        {openRenameModal && <RenameTaskModal closeRenameModal={closeRenameModal} task={task} />}
      </div>
      <TaskModal openModal={openModal} handleCloseModal={handlerCloseModal} task={task} />
    </>
  );
};

export default Task;
