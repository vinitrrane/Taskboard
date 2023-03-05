import React from 'react';
import Board from './Board/Board';
import AddBoard from './Board/AddBoard';
import './Main.css';
import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';

const Main = () => {
  // Receiving board data from redux
  const boards = useSelector((state) => state.boards);

  // Drag and drop handlers
  // const [target, setTarget] = useState({
  //   cardId: '',
  //   boardId: '',
  // });
  // const dragEnterHandler = (cardId, boardId) => {
  //   setTarget({
  //     cardId,
  //     boardId,
  //   });
  // };
  // const dragEndHandler = (cardId, boardId) => {
  //   let sourceBoardIndex, sourceCardIndex, targetBoardIndex, targetCardIndex;

  //   sourceBoardIndex = boards.findIndex((item) => item.id === boardId);
  //   if (sourceBoardIndex < 0) return;

  //   sourceCardIndex = boards[sourceBoardIndex].cards.findIndex((item) => item.id === cardId);
  //   if (sourceCardIndex < 0) return;

  //   targetBoardIndex = boards.findIndex((item) => item.id === target.boardId);
  //   if (targetBoardIndex < 0) return;

  //   targetCardIndex = boards[targetBoardIndex].cards.findIndex((item) => item.id === target.cardId);
  //   if (targetCardIndex < 0) return;

  //   const tempBoards = [...boards];
  //   const tempCards = tempBoards[sourceBoardIndex].cards[sourceCardIndex];

  //   tempBoards[sourceBoardIndex].cards.slice(sourceCardIndex, 1);

  //   tempBoards[targetBoardIndex].card.splice(targetCardIndex, 0, tempCards);

  //   dispatch(dragHandler(tempBoards));
  // };
  return (
    <div className='main'>
      <div className='boards'>
        <Grid container spacing={2}>
          {boards?.map((boardItem) => {
            return <Board key={boardItem?.id} boardItem={boardItem} />;
          })}
          <Grid item xs>
            {boards?.length > 2 ? null : <AddBoard />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Main;
