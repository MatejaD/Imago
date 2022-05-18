import React from "react";
import { useSelector } from "react-redux";
import sword from '../Components/BasicSwordBig.png'

export default function Shop() {


    const shopItems = useSelector(state => state.shopItems)

    const marketElements = [
        {
            name: 'Armor',
            id: 1,
            items: shopItems.filter((item) => item === '1')
        },

        {
            name: 'Helmets',
            id: 2,
            items: shopItems.filter((item) => item === '2')
        },

        {
            name: 'Swords',
            id: 3,
            items: (shopItems.filter((item) => item.name === 'Basic Sword'))
        },
    ]

    console.log(marketElements)

    return (
        <div className="w-full min-h-full flex justify-start items-start ">
            <div className="flex flex-col justify-start items-start p-8 w-1/5 gap-4 min-h-screen bg-blue-300">
                <input type="text" placeholder="Search..." />
                <h2>Armor</h2>
                <h2>Weapons</h2>
                <h2>Helmets</h2>
            </div>
            <div className="w-10/12 mr-2 min-h-screen flex flex-col justify-start gap-4 items-start p-4 bg-blue-100 border-l-2 border-r-2 border-black">
                <h1 className="text-3xl">Market</h1>
                {marketElements.map((item) => {
                    console.log(item.items[0].name)
                    return (
                        <div key={item.id} className="flex relative cursor-pointer overflow-hidden flex-col justify-center bg-blue-100 items-start px-2 w-full h-64 ">
                            <h3 className="absolute left-4 top-1 text-xl">{item.name}</h3>
                            <div className="item-container w-2/12 h-3/5  relative overflow-hidden flex flex-col justify-center items-center">
                                <img className=" " src={item.items[0].img} alt="" />
                                <span className="absolute top-0 ">20$</span>

                                <div className="item-text flex flex-col rounded-sm justify-around items-center w-11/12   h-full absolute bg-black bg-opacity-80   ">
                                    <h2 className="w-full text-white text-lg text-center">{item.items[0].name}</h2>
                                    <p className="text-sm w-full h-1/2 text-center text-white">{item.items[0].desc}</p>
                                </div>


                            </div>

                        </div>
                    )
                })}

            </div>

        </div>
    )
}
