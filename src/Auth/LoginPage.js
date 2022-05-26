import React, { useEffect, useState } from "react"
import SignInBtn from "./SignInBtn"
// Images
import character from "../Components/CharacterEmo.png"
import sword from "../Components/BasicSword.png"
import basicArmor from "../Components/BasicArmor.png"
// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth, db } from "../Firebase/firebaseConfig"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

// Functions
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function LoginPage({ getData, getUser }) {
  // Register
  const [usernameReg, setUsernameReg] = useState("")
  const [emailReg, setEmailReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  //   Login
  const [usernameLog, setUsernameLog] = useState("")
  const [emailLog, setEmailLog] = useState("")
  const [passwordLog, setPasswordLog] = useState("")

  const [isSigningIn, setIsSigningIn] = useState(true)

  const [errorMsg, setErrorMsg] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const register = async () => {
    try {
      if ((usernameReg, emailReg, passwordReg)) {
        const user = await createUserWithEmailAndPassword(
          auth,
          emailReg,
          passwordReg
        )
        console.log(user)
        let usersDoc = doc(db, "users", user.user.uid)
        await setDoc(
          usersDoc,
          {
            name: usernameReg,
            email: emailReg,
          },
          { merge: true }
        )

        await setDoc(
          usersDoc,
          {
            name: usernameReg,
            email: emailReg,
            avatarImg: character,
            Habits: [],
            Daily_Tasks: [],
            To_Do: [],
            coins: 0,
            health: 50,
            exp: 0,
            maxExp: 100,
            lvl: 1,
            inventory: [],
            shopItems: [
              {
                img: basicArmor,
                name: `Peasent's armor`,
                desc: "At least it doesnt have any holes.",
                price: 70,
                buyModal: false,
                id: 1557,
                value: "Armor",
              },
              {
                img: basicArmor,
                name: `Peasent's armor`,
                desc: "At least it doesnt have any holes.",
                price: 70,
                buyModal: false,
                id: 1432,
                value: "Armor",
              },

              {
                img: basicArmor,
                name: `Peasent's armor`,
                desc: "At least it doesnt have any holes.",
                price: 70,
                buyModal: false,
                id: 12143,
                value: "Armor",
              },

              {
                img: sword,
                name: "Basic Sword",
                desc: `It's not much, but its honest work.`,
                price: 45,
                buyModal: false,
                id: 1,
                value: "Swords",
              },
              {
                img: sword,
                name: "Stone Sword",
                desc: `It's not much, but its honest work.`,
                price: 45,
                buyModal: false,
                id: 2,
                value: "Swords",
              },
              {
                img: sword,
                name: "Super sword",
                desc: `It's not much, but its honest work.`,
                price: 45,
                buyModal: false,
                id: 5,
                value: "Swords",
              },
            ],
            marketElements: [
              {
                name: "Armor",
                id: 11,
                items: [
                  {
                    img: basicArmor,
                    name: `Peasent's armor`,
                    desc: "At least it doesnt have any holes.",
                    price: 70,
                    buyModal: false,
                    id: 1,
                    value: "Armor",
                  },
                ],
              },
              {
                name: "Swords",
                id: 33,
                items: [
                  {
                    img: sword,
                    name: "Basic Sword",
                    desc: `It's not much, but its honest work.`,
                    price: 45,
                    buyModal: false,
                    id: 2,
                    value: "Sword",
                  },
                ],
              },
            ],
          },
          { merge: true }
        )
        localStorage.setItem("userUID", user.user.uid)
        getData()
        getUser()
        dispatch({ type: "SET_NAME", payload: usernameReg })
        navigate("/home", { replace: true })
      }
    } catch (error) {
      console.log(error.message)
      setErrorMsg(error.message)
    }
  }

  const login = async () => {
    if (!passwordLog) {
      setErrorMsg("Password is too short")
      setTimeout(() => {
        setErrorMsg("")
      }, 2000)
    }

    try {
      const user = await signInWithEmailAndPassword(auth, emailLog, passwordLog)
      console.log(user)
      localStorage.setItem("userUID", user.user.uid)
      getData()
      getUser()
      navigate("/home", { replace: true })
    } catch (error) {
      console.log(error.message)
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setErrorMsg("User does not exist.")
        setTimeout(() => {
          setErrorMsg("")
        }, 2000)
      }
      //   setErrorMsg(error.message)
    }
  }

  const logout = async () => {}

  return (
    <div className="flex flex-col fixed justify-center items-center w-screen h-screen z-50 bg-blue-600">
      <h1 className="absolute top-8 md:text-4xl text-2xl text-green-200">
        Welcome to Imago!
      </h1>

      <div className="lg:w-2/6 md:w-2/4 w-4/5 h-10 flex items-center justify-center gap-20 bg-slate-200 rounded-t-md">
        <button
          onClick={() => setIsSigningIn(true)}
          className={`${isSigningIn && "border-b-2"} border-blue-500`}
        >
          Sign up
        </button>
        <button
          onClick={() => setIsSigningIn(false)}
          className={`${!isSigningIn && "border-b-2"} border-blue-500`}
        >
          Login
        </button>
      </div>
      <div className="lg:w-2/6 md:w-2/4 w-4/5 h-4/6 p-2 flex flex-col justify-around items-center bg-slate-200 rounded-b-md">
        <span className="text-red-500 h-2 w-full text-center">{errorMsg}</span>
        <div className="w-full h-4/5 flex flex-col justify-evenly items-center">
          {isSigningIn && (
            <div className="w-full h-1/5 flex flex-col justify-center items-center ">
              <span className="flex justify-start items-start w-2/3 h-1/3 text-sm px-1">
                Username
              </span>
              <div className="w-2/3 h-10 p-2 flex rounded-md justify-center items-center bg-white">
                <input
                  value={isSigningIn ? usernameReg : usernameLog}
                  onChange={(e) => {
                    isSigningIn
                      ? setUsernameReg(e.target.value)
                      : setUsernameLog(e.target.value)
                  }}
                  className="w-full h-full outline-none "
                  type="text"
                />
              </div>
            </div>
          )}

          <div className="w-full h-1/5 flex flex-col justify-center items-center ">
            <span className="flex justify-start items-start w-2/3 h-1/3 text-sm px-1">
              E-mail
            </span>
            <div className="w-2/3 h-10 p-2 flex rounded-md justify-center items-center bg-white">
              <input
                value={isSigningIn ? emailReg : emailLog}
                onChange={(e) => {
                  isSigningIn
                    ? setEmailReg(e.target.value)
                    : setEmailLog(e.target.value)
                }}
                className="w-full h-full outline-none"
                type="text"
              />
            </div>
          </div>

          <div className="w-full h-1/5 flex flex-col justify-center items-center ">
            <span className="flex justify-start items-start w-2/3 h-1/3 text-sm px-1">
              Password
            </span>
            <div className="w-2/3 h-10 p-2 flex rounded-md justify-center items-center bg-white">
              <input
                value={isSigningIn ? passwordReg : passwordLog}
                onChange={(e) => {
                  isSigningIn
                    ? setPasswordReg(e.target.value)
                    : setPasswordLog(e.target.value)
                }}
                className="w-full h-full outline-none"
                type="password"
              />
            </div>
          </div>
          <button
            onClick={isSigningIn ? register : login}
            className="w-3/5  h-10 rounded-md bg-blue-400"
          >
            {isSigningIn ? "Sign up" : "Log in"}
          </button>
        </div>
        <SignInBtn getData={getData} getUser={getUser} />
      </div>
    </div>
  )
}
