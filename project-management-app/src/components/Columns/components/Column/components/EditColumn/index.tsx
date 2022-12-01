import './styles.css';
import { FC, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
import { useAppDispatch } from '../../../../../../hooks/redux';

interface IProps {
  title: string;
}

const EditColumn: FC<IProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const dispatch = useAppDispatch();

  const handlerCloseRename = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
  };

  const handlerRenameColumn = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(false);
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

export default EditColumn;
