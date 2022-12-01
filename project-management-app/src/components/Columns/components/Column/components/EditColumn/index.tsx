import './styles.css';
import { FC, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { deleteColumn, updateColumn } from '../../../../../../store/thunks/BoardThunks';

interface IProps {
  titleColumn: string;
  boardId: string;
  columnId: string;
  orderColumn: number;
}

const EditColumn: FC<IProps> = ({ titleColumn, boardId, columnId, orderColumn }) => {
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
    dispatch(updateColumn({ boardId, columnId, titleColumn: newTitle, orderColumn }));
    setOpen(false);
  };

  const handlerDeleteColumn = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteColumn({ boardId, columnId }));
  };

  return (
    <div className="column-edit__wrapper" onClick={() => setOpen(true)}>
      {!open ? (
        <>
          <h3 className="column-edit__title">{titleColumn}</h3>
          <IconButton size="small" onClick={handlerDeleteColumn}>
            <DeleteIcon />
          </IconButton>
        </>
      ) : (
        <div className="column-edit__rename">
          <input
            type="text"
            defaultValue={titleColumn}
            className="column-edit__input"
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
