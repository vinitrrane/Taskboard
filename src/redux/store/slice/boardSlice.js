import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    addNewBoard(state, action) {
      state.push(action.payload);
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

    dragHandler(state, action) {},
  },
});

export default boardSlice.reducer;
export const { addNewBoard, removeBoard, removeAllCards, addNewCard, removeCard, dragHandler } = boardSlice.actions;
