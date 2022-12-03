import './styles.css';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { TextareaAutosize } from '@mui/material';
import { createTask } from '../../../../../../store/thunks/TasksThunks';

interface IProps {
  boardId: string;
  columnId: string;
  order: number;
}

const CreateTask: FC<IProps> = ({ boardId, columnId, order }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const { user } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();

  const handlerCreateTask = () => {
    dispatch(
      createTask({
        boardId,
        columnId,
        title,
        order,
        description: ' ',
        userId: user?._id as string,
      })
    );
    setTitle('');
  };

  return (
    <div className={`create-task__wrapper ${open && 'create-task__wrapper_edit'}`}>
      {!open ? (
        <p className="create-task__title" onClick={() => setOpen(true)}>
          <span className="create-task__title_span">+</span>Добавить карточку
        </p>
      ) : (
        <div>
          <TextareaAutosize
            value={title}
            autoFocus
            placeholder="Ввести заголовок для этой карточки"
            className="create-task__input"
            onChange={(e) => setTitle(e.target.value)}
            minRows={2}
          />
          <div className="create-task__buttons">
            <button className="create-task__add" onClick={handlerCreateTask}>
              Добавить карточку
            </button>
            <button onClick={() => setOpen(false)} className="create-task__cancel">
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
