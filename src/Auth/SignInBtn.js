import React from "react";
import { db, auth, provider } from "../Firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { collection, setDoc, doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function SignInBtn() {


    const usersDB = collection(db, 'users')
    const currentUser = useSelector(state => state.currentUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then(async (res) => {
                console.log(res.user)
                let usersDoc = doc(db, 'users', res.user.uid)
                let getUsersDoc = await getDoc(usersDoc)
                console.log(getUsersDoc.data())
                await setDoc(usersDoc, { name: res.user.displayName, email: res.user.email }, {merge:true})
                dispatch({ type: 'SET_NAME', payload: res.user.displayName })
                localStorage.setItem('userUID', res.user.uid)

                navigate('/home', { replace: true })
            })
            .catch(async (error) => {
                console.log(error)
            })

    }


    return <button
        onClick={signInWithGoogle}
        className=" login-with-google-btn
  
    ">
        Sign in With Google
    </button>;
}
