import './styles.css';
import { FC } from 'react';
import { ITask } from '../../../../../../../../types';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Task: FC<ITask> = ({ title }) => {
  return (
    <div className="task__wrapper">
      <p className="task__title">{title}</p>
      <IconButton className="task__edit-icon" size="small">
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default Task;
