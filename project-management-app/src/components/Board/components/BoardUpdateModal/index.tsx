import './styles.css';
import { FC, useEffect, useState } from 'react';
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
  title: string;
  openUpdateModal: boolean;
  handleCloseUpdateModal: () => void;
  handleUpdateBoard: (newTitle: string) => void;
}

const BoardUpdateModal: FC<IProps> = ({
  title,
  openUpdateModal,
  handleCloseUpdateModal,
  handleUpdateBoard,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (newTitle !== title) setDisabled(false);
    else setDisabled(true);
  }, [newTitle]);

  return (
    <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
      <DialogTitle className="modal__title">
        {t('BOARDS.EDIT')}
        <IconButton onClick={handleCloseUpdateModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ minWidth: '300px' }}>
        <TextField
          defaultValue={title}
          autoFocus
          margin="normal"
          id="title"
          label={t('BOARDS.TITLE_LABEL')}
          type="text"
          fullWidth
          variant="filled"
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={() => handleUpdateBoard(newTitle)}
          disabled={disabled}
        >
          {t('BOARDS.EDIT_APPLY')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardUpdateModal;
