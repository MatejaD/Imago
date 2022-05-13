import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { db } from "./Firebase/firebaseConfig";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function App() {

  const [inputValue, setInputValue] = useState('')

  const navigate = useNavigate()
  const name = useSelector(state => state.name)
  const cities = useSelector(state => state.cities)
  const dispatch = useDispatch()

  const projects = collection(db, 'projects')
  const getData = async () => {
    const data = await getDocs(projects)
    let docRefName = doc(db, 'projects', 'WoDS1EatWqx6tnasI2t2')
    let docRefCities = doc(db, 'projects', '2SCZTbZK95EZYLzmsalp')
    const getDocument = await getDoc(docRefName)
    const getCities = await getDoc(docRefCities)
    dispatch({ type: 'SET_STATE', payload: getDocument.data().name, secondPayload: getCities.data().cities })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const display = async () => {
      let docRefCities = doc(db, 'projects', '2SCZTbZK95EZYLzmsalp')
      const getCities = await getDoc(docRefCities)
      await updateDoc(docRefCities, { cities: arrayUnion(inputValue) })
      console.log(getCities.data().cities)
      navigate({ replace: true })
    }

    display()

    setInputValue('')
  }
  getData()

  return (
    <main className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <h2>{name}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button>Add</button>
      </form>
      <div className="w-64 h-48 border-black border-2 flex flex-col justify-center items-center">
        {cities.map((city) => {
          return <h2 key={city}>{city}</h2>
        })}
      </div>
    </main>
  );
}

export default App;
