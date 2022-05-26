import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { db } from "./Firebase/firebaseConfig"
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Loading from "./Components/Loading"
import Navbar from "./Components/Navbar"
import Shop from "./Pages/Shop"
import Inventory from "./Pages/Inventory"
import LoginPage from "./Auth/LoginPage"
import Home from "./Pages/Home"
import LvlUpModal from "./Components/LvlUpModal"
import DeathModal from "./Components/DeathModal"

function App() {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [showLvlUpModal, setShowLvlUpModal] = useState(false)
  const [isDead, setIsDead] = useState(false)
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.currentUser)
  const exp = useSelector((state) => state.exp)
  const maxExp = useSelector((state) => state.maxExp)
  const lvl = useSelector((state) => state.lvl)
  const health = useSelector((state) => state.health)
  const maxHealth = useSelector((state) => state.maxHealth)
  const userUID = useSelector((state) => state.userUID)

  // User doc

  useEffect(() => {
    if (localStorage.getItem("userUID") !== "noID") {
      getUser()
      getData()
    } else {
      localStorage.setItem("userUID", "noID")
    }
  }, [])

  const getData = async () => {
    let docRefUsers = doc(db, "users", localStorage.getItem("userUID"))
    const getUsersData = await getDoc(docRefUsers)
    dispatch({ type: "SET_HABITS", payload: getUsersData.data().Habits })
    dispatch({
      type: "SET_DAILY_TASKS",
      payload: getUsersData.data().Daily_Tasks,
    })
    dispatch({ type: "SET_TO_DO", payload: getUsersData.data().To_Do })
    dispatch({ type: "SET_COINS", payload: getUsersData.data().coins })
    dispatch({ type: "SET_EXP", payload: getUsersData.data().exp })
    dispatch({ type: "SET_MAX_EXP", payload: getUsersData.data().maxExp })
    dispatch({ type: "SET_LVL", payload: getUsersData.data().lvl })
    dispatch({ type: "SET_HEALTH", payload: getUsersData.data().health })
    dispatch({ type: "SET_IMG", payload: getUsersData.data().avatarImg })
    dispatch({ type: "SET_INVENTORY", payload: getUsersData.data().inventory })
    dispatch({ type: "SET_SHOPITEMS", payload: getUsersData.data().shopItems })

    navigate("/home", { replace: false })
  }

  useEffect(() => {
    const levelUp = async () => {
      let docRefUsers = doc(db, "users", localStorage.getItem("userUID"))
      dispatch({ type: "LEVEL_UP" })
      await updateDoc(docRefUsers, {
        maxExp: maxExp + 10,
        lvl: lvl + 1,
        exp: 0,
        health: 50,
      })
    }
    if (maxExp <= exp) {
      levelUp()
      setShowLvlUpModal(true)
    }
  }, [exp])

  useEffect(() => {
    const death = async () => {
      let docRefUsers = doc(db, "users", localStorage.getItem("userUID"))

      await updateDoc(docRefUsers, { lvl: lvl, health: 50 })
      dispatch({ type: "DEATH" })
    }
    if (health <= 0) {
      if (lvl > 1) {
        death()
      }
      dispatch({ type: "RECOVER_HEALTH" })
      setIsDead(true)
    }
  }, [health])

  const getUser = async () => {
    setIsLoading(true)
    const userDoc = doc(db, "users", localStorage.getItem("userUID"))
    const getUserDoc = await getDoc(userDoc)
    let data = getUserDoc.data()
    dispatch({ type: "SET_USER", payload: data })
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="font-body w-screen min-h-screen flex flex-col justify-start  items-center bg-blue-300">
          <Navbar />
          {showLvlUpModal && (
            <LvlUpModal setShowLvlUpModal={setShowLvlUpModal} />
          )}
          {isDead && <DeathModal setIsDead={setIsDead} />}
          <Routes>
            <Route
              path="/"
              element={<LoginPage getData={getData} getUser={getUser} />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </main>
      )}
    </>
  )
}

export default App
