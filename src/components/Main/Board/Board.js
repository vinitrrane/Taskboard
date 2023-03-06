import React, { useState } from 'react';
import './Board.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeBoard, removeAllCards } from '../../../redux/store/slice/boardSlice';
import Cards from '../Card/Cards';
import AddCard from '../Card/AddCard';
import { Grid, Typography, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Droppable } from 'react-beautiful-dnd';

const Board = ({ boardItem, index }) => {
  // Sending card data to redux
  const dispatch = useDispatch();

  // Receiving board & card data from redux
  const boards = useSelector((state) => state.boards);
  // Finding board index
  const boardId = boards.findIndex((item) => item.id === boardItem.id);

  // Modal open state
  const [open, setOpen] = useState(false);

  // Dropdown menu states
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Board remove handler
  const deleteBoardHandler = () => {
    dispatch(removeBoard(boardId));
    setAnchorEl(null);
  };

  // All cards remove handler
  const deleteCardsHandler = () => {
    dispatch(removeAllCards(boardId));
    setAnchorEl(null);
  };

  return (
    <>
      <Droppable droppableId={String(boardItem.id)} index={index}>
        {(provided) => (
          <Grid item xs={12} sm={4} {...provided.droppableProps} ref={provided.innerRef}>
            <div className='board'>
              <div className='board-top'>
                <div className='board-title'>
                  {boards[boardId]?.title} <div className='board-counter'>{boardItem?.cards.length}</div>
                  <div className='board-menu'>
                    <IconButton size='small' sx={{ p: 0 }} onClick={handleClick}>
                      <MoreVertIcon fontSize='small' className='more-menu-icon' />
                    </IconButton>
                  </div>
                </div>

                <Menu
                  id='basic-menu'
                  sx={{ borderRadius: '16px' }}
                  anchorEl={anchorEl}
                  open={openDropDown}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}>
                  <MenuItem onClick={deleteBoardHandler}>
                    <ListItemIcon>
                      <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='subtitle2'>Delete Board</Typography>
                  </MenuItem>
                  <MenuItem onClick={deleteCardsHandler}>
                    <ListItemIcon>
                      <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='subtitle2'>Delete Cards</Typography>
                  </MenuItem>
                </Menu>
                <IconButton
                  size='small'
                  sx={{ border: '2px solid #8BF5FA' }}
                  className='add-btn'
                  onClick={() => setOpen(true)}>
                  <AddIcon fontSize='small' />
                </IconButton>
                <AddCard open={open} setOpen={setOpen} boardItem={boardItem} boardId={boardId} />
              </div>

              <div className='cards '>
                {boards[boardId]?.cards?.map((cardItem, index) => (
                  <Cards key={cardItem.id} cardItem={cardItem} boardId={boardId} index={index} />
                ))}
              </div>
            </div>
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </>
  );
};

export default Board;
