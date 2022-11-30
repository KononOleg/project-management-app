import './styles.css';
import { FC, useState } from 'react';

interface IProps {
  handleCreateColumn: (title: string) => void;
}

const CreateColumnButton: FC<IProps> = ({ handleCreateColumn }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

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
                handleCreateColumn(title);
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

export default CreateColumnButton;
