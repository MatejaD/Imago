import React from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Icons
import { BsPlusLg, BsThreeDotsVertical } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
// Firebase
import { db } from "../Firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default function Task({ item, taskList, name }) {

    const dispatch = useDispatch()

    const Habits = useSelector(state => state.Habits)
    const userDoc = doc(db, 'users', localStorage.getItem('userUID'))
    const IncreaseCounter = async (id) => {
        dispatch({ type: 'INCREASE_COUNTER', list: taskList, name: name, payload: id })
        await updateDoc(userDoc, {
            [name]: taskList.map((item) => {
                if (item.id === id) {
                    return { ...item, increasedValue: item.increasedValue + 1 }
                }
                else {
                    return item
                }
            })
        })
    }

    const decreaseCounter = async (id) => {
        dispatch({ type: 'DECREASE_COUNTER', list: taskList, name: name, payload: id })
        await updateDoc(userDoc, {
            [name]: taskList.map((item) => {
                if (item.id === id) {
                    return { ...item, decreasedValue: item.decreasedValue - 1 }
                }
                else {
                    return item
                }
            })
        })
    }

    return (
        <div key={item.id} className="w-full flex justify-center items-start  bg-red-300 rounded-md">



            <div className="flex justify-center items-center h-32 px-2 py-4 w-1/5 bg-red-300 rounded-md">



                {taskList === Habits &&
                    <button
                        onClick={() => IncreaseCounter(item.id)}
                        className='flex justify-center items-center h-10 w-10 text-field text-white  text-xl rounded-full   bg-black bg-opacity-30'>
                        <BsPlusLg />
                    </button>
                }

            </div>

            <div className="min-h-4 w-2/3 flex relative justify-start items-center pt-4 pb-6 bg-slate-50">

                {/* Settings icon */}
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_IS_EDITING', list: taskList, name: name, payload: item.id })}
                    className="absolute top-2 right-2 w-4 h-4">
                    <BsThreeDotsVertical />
                </button>
                {item.isEditing ?
                    <div className=" absolute top-5 right-5 w-36 h-44 z-10 border-2 border-black">

                    </div>
                    : ''
                }


                {/* <h2>text</h2> */}
                <h2 style={{ minHeight: '5.5rem' }} className="text-field flex justify-start items-start  min-h-full px-2 py-2 ">
                    {item.name}
                </h2>

                <div className="flex justify-start text-sm text-slate-500 items-center absolute w-20 h-6  right-0 bottom-1">
                    <span>
                        +{item.increasedValue}
                    </span>
                    <span>
                        /
                    </span>
                    <span>
                        {item.decreasedValue ? item.decreasedValue : `-${item.decreasedValue}`}
                    </span>

                </div>
            </div>

            <div className="flex  justify-center items-center h-32 px-2 py-4 w-1/5 bg-red-300 rounded-md">
                {taskList === Habits &&

                    <button
                        onClick={() => decreaseCounter(item.id)}
                        className='flex justify-center items-center h-10 w-10 text-field text-white  text-2xl rounded-full   bg-black bg-opacity-30'>
                        <BiMinus />
                    </button>
                }

            </div>
        </div>
    )
}
