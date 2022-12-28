import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Components/Pages/Main'
import { persistor, store } from './Redux/store/ConfigureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <Main />
    </ PersistGate>
    </ Provider>
  );
}

export default App;
