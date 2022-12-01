import './styles.css';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/redux';
import { createColumn } from '../../../../store/thunks/BoardThunks';

interface IProps {
  boardId: string;
}

const CreateColumn: FC<IProps> = ({ boardId }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  return (
    <div className={`create-column__wrapper ${open && 'create-column__wrapper_edit'}`}>
      {!open ? (
        <p className="create-column__title" onClick={() => setOpen(true)}>
          <span className="create-column__title_span">+</span>Добавить еще одну колонку
        </p>
      ) : (
        <div>
          <input
            autoFocus
            type="text"
            className="create-column__input"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="create-column__buttons">
            <button
              className="create-column__add"
              onClick={() => {
                setTitle('');
                dispatch(createColumn({ boardId, titleColumn: title }));
              }}
            >
              Добавить список
            </button>
            <button onClick={() => setOpen(false)} className="create-column__cancel">
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateColumn;
