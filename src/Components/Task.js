import React, { useEffect, useState } from "react"
// Redux
import { useDispatch, useSelector } from "react-redux"
// Icons
import { BsPlusLg, BsThreeDotsVertical, BsCalendar3 } from "react-icons/bs"
import { BiMinus, BiEdit } from "react-icons/bi"
import {
  AiOutlineCheck,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineRight,
  AiOutlineLeft,
} from "react-icons/ai"
import { HiOutlineChevronDoubleRight } from "react-icons/hi"
import { RiDeleteBin4Fill } from "react-icons/ri"
// Firebase
import { db } from "../Firebase/firebaseConfig"
import { doc, updateDoc } from "firebase/firestore"
// Calendar
import Calendar from "react-calendar"

export default function Task({
  item,
  taskList,
  name,
  editValue,
  setEditValue,
}) {
  const dispatch = useDispatch()

  const Habits = useSelector((state) => state.Habits)
  const Daily_Tasks = useSelector((state) => state.Daily_Tasks)
  const To_Do = useSelector((state) => state.To_Do)

  const exp = useSelector((state) => state.exp)
  const coins = useSelector((state) => state.coins)

  const health = useSelector((state) => state.health)

  const [openCalendar, setOpenCalendar] = useState(false)

  const userDoc = doc(db, "users", localStorage.getItem("userUID"))

  const editTab = [
    {
      name: "Edit",
      id: 1,
      actionName: "EDIT_TASK",
      icon: <BiEdit />,
    },

    {
      name: "To top",
      id: 2,
      actionName: "MOVE_TO_TOP",
      icon: <AiOutlineArrowUp />,
    },
    {
      name: "To bottom",
      id: 3,
      actionName: "MOVE_TO_BOTTOM",
      icon: <AiOutlineArrowDown />,
    },

    {
      name: "Delete",
      id: 4,
      actionName: "DELETE_TASK",
      icon: <RiDeleteBin4Fill />,
    },
  ]

  useEffect(() => {
    dispatch({ type: "REMOVE_EDITING", name: name, list: taskList })
  }, [])

  const IncreaseCounter = async (id) => {
    dispatch({
      type: "INCREASE_COUNTER",
      list: taskList,
      name: name,
      payload: id,
    })
    dispatch({ type: "INCREASE_COINS", payload: 3 })
    dispatch({ type: "INCREASE_EXP", payload: 2 })
    await updateDoc(userDoc, {
      [name]: taskList.map((item) => {
        if (item.id === id) {
          return { ...item, increasedValue: item.increasedValue + 1 }
        } else {
          return item
        }
      }),
      coins: coins + 3,
      exp: exp + 2,
    })
  }

  const decreaseCounter = async (id) => {
    dispatch({
      type: "DECREASE_COUNTER",
      list: taskList,
      name: name,
      payload: id,
    })
    dispatch({ type: "DECREASE_HEALTH", payload: 10 })
    await updateDoc(userDoc, {
      [name]: taskList.map((item) => {
        if (item.id === id) {
          return { ...item, decreasedValue: item.decreasedValue - 1 }
        } else {
          return item
        }
      }),
      health: health - 10,
    })
  }

  const doneTo_Do = async (id) => {
    dispatch({ type: "TO_DO_DONE", payload: id })
    dispatch({ type: "INCREASE_EXP", payload: 2 })
    dispatch({ type: "INCREASE_COINS", payload: 2 })
    await updateDoc(userDoc, {
      To_Do: taskList.filter((item) => item.id !== id),
      exp: exp + 2,
      coins: coins + 2,
    })
  }

  const checkDaily_Task = async (id, currentItem) => {
    dispatch({ type: "CHECK_DAILY_TASK", payload: id })
    if (currentItem.isChecked) {
      dispatch({ type: "DECREASE_COINS", payload: 10 })
    } else {
      dispatch({ type: "INCREASE_COINS", payload: 10 })
    }

    await updateDoc(userDoc, {
      Daily_Tasks: taskList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isChecked: !item.isChecked,
            counter: item.isChecked ? item.counter - 1 : item.counter + 1,
          }
        } else {
          return item
        }
      }),
      coins: currentItem.isChecked ? coins - 10 : coins + 10,
    })
  }

  const editFunction = async (functionName, id, itemName) => {
    setEditValue(itemName)
    dispatch({ type: functionName, payload: id, list: taskList, name: name })
    await updateDoc(userDoc, {
      [name]:
        functionName === "DELETE_TASK"
          ? taskList.filter((taskItem) => taskItem.id !== id)
          : taskList,
    })
  }

  // const onEnterPress = (e) => {
  //     if (e.keyCode == 13 && e.shiftKey == false) {
  //         handleSubmit(e)
  //     }

  //     e.target.style.height = 'inherit';
  //     e.target.style.height = `${e.target.scrollHeight}px`;
  // }

  const handleSubmit = async (id) => {
    dispatch({
      type: "SET_EDIT_NAME",
      payload: editValue,
      id: id,
      name: name,
      list: taskList,
    })
    await updateDoc(userDoc, {
      [name]: taskList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: editValue,
            openEditingMenu: false,
            isEditing: false,
          }
        } else {
          return item
        }
      }),
    })
  }

  return (
    <div
      onMouseLeave={() =>
        dispatch({ type: "REMOVE_EDIT", list: taskList, name: name })
      }
      // key={item.id}
      className={`
        item-container w-full 
        flex justify-center items-start  
         rounded-md
        bg-red-300
        hover:border shadow-md shadow-gray-500
        duration-100 ease-linear
        ${item.isChecked ? "bg-slate-500" : ""}
        `}
    >
      <div
        className={`
            flex justify-center items-center
           h-32 px-2 py-4 w-1/5 
            rounded-l-md 
            `}
      >
        {item.openEditingMenu ? (
          <>
            <div
              // onClick={() => dispatch({ type: 'EDIT_TASK', payload: item.id, name: name, list: taskList })}
              className="fixed top-0 left-0 z-20 w-screen h-screen flex justify-center items-center bg-black bg-opacity-75"
            >
              <div className="relative px-4 w-1/3 h-5/6 flex justify-start gap-6 flex-col items-center  bg-slate-50 z-30">
                <div className="w-full h-12 flex justify-end items-start p-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "EDIT_TASK",
                        payload: item.id,
                        name: name,
                        list: taskList,
                      })
                    }
                    className="w-1/5 h-10 bg-red-500 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSubmit(item.id)}
                    type="submit"
                    className="w-1/5 h-10 bg-blue-600 rounded-md"
                  >
                    Submit
                  </button>
                </div>

                <textarea
                  wrap="soft"
                  // ref={inputRef}
                  // onKeyDown={(e) => onEnterPress(e)}
                  // onKeyup={(e) => onEnterPress(e)}
                  rows={3}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  type="text"
                  className="text-field w-2/3 resize-none  overflow-hidden px-2 py-3 flex mb-2 rounded-sm bg-gray-300 outline-none placeholder:text-gray-400 "
                />

                <div className="w-full relative h-10  cursor-pointer border border-gray-500 flex flex-col justify-center items-center ">
                  <div
                    onClick={() => setOpenCalendar(!openCalendar)}
                    className="w-full h-full cursor-pointer flex gap-2 justify-start items-center"
                  >
                    <span className="w-10 h-10 text-2xl border-r border-gray-500 flex justify-center items-center">
                      <BsCalendar3 />
                    </span>
                    <h2>
                      {item.day}/{item.month}/{item.year}
                    </h2>
                  </div>

                  {openCalendar && (
                    <>
                      <Calendar
                        className={` absolute select-none -bottom-4 z-10 w-full text-lg  h-2   grid `}
                        tileClassName={`bg-slate-200 border border-black w-10 h-10 `}
                        minDetail="decade"
                        view="month"
                        prev2Label=""
                        next2Label=""
                        nextLabel={<AiOutlineRight />}
                        prevLabel={<AiOutlineLeft />}
                        locale="en"
                        onClickDay={(value) => {
                          dispatch({
                            type: "UPDATE_DATE",
                            list: taskList,
                            name: name,
                            payload: item.id,
                            day: value.getDate(),
                            month: value.getMonth(),
                            year: value.getFullYear(),
                          })
                          setOpenCalendar(false)
                          //
                        }}
                      />
                    </>
                  )}
                </div>

                <div className="w-full h-1/2  flex justify-center gap-2  items-end text-red-500">
                  <button type="button">Delete this Task</button>
                  <span className="text-xl">
                    <RiDeleteBin4Fill />
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {taskList === Habits && (
          <button
            onClick={() => IncreaseCounter(item.id)}
            className="flex justify-center items-center h-10 w-10 text-field text-white  text-xl rounded-full   bg-black bg-opacity-30 hover:bg-opacity-50"
          >
            <BsPlusLg />
          </button>
        )}

        {taskList !== Habits && (
          <button
            onClick={() => {
              if (taskList === To_Do) {
                doneTo_Do(item.id)
              }
              if (taskList === Daily_Tasks) {
                checkDaily_Task(item.id, item)
              }
            }}
            className={`check-box flex justify-center items-center h-10 w-10 text-blue-400 text-3xl rounded-md bg-black bg-opacity-30 duration-100 ease-linear hover:bg-opacity-60 `}
          >
            <span
              className={`check-mark ${
                item.isChecked
                  ? "text-slate-200 text-opacity-40"
                  : "text-green-500"
              }`}
            >
              <AiOutlineCheck />
            </span>
          </button>
        )}
      </div>

      <div className="min-h-4 w-2/3 flex relative justify-start items-center pt-4 pb-6 bg-slate-50">
        {/* Settings icon */}
        <button
          onClick={() =>
            dispatch({
              type: "TOGGLE_IS_EDITING",
              list: taskList,
              name: name,
              payload: item.id,
            })
          }
          className="
                    settings-icon hidden
                    absolute top-2 right-2
                    w-4 h-4"
        >
          <BsThreeDotsVertical />
        </button>

        {item.isEditing ? (
          <div
            className="
                    
                    absolute top-5 right-5 
                    flex flex-col justify-evenly items-start
                    w-32 h-44 z-10 
                    border-2 border-black bg-slate-200"
          >
            {editTab.map((editField) => {
              return (
                <div
                  key={editField.id}
                  onClick={() => {
                    editFunction(editField.actionName, item.id, item.name)
                  }}
                  className="h-1/4 w-full flex items-center justify-between gap-1 px-2 hover:cursor-pointer hover:bg-slate-400 duration-150 ease-linear"
                >
                  <h2 className="">{editField.name}</h2>
                  <h2 className="text-xl">{editField.icon}</h2>
                </div>
              )
            })}
          </div>
        ) : (
          ""
        )}

        {/* TEXT NAME */}
        <h2
          style={{ minHeight: "5.5rem" }}
          className={`text-field flex justify-start items-start  min-h-full px-4 py-2 duration-100 ease-linear ${
            item.isChecked ? "text-gray-500" : ""
          }`}
        >
          {item.name}
        </h2>

        <div
          className="
                flex justify-center items-center absolute
                text-sm text-slate-500  
                w-20 h-6  right-0 bottom-1"
        >
          {taskList === Habits ? (
            <>
              <span className="">+{item.increasedValue}</span>
              <span>/</span>
              <span className="">
                {item.decreasedValue
                  ? item.decreasedValue
                  : `-${item.decreasedValue}`}
              </span>
            </>
          ) : (
            ""
          )}
          {taskList === Daily_Tasks ? (
            <span className="flex justify-end items-center px-4  w-full">
              {item.counter}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className={`
                flex  justify-center items-center
                h-32 px-2 py-4 w-1/5 
             rounded-l-md
            `}
      >
        {taskList === Habits && (
          <button
            onClick={() => decreaseCounter(item.id)}
            className="
                        flex justify-center items-center
                        h-10 w-10 
                        text-field text-white  text-2xl
                        rounded-full   bg-black bg-opacity-30 hover:bg-opacity-50"
          >
            <BiMinus />
          </button>
        )}
      </div>
    </div>
  )
}
