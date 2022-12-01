import './styles.css';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { TextareaAutosize } from '@mui/material';

interface IProps {
  boardId: string;
  columnId: string;
}

const CreateTask: FC<IProps> = ({ boardId, columnId }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  return (
    <div className={`create-task__wrapper ${open && 'create-task__wrapper_edit'}`}>
      {!open ? (
        <p className="create-task__title" onClick={() => setOpen(true)}>
          <span className="create-task__title_span">+</span>Добавить карточку
        </p>
      ) : (
        <div>
          <TextareaAutosize
            autoFocus
            placeholder="Ввести заголовок для этой карточки"
            className="create-task__input"
            onChange={(e) => setTitle(e.target.value)}
            minRows={2}
          />
          <div className="create-task__buttons">
            <button
              className="create-task__add"
              onClick={() => {
                setTitle('');
              }}
            >
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
