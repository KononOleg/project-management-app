import './styles.css';
import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IProps {
  openDeleteModal: boolean;
  handleCloseDeleteModal: () => void;
  handleDeleteBoard: () => void;
}

const BoardDeleteModal: FC<IProps> = ({
  openDeleteModal,
  handleCloseDeleteModal,
  handleDeleteBoard,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
      <DialogTitle> {t('BOARDS.DELETE')}</DialogTitle>
      <DialogActions sx={{ justifyContent: 'center', padding: '16px 24px' }}>
        <Button variant="outlined" color="success" onClick={handleCloseDeleteModal}>
          {t('BOARDS.DELETE_DISAGREE')}
        </Button>
        <Button variant="outlined" color="error" onClick={handleDeleteBoard}>
          {t('BOARDS.DELETE_AGREE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardDeleteModal;
