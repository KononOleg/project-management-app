import './styles.css';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const BoardPage: FC = () => {
  let { boardId } = useParams();
  return (
    <>
      <h2>Board Page: {boardId}</h2>
    </>
  );
};

export default BoardPage;
