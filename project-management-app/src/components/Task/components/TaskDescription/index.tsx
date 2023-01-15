import './styles.css';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { TextareaAutosize } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useAppDispatch } from '../../../../hooks/redux';
import { ITask } from '../../../../types';
import { updateTask } from '../../../../store/thunks/TasksThunks';

interface IProps {
  description: string;
  task: ITask;
}

const TaskDescription: FC<IProps> = ({ description, task }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (newDescription.trim()) {
      setNewDescription(description);
    }
  }, [description]);

  const handlerOpenUpdate = () => setIsUpdate(true);
  const handlerCloseUpdate = () => setIsUpdate(false);
  const handlerSaveDescription = () => {
    setIsUpdate(false);
    dispatch(updateTask({ ...task, description: newDescription }));
  };

  const moveCaretAtEnd = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  };

  return (
    <div className="task-modal__description">
      <div className="task-modal__buttons">
        <ArticleOutlinedIcon />
        <p>Description</p>
        {description.trim() && (
          <button onClick={handlerOpenUpdate} className="task-description__change">
            Change
          </button>
        )}
      </div>
      <div>
        {!isUpdate ? (
          <div>
            {!description.trim() ? (
              <p className="task-description__title" onClick={handlerOpenUpdate}>
                Добавить более подробное описание...
              </p>
            ) : (
              <p
                className="task-description__title task-description__title_active"
                onClick={handlerOpenUpdate}
              >
                {description}
              </p>
            )}
          </div>
        ) : (
          <div>
            <TextareaAutosize
              autoFocus
              defaultValue={description.trim()}
              placeholder="Добавить более подробное описание..."
              className="task-description__input"
              onChange={(e) => setNewDescription(e.target.value)}
              onFocus={moveCaretAtEnd}
            />
            <div className="task-description__buttons">
              <button className="task-description__create" onClick={handlerSaveDescription}>
                Save
              </button>
              <button className="task-description__cancel" onClick={handlerCloseUpdate}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDescription;
