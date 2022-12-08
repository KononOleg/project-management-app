import './styles.css';
import { FC, useState } from 'react';
import { Portal, TextareaAutosize } from '@mui/material';
import { ITask } from '../../../../types';
import { useAppDispatch } from '../../../../hooks/redux';
import { renameTask } from '../../../../store/thunks/TasksThunks';

interface IProps {
  closeRenameModal: () => void;
  task: ITask;
}

const RenameTaskModal: FC<IProps> = ({ closeRenameModal, task }) => {
  const [newTitle, setNewTitle] = useState('');

  const { title } = task;

  const dispatch = useAppDispatch();

  const handlerRenameTask = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    closeRenameModal();
    dispatch(renameTask({ ...task, title: newTitle }));
  };

  const handlerCloseRenameModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    closeRenameModal();
  };
  return (
    <>
      <div className="rename-task-modal__wrapper">
        <TextareaAutosize
          defaultValue={title}
          autoFocus
          className="rename-task-modal__input"
          minRows={3}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="rename-task-modal__button" onClick={handlerRenameTask}>
          Сохранить
        </button>
      </div>
      <Portal container={document.getElementById('root')}>
        <div className="rename-task-modal__modal " onClick={handlerCloseRenameModal}></div>
      </Portal>
    </>
  );
};

export default RenameTaskModal;
