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
import Shop from './Pages/Shop';
import Inventory from './Pages/Inventory';
import Navbar from './Components/Navbar';



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

  if (action.type === 'SET_EXP') {
    return { ...state, exp: action.payload }
  }

  if (action.type === 'SET_MAX_EXP') {
    return { ...state, maxExp: action.payload }
  }

  if (action.type === 'SET_LVL') {
    return { ...state, lvl: action.payload }
  }

  if (action.type === 'SET_HEALTH') {
    return { ...state, health: action.payload }
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

  if (action.type === 'TO_DO_DONE') {

    return { ...state, To_Do: state.To_Do.filter((item) => item.id !== action.payload) }
  }

  if (action.type === 'INCREASE_EXP') {
    return { ...state, exp: state.exp + action.payload }
  }

  if (action.type === 'LEVEL_UP') {
    return { ...state, lvl: state.lvl + 1, exp: 0, maxExp: state.maxExp + 10, health: 50 }
  }

  if (action.type === 'REMOVE_EDIT') {

    let change = action.list.map((item) => {
      return { ...item, isEditing: false }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === 'DECREASE_HEALTH') {

    return { ...state, health: state.health - action.payload }
  }

  if (action.type === 'RECOVER_HEALTH') {
    return { ...state, health: 50 }
  }

  if (action.type === 'DEATH') {

    return { ...state, health: 50, lvl: state.lvl - 1 }
  }

  return state
}
const initalState = {
  name: '',
  userUID: '',
  health: 50,
  exp: 0,
  maxExp: 100,
  coins: 0,
  lvl: 1,
  Habits: [],
  Daily_Tasks: [],
  To_Do: [],
  shopItems: [
    '1', '1', '2', '3'
  ],
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
        <App />
      </React.StrictMode>
    </BrowserRouter>

  </Provider>

);

