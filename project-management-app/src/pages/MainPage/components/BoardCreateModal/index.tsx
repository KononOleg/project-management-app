import './styles.css';
import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface IProps {
  openCreateModal: boolean;
  handlerCloseCreateBoard: () => void;
  handlerCreateBoard: (title: string) => void;
}

const BoardCreateModal: FC<IProps> = ({
  openCreateModal,
  handlerCloseCreateBoard,
  handlerCreateBoard,
}) => {
  const [title, setTitle] = useState('');
  const { t } = useTranslation();

  return (
    <Dialog open={openCreateModal} onClose={handlerCloseCreateBoard}>
      <DialogTitle className="modal__title">
        {t('BOARDS.CREATE')}
        <IconButton onClick={handlerCloseCreateBoard}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ minWidth: '300px' }}>
        <TextField
          autoFocus
          margin="normal"
          id="title"
          label={t('BOARDS.TITLE_LABEL')}
          type="text"
          fullWidth
          variant="filled"
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={() => handlerCreateBoard(title)}
        >
          {t('BOARDS.CREATE_APPLY')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardCreateModal;
