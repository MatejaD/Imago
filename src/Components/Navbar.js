import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
// Images
import logo from "./logo.jpg"
import CharacterBasic from "./CharacterBasic84.png"
import CharacterBald from "./CharacterBald.png"
import newCharacter from "./Character_Shield.png"
import characterEmo from "./CharacterEmo.png"
import characterEmoBasicSword from "./CharacterEmo-BasicSword.png"
import characterEmoBasicArmor from "./CharacaterEmo-BasicArmor.png"
// Redux
import { useDispatch, useSelector } from "react-redux"
// Firebase
import { db, auth } from "../Firebase/firebaseConfig"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
// Icons
import { FaHeartbeat } from "react-icons/fa"
import { AiFillExperiment } from "react-icons/ai"
import { RiMoneyDollarBoxFill } from "react-icons/ri"

export default function Navbar() {
  const name = useSelector((state) => state.currentUser.name)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const avatarImg = useSelector((state) => state.avatarImg)
  const coins = useSelector((state) => state.coins)
  const lvl = useSelector((state) => state.lvl)

  const health = useSelector((state) => state.health)
  const exp = useSelector((state) => state.exp)
  const maxExp = useSelector((state) => state.maxExp)

  let amount = 1

  const links = [
    {
      name: "Home",
      to: "/home",
      id: 1,
    },

    {
      name: "Shop",
      to: "/shop",
      id: 2,
    },

    {
      name: "Inventory",
      to: "/inventory",
      id: 3,
    },
  ]

  let docRefUsers = doc(db, "users", localStorage.getItem("userUID"))

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/", { replace: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const expBarWidth = (exp / maxExp) * 100
  const healthBarWidth = (health / 50) * 100

  let blabla = characterEmoBasicSword

  return (
    <nav className="w-full h-64 rounded-b-md  bg-blue-700 flex flex-col justify-start items-start">
      <nav className="w-full h-1/4 flex justify-between items-center bg-blue-500">
        <div className="flex justify-start items-center h-full w-1/3 px-10">
          <img
            className="rounded-full w-4 h-4 bg-blue-400"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFBGtT23Evq7dNpUdwP8fXnWY2DseIuYpnp-RFWSX1WAyhFpJc&s"
            alt=""
          />
          <span className="px-4 text-xl font-bold">Imago</span>
        </div>
        <ul className="h-full w-1/3 flex justify-around items-center ">
          {links.map((link) => {
            return (
              <li
                onClick={() => navigate(link.to, { replace: true })}
                className="text-lg font-semibold cursor-pointer"
                key={link.id}
              >
                {" "}
                {link.name}{" "}
              </li>
            )
          })}
        </ul>
        <div className="h-full w-1/3 flex justify-end items-center gap-12  px-10">
          <div className="flex w-16 justify-center items-center gap-1.5">
            <span className="text-yellow-400 text-4xl">
              <RiMoneyDollarBoxFill />
            </span>
            <span className="text-lg">{coins}</span>
          </div>
          <button className="cursor-pointer" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </nav>
      <div className="w-full h-3/4 flex justify-start items-center gap-2 px-4 py-6">
        <div className="w-36 h-full relative flex justify-center items-center bg-black bg-opacity-40 border-2 border-black   rounded-md">
          <img className="w-full" src={avatarImg} alt="" />
        </div>
        <div className="h-full w-3/12 flex flex-col p-2 justify-center items-center gap-2 ">
          <div className="w-full h-1/3 flex  justify-center gap-4 items-start">
            <h2 className="text-xl text-center text-black font-bold ">
              {name}
            </h2>
            <p className="text-lg text-center text-black ">lvl {lvl}</p>
          </div>

          <div className="w-full h-1/3 flex justify-center gap-4 items-center ">
            <span className=" text-red-500 text-center text-3xl">
              <FaHeartbeat />
            </span>
            <div className="w-3/5 h-3/5 flex justify- items-center rounded-md bg-slate-200   ">
              <div
                style={{ width: `${healthBarWidth}%` }}
                className="h-full pb-2 bg-red-500 rounded-md  "
              ></div>
            </div>
            <span className="w-1/5">{health}/50</span>
          </div>

          <div className="w-full h-1/3 flex justify-center gap-4 items-center ">
            <span className=" text-center text-3xl text-yellow-500">
              <AiFillExperiment />
            </span>
            <div className="w-3/5 h-3/5 flex justify-start items-center rounded-md bg-slate-200   ">
              <div
                style={{ width: `${expBarWidth}%` }}
                className="h-full w-1/2 pb-2 bg-yellow-500  rounded-md  "
              ></div>
            </div>
            <span className=" w-1/5">
              {exp}/{maxExp}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
