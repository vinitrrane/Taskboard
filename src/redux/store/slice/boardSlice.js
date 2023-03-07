import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    addNewBoard(state, action) {
      state.push(action.payload);
    },
    removeBoard(state, action) {
      const boardIndex = action.payload;
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
      // get drag & drop source & destination data
      const { destination, source } = action.payload;

      // for card drop outside board
      if (!destination) return;

      // card drop in same board
      if (destination.droppableId === source.droppableId) {
        // find the board
        const board = state.find((board) => source.droppableId === String(board.id));

        // remove card from old index
        const card = board.cards.splice(source.index, 1);

        // add card to new index
        board.cards.splice(destination.index, 0, ...card);
      }

      // card drop in other board
      if (destination.droppableId !== source.droppableId) {
        // find the drag source board
        const sourceBoard = state.find((board) => source.droppableId === String(board.id));

        // remove card from source board
        const card = sourceBoard.cards.splice(source.index, 1);

        // find the drop destination board
        const destinationBoard = state.find((board) => destination.droppableId === String(board.id));

        // add card to destination board
        destinationBoard.cards.splice(destination.index, 0, ...card);
      }
    },
  },
});

export default boardSlice.reducer;
export const { addNewBoard, removeBoard, removeAllCards, addNewCard, removeCard, editCard, dragHandler } =
  boardSlice.actions;
