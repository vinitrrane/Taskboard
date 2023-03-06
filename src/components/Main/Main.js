import React from 'react';
import Board from './Board/Board';
import AddBoard from './Board/AddBoard';
import './Main.css';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { dragHandler } from '../../redux/store/slice/boardSlice';
import { Grid } from '@mui/material';

const Main = () => {
  // Sending card data to redux
  const dispatch = useDispatch();
  // Receiving board data from redux
  const boards = useSelector((state) => state.boards);

  // Drag & drop handler
  const onDragEnd = (result) => {
    dispatch(dragHandler(result));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='main'>
        <div className='boards'>
          <Grid container spacing={2}>
            {boards?.map((boardItem, index) => {
              return <Board key={boardItem?.id} boardItem={boardItem} index={index} />;
            })}
            <Grid item xs>
              {boards?.length > 2 ? null : <AddBoard />}
            </Grid>
          </Grid>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Main;
