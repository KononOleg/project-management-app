import './styles.css';
import { Alert, AlertColor, Slide, SlideProps, Snackbar } from '@mui/material';
import { FC, useState } from 'react';

interface IProps {
  message: string;
  type: AlertColor;
}
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const CustomizedSnackbar: FC<IProps> = ({ message, type }) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      onClose={() => setOpen(false)}
    >
      <Alert severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbar;
