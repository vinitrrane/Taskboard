import React from 'react';
import Board from './Board/Board';
import AddBoard from './Board/AddBoard';
import './Main.css';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { dragHandler } from '../../redux/store/slice/boardSlice';
import { Grid } from '@mui/material';

const Main = () => {
  // Sending card data to redux
  const dispatch = useDispatch();
  // Receiving board data from redux
  const boards = useSelector((state) => state.boards);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    const droppableIdStart = source.droppableId;
    const droppableIdEnd = destination.droppableId;
    const droppableIndexStart = source.index;
    const droppableIndexEnd = destination.index;
    const board = boards.find((board) => String(board.id) === droppableIdStart);
    dispatch(
      dragHandler({ droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, board })
    );
  };
  return (
    <div className='main'>
      <div className='boards'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2}>
            {boards?.map((boardItem, index) => {
              return <Board key={boardItem?.id} boardItem={boardItem} index={index} />;
            })}
            <Grid item xs>
              {boards?.length > 2 ? null : <AddBoard />}
            </Grid>
          </Grid>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Main;
