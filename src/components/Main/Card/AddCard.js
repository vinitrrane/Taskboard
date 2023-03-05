import React, { useState } from 'react';
import './Card.css';
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCard } from '../../../redux/store/slice/boardSlice';
import AddCardLabel from './Label/AddCardLabel';
import { red, blue, grey } from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  minHeight: 'fit-content',
  bgcolor: '#fff',
  boxShadow: 100,
  borderRadius: '4px',
  p: 4,
};
const AddCard = ({ open, setOpen, boardItem }) => {
  // Sending card data to redux
  const dispatch = useDispatch();

  // Receiving board data from redux
  const boards = useSelector((state) => state.boards);

  // Finding board index
  const boardId = boards.findIndex((item) => item.id === boardItem.id);

  // Default date
  const date = new Date();
  const defaultDate = date.toISOString().slice(0, 10);

  // Form input states
  const [cardDate, setCardDate] = useState(defaultDate);
  const [cardPriority, setCardPriority] = useState('');
  const [cardTitle, setCardTitle] = useState('');
  const [cardLabelText, setCardLabelText] = useState('');
  const [cardLabelColor, setCardLabelColor] = useState('');
  const [addCardLabel, setAddCardLabel] = useState([]);
  const [cardUser, setCardUser] = useState('');

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
  // Captialize first words
  const capitalizeSentence = (str) => {
    const capStr = str.trim().charAt(0).toUpperCase() + str.trim().substring(1);
    return capStr;
  };

  // Add labels handler
  const addLabelHandler = () => {
    if (cardLabelText === '') {
      alert('Please enter a label name!');
    } else if (cardLabelText.length <= 3) {
      alert('Label name is too short!');
    } else if (cardLabelText.length >= 15) {
      alert('Label name is too long!');
    } else {
      setAddCardLabel([
        ...addCardLabel,
        {
          id: Date.now() + Math.random(),
          text: capitalizeWords(cardLabelText),
          color: cardLabelColor,
        },
      ]);
      setCardLabelText('');
      setCardLabelColor('');
    }
  };
  // Remove labels handler
  const removeLabelHandler = (labelId) => {
    setAddCardLabel(addCardLabel.filter((item) => item.id !== labelId));
  };

  // Form submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (cardTitle === '') {
      alert('Card title is empty!');
    } else if (cardTitle.length <= 3) {
      alert('Card title is too short!');
    } else {
      dispatch(
        addNewCard({
          boardId,
          id: Date.now() + Math.random(),
          date: cardDate,
          priority: cardPriority,
          title: capitalizeSentence(cardTitle),
          labels: addCardLabel,
          user: capitalizeWords(cardUser),
        })
      );
      setCardDate(defaultDate);
      setCardPriority('');
      setCardTitle('');
      setCardLabelText('');
      setCardLabelColor('');
      setAddCardLabel([]);
      setCardUser('');
      setOpen(false);
    }
  };
  // Form reset handler
  const onResetHandler = () => {
    setCardDate(defaultDate);
    setCardPriority('');
    setCardTitle('');
    setCardLabelText('');
    setCardLabelColor('');
    setAddCardLabel([]);
    setCardUser('');
  };
  // Form close handler
  const onCloseHandler = () => {
    setCardDate(defaultDate);
    setCardPriority('');
    setCardTitle('');
    setCardLabelText('');
    setCardLabelColor('');
    setAddCardLabel([]);
    setCardUser('');
    setOpen(false);
  };

  return (
    <>
      <Modal
        className='card-modal'
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={onCloseHandler}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box sx={style} className='add-card'>
            <h4>Add A Card</h4>
            <form action='' className='add-card-bx' onSubmit={onSubmitHandler}>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-flexible'
                    label='Title'
                    multiline
                    required
                    fullWidth
                    value={cardTitle}
                    maxRows={4}
                    onChange={(e) => setCardTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id='demo-simple-select-label'>Priority</InputLabel>
                    <Select
                      required
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={cardPriority}
                      label='Priority'
                      onChange={(e) => setCardPriority(e.target.value)}>
                      <MenuItem value={'High'}>High</MenuItem>
                      <MenuItem value={'Medium'}>Medium</MenuItem>
                      <MenuItem value={'Low'}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-flexible'
                    label='Label'
                    multiline
                    fullWidth
                    maxRows={4}
                    value={cardLabelText}
                    onChange={(e) => setCardLabelText(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-required-label'>Color</InputLabel>
                    <Select
                      labelId='demo-simple-select-required-label'
                      id='demo-simple-select-required'
                      value={cardLabelColor}
                      defaultValue='Grey'
                      label='Color *'
                      onChange={(e) => setCardLabelColor(e.target.value)}>
                      <MenuItem value='#2e7d32'>Green</MenuItem>
                      <MenuItem value={red[600]}>Red</MenuItem>
                      <MenuItem value={blue[600]}>Blue</MenuItem>
                      <MenuItem value={grey[600]}>Grey</MenuItem>
                      <MenuItem value={grey[900]}>Black</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={2} direction='row' sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {addCardLabel?.length <= 2 ? (
                      <Button sx={{ border: '2px solid #8BF5FA', color: '#757575' }} onClick={addLabelHandler}>
                        Add
                      </Button>
                    ) : (
                      <Button sx={{ backgroundColor: '#dddd', color: '#fff' }}>Add</Button>
                    )}
                    {addCardLabel.length === 0 ? (
                      <Button sx={{ backgroundColor: '#dddd', color: '#fff' }}>Clear</Button>
                    ) : (
                      <Button
                        sx={{ border: '2px solid #8BF5FA', color: '#757575' }}
                        onClick={() => setAddCardLabel([])}>
                        Clear
                      </Button>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack className='add-card-label-bx' direction='row' spacing={1}>
                    {addCardLabel?.map((label, index) => (
                      <AddCardLabel key={index} labelItem={label} removeLabelHandler={removeLabelHandler} />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='datetime-local'
                    label='Date'
                    type='date'
                    defaultValue={setCardDate}
                    fullWidth
                    onChange={(e) => setCardDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-multiline-flexible'
                    label='User'
                    required
                    fullWidth
                    value={cardUser}
                    maxRows={4}
                    onChange={(e) => setCardUser(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2} direction='row' sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{ border: '2px solid #8BF5FA', color: '#757575' }} type='submit'>
                      Submit
                    </Button>
                    <Button
                      sx={{ border: '2px solid #8BF5FA', color: '#757575' }}
                      onClick={onResetHandler}
                      type='reset'>
                      Reset
                    </Button>
                    <Button sx={{ border: '2px solid #8BF5FA', color: '#757575' }} onClick={onCloseHandler}>
                      Close
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddCard;
