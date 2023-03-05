import React, { useState } from 'react';
import './Board.css';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addNewBoard } from '../../../redux/store/slice/boardSlice';

const AddBoard = () => {
  // Sending board data to redux
  const dispatch = useDispatch();

  // Captialize all words
  const capitalizeWords = (str) => {
    const strArray = str.trim().split(' ');

    let capStr = strArray
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');
    return capStr;
  };

  // Board title state
  const [boardTitle, setBoardTitle] = useState('');
  // Board title input state
  const onChanageHandler = (e) => {
    setBoardTitle(e.target.value);
  };
  // Board title submit handler
  const onClickHandler = () => {
    if (boardTitle === '') {
      alert('Board title is empty!');
    } else if (boardTitle.length >= 15) {
      alert('Board title is too long!');
    } else {
      dispatch(
        addNewBoard({
          id: Date.now() + Math.random(),
          title: capitalizeWords(boardTitle),
          cards: [],
        })
      );
    }
    setBoardTitle('');
  };

  return (
    <>
      <div className='add-board'>
        <div className='add-board-bx'>
          <input
            autoFocus
            className='add-board-title'
            placeholder='Enter Board Title'
            value={boardTitle}
            onChange={onChanageHandler}
          />
          <IconButton size='small' sx={{ border: '2px solid #8BF5FA' }} onClick={onClickHandler}>
            <AddIcon fontSize='small' className='add-btn' />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default AddBoard;
