import './styles.css';
import { FC, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';

interface IProps {
  title: string;
  renameColumn: (newTitle: string) => void;
}

const RenameColumn: FC<IProps> = ({ title, renameColumn }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handlerCloseRename = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
  };

  const handlerRenameColumn = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
    renameColumn(newTitle);
  };

  return (
    <div className="column-rename__wrapper" onClick={() => setOpen(true)}>
      {!open ? (
        <h3 className="column-rename__title">{title}</h3>
      ) : (
        <div>
          <input
            type="text"
            defaultValue={title}
            className="column-rename__input"
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <IconButton onClick={handlerCloseRename}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={handlerRenameColumn}>
            <CheckCircleIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default RenameColumn;
