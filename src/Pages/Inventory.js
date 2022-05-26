import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../Components/Sidebar"
import { RiMoneyDollarBoxFill } from "react-icons/ri"
// Firebase
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../Firebase/firebaseConfig"
// Images
import CharacterEmo from "../Components/CharacterEmo.png"
import character from "../Components/CharacterEmo.png"
import CharacterEmo_BasicArmor from "../Components/CharacaterEmo-BasicArmor.png"
import CharacterEmo_BasicSword from "../Components/CharacterEmo-BasicSword.png"
import CharacterEmo_BasicArmorSword from "../Components/CharacterEmo_BasicArmorSword.png"
import sword from "../Components/BasicSwordBig.png"
import armor from "../Components/BasicArmorBig.png"

export default function Inventroy() {
  const [inputValue, setInputValue] = useState("")

  const dispatch = useDispatch()

  const inventory = useSelector((state) => state.inventory)
  const avatarImg = useSelector((state) => state.avatarImg)

  const [savedAvatarImg, setSavedAvatarImg] = useState(false)

  const searchForItem = () => {
    let newRegExp = new RegExp(inputValue, "im")
    let searchArray = inventory.filter((value) => newRegExp.test(value.name))
    dispatch({ type: "SET_INVENTORY_ITEMS", payload: searchArray })
  }

  console.log(avatarImg)
  const docRefUsers = doc(db, "users", localStorage.getItem("userUID"))
  const setAvatarImg = async (usersImg, image) => {
    if (usersImg === character) {
      console.log(sword)
      if (image === sword) {
        dispatch({
          type: "SET_AVATAR",
          payload: CharacterEmo_BasicSword,
        })
        await updateDoc(docRefUsers, {
          avatarImg: CharacterEmo_BasicSword,
        })
      }

      if (image === armor) {
        dispatch({
          type: "SET_AVATAR",
          payload: CharacterEmo_BasicArmor,
        })
        await updateDoc(docRefUsers, {
          avatarImg: CharacterEmo_BasicArmor,
        })
      }
    }
    if (usersImg === CharacterEmo_BasicSword) {
      if (image === sword) {
        dispatch({
          type: "SET_AVATAR",
          payload: character,
        })
        await updateDoc(docRefUsers, {
          avatarImg: character,
        })
      }

      if (image === armor) {
        dispatch({
          type: "SET_AVATAR",
          payload: CharacterEmo_BasicArmorSword,
        })
        await updateDoc(docRefUsers, {
          avatarImg: CharacterEmo_BasicArmorSword,
        })
      }
    }
    if (usersImg === CharacterEmo_BasicArmor) {
      if (image === sword) {
        dispatch({
          type: "SET_AVATAR",
          payload: CharacterEmo_BasicArmorSword,
        })
        await updateDoc(docRefUsers, {
          avatarImg: CharacterEmo_BasicArmorSword,
        })
      }

      if (image === armor) {
        dispatch({
          type: "SET_AVATAR",
          payload: CharacterEmo,
        })
        await updateDoc(docRefUsers, {
          avatarImg: CharacterEmo,
        })
      }
    }

    if (usersImg === CharacterEmo_BasicArmorSword) {
      if (image === sword) {
        dispatch({ type: "SET_AVATAR", payload: CharacterEmo_BasicArmor })
        await updateDoc(docRefUsers, { avatarImg: CharacterEmo_BasicArmor })
        console.log("USER IMG")
      }

      if (image === armor) {
        dispatch({ type: "SET_AVATAR", payload: CharacterEmo_BasicSword })
        await updateDoc(docRefUsers, { avatarImg: CharacterEmo_BasicSword })
        console.log("USER IMG")
      }
    }
  }

  return (
    <div className="w-full min-h-full flex justify-start items-start ">
      {/* <Sidebar
        inputValue={inputValue}
        setInputValue={setInputValue}
        searchForItem={searchForItem}
      /> */}
      <div
        key={"container"}
        className="md:w-10/12 w-4/6 mr-2 min-h-screen flex flex-col justify-start gap-16 items-start p-8 bg-blue-100 border-l-2 border-r-2 border-black"
      >
        <div className="flex flex-wrap flex-col md:flex-row relative cursor-pointer justify-start items-start md:items-end bg-blue-100 px-4 gap-y-8 gap-x-16  w-full min-h-64 ">
          {inventory.map((singleItem) => {
            return (
              <div
                key={singleItem.id}
                onClick={() => {
                  setAvatarImg(avatarImg, singleItem.img)
                }}
                className="item-container  lg:w-2/12 w-32 h-32  lg:h-3/5   rounded-md relative overflow-hidden flex shrink-0 flex-col justify-center items-center"
              >
                <img
                  className="  w-full rounded-md"
                  src={singleItem.img}
                  alt={singleItem.name}
                />
                <div className="absolute top-0 flex text-lg justify-center gap-1 items-center w-full px-2 ">
                  <span>{singleItem.price}</span>
                  <span className="text-yellow-400 text-2xl ">
                    <RiMoneyDollarBoxFill />
                  </span>
                </div>

                <div className="item-text flex flex-col rounded-sm justify-start items-center md:gap-2 w-full px-4 py-2  h-full absolute bg-black bg-opacity-80   ">
                  <h2 className="w-full text-white md:text-lg text-sm text-center ">
                    {singleItem.name}
                  </h2>
                  <p className="text-sm w-full h-1/2 text-center text-white">
                    {singleItem.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
