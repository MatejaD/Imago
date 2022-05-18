import React from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Icons
import { BsPlusLg, BsThreeDotsVertical } from 'react-icons/bs'
import { BiMinus, BiEdit } from 'react-icons/bi'
import { AiOutlineCheck, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { RiDeleteBin4Fill } from 'react-icons/ri'
// Firebase
import { db } from "../Firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default function Task({ item, taskList, name }) {

    const dispatch = useDispatch()

    const Habits = useSelector(state => state.Habits)
    const Daily_Tasks = useSelector(state => state.Daily_Tasks)
    const To_Do = useSelector(state => state.To_Do)

    const exp = useSelector(state => state.exp)
    const coins = useSelector(state => state.coins)

    const health = useSelector(state => state.health)


    const editTab = [
        {
            name: 'Edit',
            id: 1,
            actionName: 'EDIT_TASK',
            icon: <BiEdit />
        },

        {
            name: 'To top',
            id: 2,
            actionName: 'MOVE_TO_TOP',
            icon: <AiOutlineArrowUp />
        },
        {
            name: 'To bottom',
            id: 3,
            actionName: 'MOVE_TO_BOTTOM',
            icon: <AiOutlineArrowDown />
        },

        {
            name: 'Delete',
            id: 4,
            actionName: 'DELETE_TASK',
            icon: <RiDeleteBin4Fill />
        },
    ]

    const userDoc = doc(db, 'users', localStorage.getItem('userUID'))
    const IncreaseCounter = async (id) => {
        dispatch({ type: 'INCREASE_COUNTER', list: taskList, name: name, payload: id })
        dispatch({ type: 'INCREASE_COINS', payload: 3 })
        dispatch({ type: 'INCREASE_EXP', payload: 2 })
        await updateDoc(userDoc, {
            [name]: taskList.map((item) => {
                if (item.id === id) {
                    return { ...item, increasedValue: item.increasedValue + 1 }
                }
                else {
                    return item
                }
            }),
            coins: coins + 3,
            exp: exp + 2
        }
        )
    }

    const decreaseCounter = async (id) => {
        dispatch({ type: 'DECREASE_COUNTER', list: taskList, name: name, payload: id })
        dispatch({ type: 'DECREASE_HEALTH', payload: 10 })
        await updateDoc(userDoc, {
            [name]: taskList.map((item) => {
                if (item.id === id) {
                    return { ...item, decreasedValue: item.decreasedValue - 1 }
                }
                else {
                    return item
                }
            }),
            health: health - 10

        })
    }

    const doneTo_Do = async (id) => {
        dispatch({ type: 'TO_DO_DONE', payload: id })
        dispatch({ type: 'INCREASE_EXP', payload: 2 })
        dispatch({ type: 'INCREASE_COINS', payload: 2 })
        await updateDoc(userDoc, {
            To_Do: taskList.filter((item) => item.id !== id),
            exp: exp + 2,
            coins: coins + 2
        })
    }

    return (
        <div
            onMouseLeave={() => dispatch({ type: 'REMOVE_EDIT', list: taskList, name: name })}
            key={item.id}
            className="
        item-container w-full 
        flex justify-center items-start  
        bg-red-300 rounded-md
        hover:border shadow-md shadow-gray-500
        ">



            <div className="flex justify-center items-center h-32 px-2 py-4 w-1/5 bg-red-300 rounded-md">



                {taskList === Habits &&
                    <button
                        onClick={() => IncreaseCounter(item.id)}
                        className='flex justify-center items-center h-10 w-10 text-field text-white  text-xl rounded-full   bg-black bg-opacity-30 hover:bg-opacity-50'>
                        <BsPlusLg />
                    </button>
                }

                {taskList !== Habits &&

                    <button
                        onClick={() => {
                            if (taskList === To_Do) {
                                doneTo_Do(item.id)
                            }
                        }}
                        className="check-box flex justify-center items-center h-10 w-10 text-blue-400 text-3xl border-gray-300 border rounded-md bg-black bg-opacity-30">

                        <span className="check-mark">
                            <AiOutlineCheck />
                        </span>
                    </button>
                }

            </div>

            <div className="min-h-4 w-2/3 flex relative justify-start items-center pt-4 pb-6 bg-slate-50">

                {/* Settings icon */}
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_IS_EDITING', list: taskList, name: name, payload: item.id })}
                    className="
                    settings-icon hidden
                    absolute top-2 right-2
                    w-4 h-4">
                    <BsThreeDotsVertical />
                </button>

                {item.isEditing ?
                    <div className="
                    
                    absolute top-5 right-5 
                    flex flex-col justify-evenly items-start
                    w-32 h-44 z-10 
                    border-2 border-black bg-slate-200">
                        {editTab.map((item) => {
                            return (
                                <div className="h-1/4 w-full flex items-center justify-between gap-1 px-2 hover:cursor-pointer" key={item.id}>
                                    <h2 className="">{item.name}</h2>
                                    <h2 className="text-xl">
                                        {item.icon}
                                    </h2>
                                </div>
                            )
                        })}
                    </div>
                    : ''
                }


                {/* TEXT NAME */}
                <h2 style={{ minHeight: '5.5rem' }} className="text-field flex justify-start items-start  min-h-full px-2 py-2 ">
                    {item.name}
                </h2>

                <div className="
                flex justify-center items-center absolute
                text-sm text-slate-500  
                w-20 h-6  right-0 bottom-1">
                    {taskList === Habits ?
                        <>
                            <span className="">
                                +{item.increasedValue}
                            </span>
                            <span>
                                /
                            </span>
                            <span className="">
                                {item.decreasedValue ? item.decreasedValue : `-${item.decreasedValue}`}
                            </span>
                        </>

                        :
                        ''
                    }
                    {taskList === Daily_Tasks ?

                        <span className="flex justify-end items-center px-4  w-full">{item.counter}</span>
                        :
                        ""
                    }

                </div>
            </div>

            <div className="
                flex  justify-center items-center
                h-32 px-2 py-4 w-1/5 
            bg-red-300 rounded-md">
                {taskList === Habits &&

                    <button
                        onClick={() => decreaseCounter(item.id)}
                        className='
                        flex justify-center items-center
                        h-10 w-10 
                        text-field text-white  text-2xl
                        rounded-full   bg-black bg-opacity-30 hover:bg-opacity-50'>
                        <BiMinus />
                    </button>
                }

            </div>
        </div>
    )
}
