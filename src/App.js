import React, { useEffect, useState } from "react";
// Redux
import { useSelector, useDispatch } from 'react-redux'
// Firebase
import { db } from "./Firebase/firebaseConfig";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
// React Router
import { useNavigate } from 'react-router-dom'
// Components
import Loading from './Components/Loading'
import Navbar from "./Components/Navbar";
// Pages
import Home from "./Pages/Home";

function App() {

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputsDB, setInputsDB] = useState([])
  const navigate = useNavigate()
  const name = useSelector(state => state.name)
  const currentUser = useSelector(state => state.currentUser)
  const coins = useSelector(state => state.coins)
  const dispatch = useDispatch()
  let docRefUsers = doc(db, 'users', localStorage.getItem('userUID'))

  const getData = async () => {
    const getUsersData = await getDoc(docRefUsers)
    dispatch({ type: 'SET_HABITS', payload: getUsersData.data().Habits })
    dispatch({ type: 'SET_DAILY_TASKS', payload: getUsersData.data().Daily_Tasks })
    dispatch({ type: 'SET_TO_DO', payload: getUsersData.data().To_Do })
    console.log(getUsersData.data().coins)
    dispatch({ type: 'SET_COINS', payload: getUsersData.data().coins })
    navigate('/home', { replace: false })
  }








  const getUser = async () => {
    setIsLoading(true)
    console.log(localStorage.getItem('userUID'))
    const userDoc = doc(db, 'users', localStorage.getItem('userUID'))
    const getUserDoc = await getDoc(userDoc)

    let data = getUserDoc.data()
    dispatch({ type: 'SET_USER', payload: data })
    console.log(currentUser)
    setIsLoading(false)
  }
  useEffect(() => {
    getUser()
    getData()
  }, [])

  return (
    <>
      {isLoading ? <Loading />
        :
        <main className="font-body w-screen min-h-screen flex flex-col justify-start gap-5 items-center bg-blue-300">
          <Navbar />
          <Home />
        </main>

      }


    </>

  );
}

export default App;
