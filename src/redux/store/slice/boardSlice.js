import { createSlice, current } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    addNewBoard(state, action) {
      state.push(action.payload);
      console.log(current(state));
    },
    removeBoard(state, action) {
      const boardIndex = action.payload.boardId;
      state.splice(boardIndex, 1);
    },
    removeAllCards(state, action) {
      state[action.payload].cards = [];
    },
    addNewCard(state, action) {
      const boardIndex = action.payload.boardId;
      state[boardIndex].cards.push(action.payload);
    },
    removeCard(state, action) {
      const boardIndex = action.payload.boardId;
      const cardIndex = state[boardIndex].cards.findIndex((item) => item.id === action.payload.cardId);
      state[boardIndex].cards.splice(cardIndex, 1);
    },
    editCard(state, action) {
      const boardIndex = action.payload.boardId;
      state[boardIndex].cards[action.payload.cardId] = { ...action.payload.cardData };
    },
    dragHandler(state, action) {
      const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, board } =
        action.payload;
      console.log(board);
      if (droppableIdStart === droppableIdEnd) {
        board.cards.splice(droppableIndexStart, 0);
      }
      // return newState;
    },
  },
});

export default boardSlice.reducer;
export const { addNewBoard, removeBoard, removeAllCards, addNewCard, removeCard, editCard, dragHandler } =
  boardSlice.actions;
