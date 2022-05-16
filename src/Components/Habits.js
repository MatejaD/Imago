import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
// Firebase
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Habits() {

    const [inputValue, setInputValue] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let cities = useSelector(state => state.cities)

    let docRefUsers = doc(db, 'users', localStorage.getItem('userUID'))

    const sendInputToDB = async () => {
        let data = await getDoc(docRefUsers)
        let cities = data.data().cities
        await updateDoc(docRefUsers, { cities: cities.concat(inputValue) })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({ type: 'ADD_CITY', payload: inputValue })
        sendInputToDB()
        setInputValue('')
        navigate('/home', { replace: false })
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="w-4/12 min-h-screen flex flex-col justify-start items-center gap-2 bg-slate-50  rounded-md bg-opacity-75 p-2">
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                className="w-full h-16 px-2 flex justify-start items-center rounded-sm bg-gray-300 outline-none"
            />
            {cities.map((city) => {
                return <Task key={city} city={city} />
            })}
        </form>
    )
}
