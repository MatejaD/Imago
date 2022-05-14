import React from "react";
import { useNavigate } from "react-router-dom";
import logo from './logo.jpg'
import characterBig from './characterBig.png'
import { useSelector } from "react-redux";

export default function Navbar() {

    const name = useSelector(state => state.currentUser.name)

    const navigate = useNavigate()

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


    return (
        <nav className="w-full h-64 rounded-b-md  bg-blue-600 flex flex-col justify-start items-start">
            <nav className="w-full h-1/4 flex justify-between items-center bg-blue-400">
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
                        <span>Coins</span>
                        <span>10.00$</span>
                    </div>
                    <button className="cursor-pointer" onClick={() => navigate('/', { replace: true })}>Logout</button>
                </div>
            </nav>
            <div className="w-full h-3/4 flex justify-start items-center gap-2 px-4 py-6">
                <div className="w-36 h-full flex justify-center items-center bg-black bg-opacity-5 border-2 border-black   rounded-md">
                    <img className="w-full" src={characterBig} alt="" />
                </div>
                <div className="h-full w-3/12 flex flex-col p-2 justify-center items-center gap-2 ">

                    <div className="w-full h-1/3 flex  justify-center gap-4 items-start">
                        <h2 className="text-xl text-center  font-bold ">{name}</h2>
                        <p className="text-xl text-center ">lvl 1</p>
                    </div>

                    <div className="w-full h-1/3 flex justify-center gap-4 items-center ">
                        <span className="w-16 text-center">Heart</span>
                        <div className="w-3/5 h-3/5 flex justify-start items-center rounded-md bg-slate-200   ">
                            <div className="h-full w-1/2 pb-2 bg-red-500 rounded-md  ">

                            </div>
                        </div>
                        <span>25/50</span>
                    </div>




                    <div className="w-full h-1/3 flex justify-center gap-4 items-center ">
                        <span className="w-16 text-center">Exp</span>
                        <div className="w-3/5 h-3/5 flex justify-start items-center rounded-md bg-slate-200   ">
                            <div className="h-full w-1/2 pb-2 bg-yellow-500  rounded-md  ">

                            </div>
                        </div>
                        <span>25/50</span>
                    </div>


                </div>
            </div>


        </nav >
    )
}
