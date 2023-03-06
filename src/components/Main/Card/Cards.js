import React, { useState } from 'react';
import './Card.css';
import { IconButton, Avatar, Card, Menu, MenuItem, ListItemIcon, Typography, Stack } from '@mui/material';
import { red, amber, orange } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardLabel from './Label/CardLabel';
import { useDispatch, useSelector } from 'react-redux';
import { removeCard } from '../../../redux/store/slice/boardSlice';
import EditCard from './EditCard';
import { Draggable } from '@hello-pangea/dnd';

const Cards = ({ cardItem, boardId, index }) => {
  // Sending card data to redux
  const dispatch = useDispatch();

  // Receiving board & card data from redux
  const cards = useSelector((state) => state.boards[boardId].cards);
  // Finding card index
  const cardId = cards.findIndex((item) => item.id === cardItem.id);
  // Finding card labels
  const cardLabels = cards[cardId]?.labels;
  const cardDate = new Date(cards[cardId]?.date);

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

  // Avatar letter generator
  const avtarName = cardItem?.user.slice(0, 1);

  // Card remove handler
  const removeCardHandler = () => {
    dispatch(removeCard({ boardId, cardId }));
    setAnchorEl(null);
  };

  return (
    <>
      <Draggable draggableId={String(cards[cardId]?.id)} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Card className='card-bx' sx={{ overflow: 'visible' }}>
              <div className='card-top'>
                <div className='card-details-bx'>
                  <div className='card-date'>
                    <AccessTimeIcon fontSize='10' sx={{ mr: 0.5 }} />
                    <p>{cardDate?.toDateString().slice(4, 10) + ' ,' + cardDate?.toDateString().slice(10)}</p>
                  </div>
                  <span>
                    <IconButton size='small' sx={{ p: 0 }}>
                      <div
                        className='card-priority'
                        style={{
                          backgroundColor: `${
                            cardItem?.priority === 'High'
                              ? red[600]
                              : cardItem?.priority === 'Medium'
                              ? orange[600]
                              : amber[400]
                          }`,
                        }}>
                        {cards[cardId]?.priority}
                      </div>
                    </IconButton>
                  </span>
                </div>
              </div>
              <div className='card-main'>
                <div className='card-title-bx' sx={{ flexWrap: 'wrap' }}>
                  <p className='card-title'>{cards[cardId]?.title}</p>
                </div>
                <div className='card-label-bx'>
                  <Stack direction='row' sx={{ flexWrap: 'wrap' }}>
                    {cardLabels?.map((labelItem, index) => (
                      <CardLabel key={index} labelItem={labelItem} />
                    ))}
                  </Stack>
                </div>
              </div>
              <div className='card-bottom'>
                <div className='card-user-bx'>
                  <IconButton size='medium' sx={{ mr: '0.5rem', p: 0, border: '2px solid #F0EEED' }}>
                    <Avatar className='user-icon' sx={{ width: 30, height: 30 }}>
                      {avtarName}
                    </Avatar>
                  </IconButton>
                  <p className='card-user'>{cards[cardId]?.user}</p>
                </div>
                <IconButton className='card-menu' edge='end' size='small' sx={{ p: 0 }} onClick={handleClick}>
                  <MoreVertIcon fontSize='small' className='more-menu-icon' />
                </IconButton>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={openDropDown}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}>
                  <MenuItem onClick={() => setOpen(true)}>
                    <ListItemIcon>
                      <EditIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='subtitle2'>Edit</Typography>
                  </MenuItem>
                  <EditCard cardId={cardId} boardId={boardId} open={open} setOpen={setOpen} />
                  <MenuItem onClick={removeCardHandler}>
                    <ListItemIcon>
                      <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    <Typography variant='subtitle2'>Delete</Typography>
                  </MenuItem>
                </Menu>
              </div>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Cards;
