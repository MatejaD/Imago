import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Task from "./Task"
// Firebase
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../Firebase/firebaseConfig"
import { useNavigate } from "react-router-dom"

export default function Habits({ taskList, name, placeholder }) {
  const [inputValue, setInputValue] = useState("")
  const [editValue, setEditValue] = useState("")
  const inputRef = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Habitss = useSelector((state) => state.Habits)
  const Daily_Tasks = useSelector((state) => state.Daily_Tasks)
  const To_Do = useSelector((state) => state.To_Do)

  let docRefUsers = doc(db, "users", localStorage.getItem("userUID"))

  const sendInputToDB = async ({ item }) => {
    await updateDoc(docRefUsers, {
      [name]: taskList.concat(item),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue) {
      let item = {
        name: inputValue,
        editName: inputValue,
        id: new Date().getTime(),
        isEditing: false,
        openEditingMenu: false,
        isChecked: false,
        counter: 0,
        increasedValue: 0,
        decreasedValue: 0,
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      }
      dispatch({
        type: "ADD_TO_LIST",
        list: taskList,
        name: name,
        payload: item,
      })
      sendInputToDB({ item })
      setEditValue(inputValue)
      setInputValue("")
      navigate("/home", { replace: false })
    }
  }

  // Submit textfield on Enter
  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      handleSubmit(e)
    }

    e.target.style.height = "inherit"
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-4/12 w-full sm:w-2/3 min-h-screen flex flex-col justify-start items-center gap-2 bg-slate-50  rounded-md bg-opacity-75 p-2 pb-6"
    >
      <textarea
        wrap="soft"
        ref={inputRef}
        rows={1}
        onKeyDown={(e) => onEnterPress(e)}
        onKeyUp={(e) => onEnterPress(e)}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder={`Add a ${placeholder}`}
        className="text-field w-full resize-none   overflow-hidden px-2 py-3 flex mb-2 rounded-sm bg-gray-300 outline-none placeholder:text-gray-400 "
      />

      {taskList.length > 0 ? (
        taskList.map((item) => {
          return (
            <Task
              key={item.id}
              item={item}
              taskList={taskList}
              name={name}
              editValue={editValue}
              setEditValue={setEditValue}
            />
          )
        })
      ) : (
        <div className="w-full h-64 flex justify-center items-center text-2xl">
          <h2>Your {placeholder} list is empty..</h2>
        </div>
      )}
    </form>
  )
}
