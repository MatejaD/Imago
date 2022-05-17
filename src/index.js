import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Auth/LoginPage';



const reducer = (state, action) => {

  if (action.type === 'SET_HABITS') {
    return { ...state, Habits: action.payload }
  }

  if (action.type === 'SET_DAILY_TASKS') {
    return { ...state, Daily_Tasks: action.payload }
  }

  if (action.type === 'SET_TO_DO') {
    return { ...state, To_Do: action.payload }
  }


  if (action.type === 'ADD_TO_LIST') {
    let list = action.list

    return { ...state, [action.name]: list.concat(action.payload) }
  }


  if (action.type === 'SET_NAME') {
    return { ...state, name: action.payload }
  }
  if (action.type === 'SET_USER') {
    return { ...state, currentUser: action.payload }
  }

  if (action.type === 'SET_COINS') {
    return { ...state, coins: action.payload }
  }

  if (action.type === 'INCREASE_COINS') {
    return { ...state, coins: state.coins + action.payload }
  }


  if (action.type == 'TOGGLE_IS_EDITING') {

    let change = action.list.map((item) => {
      if (item.id === action.payload) {
        return { ...item, isEditing: !item.isEditing }
      }
      else {
        return { ...item, isEditing: false }
      }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === 'INCREASE_COUNTER') {

    let change = action.list.map((item) => {
      if (item.id === action.payload) {
        return { ...item, increasedValue: item.increasedValue + 1 }
      }
      else {
        return item
      }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === 'DECREASE_COUNTER') {

    let change = action.list.map((item) => {
      if (item.id === action.payload) {
        return { ...item, decreasedValue: item.decreasedValue - 1 }
      }
      else {
        return item
      }
    })

    return { ...state, [action.name]: change }
  }

  return state
}
const initalState = {
  name: '',
  userUID: '',
  health: 0,
  exp: 0,
  coins: 0,
  Habits: [],
  Daily_Tasks: [],
  To_Do: [],
  currentUser: {
    name: 'test',
    email: 'tesst',
  },
}
const store = createStore(reducer, initalState)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<App />} />

        </Routes>
      </React.StrictMode>
    </BrowserRouter>

  </Provider>

);

