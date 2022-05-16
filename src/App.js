import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { db } from "./Firebase/firebaseConfig";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import Loading from './Components/Loading'
import Navbar from "./Components/Navbar";
import Container from "./Components/Container";
function App() {

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputsDB, setInputsDB] = useState([])
  const navigate = useNavigate()
  const name = useSelector(state => state.name)
  const currentUser = useSelector(state => state.currentUser)
  const cities = useSelector(state => state.cities)
  const coins = useSelector(state => state.coins)

  const dispatch = useDispatch()
  let docRefUsers = doc(db, 'users', localStorage.getItem('userUID'))

  const getData = async () => {
    let docRefCities = doc(db, 'users', localStorage.getItem('userUID'))
    const getCities = await getDoc(docRefCities)
    dispatch({ type: 'SET_CITIES', payload: getCities.data().cities })
    dispatch({ type: 'SET_COINS', payload: getCities.data().coins })
    // await setDoc(docRefUsers, { coins: JSON.parse(localStorage.getItem('coins')) }, { merge: true })

    // dispatch({ type: 'INCREASE_COINS', payload: 1 })

    console.log(getCities.data())

    navigate('/home', { replace: false })
  }
  const sendToDataBase = async () => {
    await setDoc(docRefUsers, { cities: JSON.parse(localStorage.getItem('cities')) }, { merge: true })
    localStorage.setItem('cities', JSON.stringify(cities))
  }

 



  const sendCoinsToDb = async () => {
    await setDoc(docRefUsers, { coins: JSON.parse(localStorage.getItem('coins')) }, { merge: true })
    localStorage.setItem('coins', JSON.stringify(coins))
  }

  // useEffect(() => {
  //   sendCoinsToDb()
  //   console.log(JSON.parse(localStorage.getItem('coins')))

  // }, [coins])



  // useEffect(() => {
  //   sendToDataBase()
  //   console.log('send')
  // }, [cities])

  const getUser = async () => {
    setIsLoading(true)
    console.log(localStorage.getItem('userUID'))
    const userDoc = doc(db, 'users', localStorage.getItem('userUID'))
    const getUserDoc = await getDoc(userDoc)
    // console.log(getUserDoc.data())
    let data = getUserDoc.data()
    dispatch({ type: 'SET_USER', payload: data })
    dispatch({ type: 'SET_COINS', payload: data.coins })


    // await updateDoc(getUserDoc, { cities: arrayUnion(...cities) })

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
          <Container />
        </main>

      }


    </>

  );
}

export default App;
