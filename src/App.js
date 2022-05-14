import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { db } from "./Firebase/firebaseConfig";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import Loading from './Components/Loading'
import Navbar from "./Components/Navbar";
function App() {

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputsDB, setInputsDB] = useState([])
  const navigate = useNavigate()
  const name = useSelector(state => state.name)
  const cities = useSelector(state => state.cities)
  const currentUser = useSelector(state => state.currentUser)

  const dispatch = useDispatch()

  const projects = collection(db, 'users')
  const getData = async () => {
    const data = await getDocs(projects)
    let docRefCities = doc(db, 'users', localStorage.getItem('userUID'))
    const getCities = await getDoc(docRefCities)
    dispatch({ type: 'SET_CITIES', payload: getCities.data().cities })
    navigate('/home', { replace: true })
  }

  let docRefUsers = doc(db, 'users', localStorage.getItem('userUID'))
  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateDoc(docRefUsers, { cities: arrayUnion(inputValue) })

    getData()
    setInputValue('')
    window.location.reload()
    navigate('/home', { replace: true })
  }
  const getUser = async () => {
    setIsLoading(true)
    console.log(localStorage.getItem('userUID'))
    const userDoc = doc(db, 'users', localStorage.getItem('userUID'))
    const getUserDoc = await getDoc(userDoc)
    // console.log(getUserDoc.data())
    let data = getUserDoc.data()
    dispatch({ type: 'SET_USER', payload: data })
    console.log(currentUser)
    setIsLoading(false)
  }
  useEffect(() => {
    getUser()
    getData()
    console.log(currentUser)
  }, [])

  return (
    <>
      {isLoading ? <Loading />
        :
        <main className="w-screen h-screen flex flex-col justify-start gap-5 items-center">
          <Navbar />
          <h2>{currentUser.name}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button>Add</button>
          </form>
          <button onClick={getUser}>reload</button>
          <div className="w-64 h-48 border-black border-2 flex flex-col justify-center items-center">
            {
              currentUser.cities.map((city) => {
                return <h2 key={city}>{city}</h2>
              })}
          </div>
        </main>

      }


    </>

  );
}

export default App;
