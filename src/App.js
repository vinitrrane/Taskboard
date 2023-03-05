import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import store from './redux/store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
