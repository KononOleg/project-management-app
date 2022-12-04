import './styles.css';
import { FC, useEffect, useState } from 'react';
import { TextareaAutosize } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

interface IProps {
  description: string;
}

const TaskDescription: FC<IProps> = ({ description }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    if (newDescription.trim()) {
      setNewDescription(description);
    }
  }, [description]);

  const handlerOpenUpdate = () => setIsUpdate(true);
  const handlerCloseUpdate = () => setIsUpdate(false);
  const handlerSaveDescription = () => {};

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
            {!newDescription ? (
              <p className="task-description__title" onClick={handlerOpenUpdate}>
                Добавить более подробное описание...
              </p>
            ) : (
              <p className="task-description__title">{description}</p>
            )}
          </div>
        ) : (
          <div>
            <TextareaAutosize
              autoFocus
              placeholder="Добавить более подробное описание..."
              className="task-description__input"
              onChange={(e) => setNewDescription(e.target.value)}
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
