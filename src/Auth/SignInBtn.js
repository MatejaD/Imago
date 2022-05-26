import React, { useState } from "react"

// Firebase
import { db, auth, provider } from "../Firebase/firebaseConfig"
import { signInWithPopup } from "firebase/auth"
import {
  collection,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore"
// Redux
import { useDispatch, useSelector } from "react-redux"
// React Router
import { useNavigate } from "react-router-dom"
// Images
import sword from "../Components/BasicSwordBig.png"
import basicArmor from "../Components/BasicArmorBig.png"
import character from "../Components/CharacterEmo.png"

export default function SignInBtn({ getData, getUser }) {
  const usersDB = collection(db, "users")
  const currentUser = useSelector((state) => state.currentUser)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  localStorage.setItem("userUID", "noID")

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(async (res) => {
        console.log(res.user)
        let usersDoc = doc(db, "users", res.user.uid)
        let getUsersDoc = await getDoc(usersDoc)
        await setDoc(
          usersDoc,
          {
            name: res.user.displayName,
            email: res.user.email,
          },
          { merge: true }
        )

        if (!getUsersDoc.data()) {
          await setDoc(
            usersDoc,
            {
              name: res.user.displayName,
              email: res.user.email,
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
        }
        localStorage.setItem("userUID", res.user.uid)
        console.log(getUsersDoc.data())

        if (getUsersDoc.data()) {
          // localStorage.setItem('cities', JSON.stringify(getUsersDoc.data().cities))
          // localStorage.setItem('coins', JSON.stringify(getUsersDoc.data().coins))
        } else {
          localStorage.setItem("habits", JSON.stringify(["Hello!"]))
          localStorage.setItem("coins", JSON.stringify(0))
        }

        dispatch({ type: "SET_NAME", payload: res.user.displayName })
        getData()
        getUser()
        navigate("/home", { replace: true })
      })
      .catch(async (error) => {
        console.log(error)
      })
  }

  return (
    <button
      onClick={signInWithGoogle}
      className=" login-with-google-btn
    "
    >
      Sign in With Google
    </button>
  )
}
