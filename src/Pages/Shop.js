import React from "react";
import { useSelector } from "react-redux";

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
            items: shopItems.filter((item) => item === '3')
        },
    ]


    return (
        <div className="w-full min-h-full flex justify-start items-start ">
            <div className="flex flex-col justify-start items-start p-8 w-1/5 gap-4 min-h-screen bg-blue-300">
                <input type="text" placeholder="Search..." />
                <h2>Armor</h2>
                <h2>Weapons</h2>
                <h2>Helmets</h2>
            </div>
            <div className="w-4/5 min-h-screen flex flex-col justify-start gap-4 items-start p-4 bg-slate-50 border-l-2  border-black">
                <h1 className="text-3xl">Market</h1>
                {marketElements.map((item) => {
                    return (
                        <div key={item.id} className="flex relative flex-col justify-center items-start px-2 w-full h-64 bg-blue-700">
                            <h3 className="absolute left-4 top-1 text-xl">{item.name}</h3>
                            <h5>{item.items}</h5>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}
