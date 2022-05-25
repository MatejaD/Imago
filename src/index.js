import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

import { createStore, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { reduxFirestore, getFirestore } from "redux-firestore"
import { reactReduxFirebase, getFirebase } from "react-redux-firebase"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./Auth/LoginPage"
import Shop from "./Pages/Shop"
import Inventory from "./Pages/Inventory"
import Navbar from "./Components/Navbar"

import sword from "./Components/BasicSwordBig.png"
import basicArmor from "./Components/BasicArmorBig.png"
import character from "./Components/CharacterEmo.png"

const reducer = (state, action) => {
  if (action.type === "SET_HABITS") {
    return { ...state, Habits: action.payload }
  }

  if (action.type === "SET_DAILY_TASKS") {
    return { ...state, Daily_Tasks: action.payload }
  }

  if (action.type === "SET_TO_DO") {
    return { ...state, To_Do: action.payload }
  }

  if (action.type === "ADD_TO_LIST") {
    let list = action.list

    return { ...state, [action.name]: list.concat(action.payload) }
  }

  if (action.type === "SET_NAME") {
    return { ...state, name: action.payload }
  }
  if (action.type === "SET_USER") {
    return { ...state, currentUser: action.payload }
  }

  if (action.type === "SET_COINS") {
    return { ...state, coins: action.payload }
  }

  if (action.type === "SET_IMG") {
    return { ...state, avatarImg: action.payload }
  }

  if (action.type === "SET_EXP") {
    return { ...state, exp: action.payload }
  }

  if (action.type === "SET_MAX_EXP") {
    return { ...state, maxExp: action.payload }
  }

  if (action.type === "SET_LVL") {
    return { ...state, lvl: action.payload }
  }

  if (action.type === "SET_HEALTH") {
    return { ...state, health: action.payload }
  }

  if (action.type === "SET_INVENTORY") {
    return { ...state, inventory: action.payload }
  }

  if (action.type === "SET_SHOPITEMS") {
    return { ...state, shopItems: action.payload }
  }

  if (action.type === "INCREASE_COINS") {
    return { ...state, coins: state.coins + action.payload }
  }

  if (action.type === "DECREASE_COINS") {
    return { ...state, coins: state.coins - action.payload }
  }

  if (action.type === "SET_AVATAR") {
    return { ...state, avatarImg: action.payload }
  }

  if (action.type == "TOGGLE_IS_EDITING") {
    let change = action.list.map((item) => {
      if (item.id === action.payload) {
        return { ...item, isEditing: !item.isEditing }
      } else {
        return { ...item, isEditing: false }
      }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === "REMOVE_EDITING") {
    let change = action.list.map((item) => {
      return { ...item, isEditing: false }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === "INCREASE_COUNTER") {
    let change = action.list.map((item) => {
      if (item.id === action.payload) {
        return { ...item, increasedValue: item.increasedValue + 1 }
      } else {
        return item
      }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === "DECREASE_COUNTER") {
    let change = action.list.map((item) => {
      if (item.id === action.payload) {
        return { ...item, decreasedValue: item.decreasedValue - 1 }
      } else {
        return item
      }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === "TO_DO_DONE") {
    return {
      ...state,
      To_Do: state.To_Do.filter((item) => item.id !== action.payload),
    }
  }

  if (action.type === "INCREASE_EXP") {
    return { ...state, exp: state.exp + action.payload }
  }

  if (action.type === "LEVEL_UP") {
    return {
      ...state,
      lvl: state.lvl + 1,
      exp: 0,
      maxExp: state.maxExp + 10,
      health: 50,
    }
  }

  if (action.type === "REMOVE_EDIT") {
    let change = action.list.map((item) => {
      return { ...item, isEditing: false }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === "DECREASE_HEALTH") {
    return { ...state, health: state.health - action.payload }
  }

  if (action.type === "RECOVER_HEALTH") {
    return { ...state, health: 50 }
  }

  if (action.type === "DEATH") {
    return { ...state, health: 50, lvl: state.lvl - 1 }
  }

  if (action.type === "OPEN_BUY_MODAL") {
    let change = state.shopItems.map((item) => {
      if (item.id === action.payload) {
        return { ...item, buyModal: true }
      } else {
        return item
      }
    })
    return { ...state, shopItems: change }
  }

  if (action.type === "CLOSE_BUY_MODAL") {
    let change = state.shopItems.map((item) => {
      console.log(item)
      return { ...item, buyModal: false }
    })

    return { ...state, shopItems: change }
  }

  if (action.type === "BUY_ITEM") {
    let close_modal = state.shopItems.map((item) => {
      return { ...item, buyModal: false }
    })
    let remove_bought_item = close_modal.filter(
      (item) => item.id !== action.payload
    )

    console.log(remove_bought_item)

    return {
      ...state,
      inventory: state.inventory.concat(action.item),
      shopItems: remove_bought_item,
    }
  }

  if (action.type === "SET_SHOP_ITEMS") {
    let change = state.marketElements.map((item) => {
      if (action.payload.length > 0) {
        return {
          ...item,
          items: action.payload.filter((value) => value.value === item.name),
        }
      } else {
        return item
      }
    })

    return { ...state, marketElements: change }
  }

  if (action.type === "SET_INVENTORY_ITEMS") {
    let change = state.inventory.map((item) => {
      if (action.payload.length > 0) {
        return {
          ...item,
          items: action.payload.filter((value) => value.value === item.name),
        }
      } else {
        return item
      }
    })

    return { ...state, inventory: change }
  }

  if (action.type === "CHECK_DAILY_TASK") {
    let change = state.Daily_Tasks.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          isChecked: !item.isChecked,
          counter: item.isChecked ? item.counter - 1 : item.counter + 1,
        }
      } else {
        return item
      }
    })

    console.log(change)

    return { ...state, Daily_Tasks: change }
  }

  if (action.type === "UPDATE_DATE") {
    let change = action.list.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          day: action.day,
          month: action.month,
          year: action.year,
        }
      } else {
        return item
      }
    })

    return { ...state, [action.name]: change }
  }

  // EDITING TASK OPTIONS

  if (action.type === "EDIT_TASK") {
    let change = action.list.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          openEditingMenu: !item.openEditingMenu,
          isEditing: false,
        }
      } else {
        return { ...item, openEditingMenu: false }
      }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === "SET_EDIT_NAME") {
    let change = action.list.map((item) => {
      if (item.id === action.id) {
        return {
          ...item,
          name: action.payload,
          openEditingMenu: !item.openEditingMenu,
        }
      } else {
        return item
      }
    })

    return { ...state, [action.name]: change }
  }

  if (action.type === "DELETE_TASK") {
    let change = action.list.filter((item) => item.id !== action.payload)

    return { ...state, [action.name]: change }
  }

  return state
}
const initalState = {
  name: "",
  userUID: "",
  avatarImg: character,
  health: 50,
  exp: 0,
  maxExp: 100,
  coins: 0,
  lvl: 1,
  Habits: [],
  Daily_Tasks: [],
  To_Do: [],
  shopItems: [
    {
      img: basicArmor,
      name: `Peasent's armor`,
      desc: "At least it doesnt have any holes.",
      price: 70,
      buyModal: false,
      id: 1557,
      value: "Armor",
    },
    {
      img: basicArmor,
      name: `Peasent's armor`,
      desc: "At least it doesnt have any holes.",
      price: 70,
      buyModal: false,
      id: 1432,
      value: "Armor",
    },

    {
      img: basicArmor,
      name: `Peasent's armor`,
      desc: "At least it doesnt have any holes.",
      price: 70,
      buyModal: false,
      id: 12143,
      value: "Armor",
    },

    {
      img: sword,
      name: "Basic Sword",
      desc: `It's not much, but its honest work.`,
      price: 45,
      buyModal: false,
      id: 1,
      value: "Swords",
    },
    {
      img: sword,
      name: "Stone Sword",
      desc: `It's not much, but its honest work.`,
      price: 45,
      buyModal: false,
      id: 2,
      value: "Swords",
    },
    {
      img: sword,
      name: "Super sword",
      desc: `It's not much, but its honest work.`,
      price: 45,
      buyModal: false,
      id: 5,
      value: "Swords",
    },
  ],
  currentUser: {
    name: "",
    email: "",
  },
  inventory: [],
  marketElements: [
    {
      name: "Armor",
      id: 11,
      items: [],
    },
    {
      name: "Swords",
      id: 33,
      items: [],
    },
  ],
}
const store = createStore(reducer, initalState)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)
