import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from './logo.jpg'
import characterBig from './characterBig.png'
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Icons
import { FaHeartbeat } from 'react-icons/fa'
import { AiFillExperiment } from 'react-icons/ai'

export default function Navbar() {

    const name = useSelector(state => state.currentUser.name)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const avatarURL = useSelector(state => state.currentUser.avatarURL)
    const coins = useSelector(state => state.coins)

    const health = useSelector(state => state.health)
    const exp = useSelector(state => state.exp)

    let amount = 1


    const links = [
        {
            name: 'Home', to: '/home', id: 1,
        },

        {
            name: 'Shop', to: '/shop', id: 2,
        },

        {
            name: 'Inventory', to: '/invenvtory', id: 3
        },
    ]

    let docRefUsers = doc(db, 'users', localStorage.getItem('userUID'))

    const sendCoinsToDB = async () => {
        await updateDoc(docRefUsers, { coins: coins + amount })
        console.log(coins)
    }

    const increaseCoins = () => {
        dispatch({ type: 'INCREASE_COINS', payload: amount })
        sendCoinsToDB()

        navigate('/home', { replace: false })

    }



    const logout = () => {
        navigate('/', { replace: true })
        window.location.reload()
    }


    const expBarWidth = (exp / 50) * 100
    const healthBarWidth = (health / 50) * 100




    return (
        <nav className="w-full h-64 rounded-b-md  bg-blue-700 flex flex-col justify-start items-start">
            <nav className="w-full h-1/4 flex justify-between items-center bg-blue-500">
                <div className="flex justify-start items-center h-full w-1/3 px-10">
                    <img className='rounded-full w-4 h-4 bg-blue-400' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFBGtT23Evq7dNpUdwP8fXnWY2DseIuYpnp-RFWSX1WAyhFpJc&s' alt="" />
                    <span className="px-4 text-xl font-bold">Imago</span>
                </div>
                <ul className="h-full w-1/3 flex justify-around items-center ">
                    {links.map((link) => {
                        return (<li className="text-lg font-semibold cursor-pointer" key={link.id}>  {link.name} </li>)

                    })}
                </ul>
                <div className="h-full w-1/3 flex justify-end items-center gap-8  px-10">
                    <div className="flex w-16 justify-center items-center gap-2">
                        <button
                            onClick={() => increaseCoins()}
                            className="text-3xl">+</button>
                        <span>Coins</span>
                        <span>{coins}$</span>
                    </div>
                    <button className="cursor-pointer" onClick={() => logout()}>Logout</button>
                </div>
            </nav>
            <div className="w-full h-3/4 flex justify-start items-center gap-2 px-4 py-6">
                <div className="w-36 h-full flex justify-center items-center bg-black bg-opacity-5 border-2 border-black   rounded-md">
                    <img className="w-full" src={avatarURL === 'characterBig' ? characterBig : ''} alt="" />
                </div>
                <div className="h-full w-3/12 flex flex-col p-2 justify-center items-center gap-2 ">

                    <div className="w-full h-1/3 flex  justify-center gap-4 items-start">
                        <h2 className="text-xl text-center  font-bold ">{name}</h2>
                        <p className="text-xl text-center ">lvl 1</p>
                    </div>

                    <div className="w-full h-1/3 flex justify-center gap-4 items-center ">
                        <span className=" text-red-500 text-center text-3xl"><FaHeartbeat /></span>
                        <div className="w-3/5 h-3/5 flex justify- items-center rounded-md bg-slate-200   ">
                            <div
                                style={{ width: `${healthBarWidth}%` }}
                                className="h-full pb-2 bg-red-500 rounded-md  ">

                            </div>
                        </div>
                        <span>{health}/50</span>
                    </div>




                    <div className="w-full h-1/3 flex justify-center gap-4 items-center ">
                        <span className=" text-center text-3xl text-yellow-500"><AiFillExperiment /></span>
                        <div className="w-3/5 h-3/5 flex justify-start items-center rounded-md bg-slate-200   ">
                            <div style={{ width: `${expBarWidth}%` }} className="h-full w-1/2 pb-2 bg-yellow-500  rounded-md  ">

                            </div>
                        </div>
                        <span>{exp}/50</span>
                    </div>


                </div>
            </div>


        </nav >
    )
}
