import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sword from '../Components/BasicSwordBig.png'

// Icons
import { RiMoneyDollarBoxFill } from 'react-icons/ri'

export default function Shop() {


    const dispatch = useDispatch()

    const shopItems = useSelector(state => state.shopItems)
    const inventory = useSelector(state => state.inventory)
    const marketElements = useSelector(state => state.marketElements)
    const [inputValue, setInputValue] = useState('')



    let nameArray = [
        'Basic Sword',
        `Peasent's armor`,
    ]
    const [b, setB] = useState(shopItems)


    const [newArray, setNewArray] = useState([])



    const searchForItem = () => {
        let newRegExp = new RegExp(inputValue, 'gi')

        // dispatch({ type: 'SEARCH', payload: newRegExp })
        let a = (shopItems.map((item) => {
            if ((nameArray.filter((value) => newRegExp.test(value))).includes(item.name)) {
                return item
            }

        }))

        setB(a.filter(Boolean))

        // dispatch({ type: 'SET_SHOP_ITEMS', payload: b })
        console.log(b)
        // console.log(nameArray.filter((value) => newRegExp.test(value)))
        // console.log(a)
    }
    // Creating array based on users input and displaying it

    // useEffect(() => {
    // }, [inputValue])



    const buyItem = (id, singleItem) => {
        dispatch({ type: 'BUY_ITEM', payload: id, item: singleItem })
        console.log('clicked')

    }


    return (
        <div key={'main'} className="w-full min-h-full flex justify-start items-start ">

            <div key={'sidebar'} className="flex flex-col justify-start items-start p-8 w-1/5 gap-4 min-h-screen bg-blue-300">
                <input
                    onKeyUp={() => searchForItem()

                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    placeholder="Search..." />
                {/* <button onClick={() => setMarketElements(startingShop)}>All</button>
                <button onClick={() => sortItems('Armor')}>Armor</button>
                <button onClick={() => sortItems('Swords')} > Weapons</button>
                <button onClick={() => sortItems('Helmets')}> Helmets</button> */}
            </div >
            <div key={'container'} className="w-10/12 mr-2 min-h-screen flex flex-col justify-start gap-16 items-start p-4 bg-blue-100 border-l-2 border-r-2 border-black">
                <h1 className="text-3xl after:block ">Market</h1>
                {marketElements.map((item, index) => {
                    return (

                        <div key={item.id} className="flex relative   cursor-pointer   justify-start items-end bg-blue-100  w-full h-64 ">
                            <h3 className="absolute left-4 top-1 text-2xl border-b-2 border-black">{item.name}</h3>

                            {item.items.map((singleItem, index) => {
                                return (
                                    <>
                                        {singleItem.buyModal ?
                                            <>
                                                <div
                                                    key={singleItem.id}
                                                    className="w-2/6 h-2/3 cursor-default rounded-md flex flex-col text-xl p-4 gap-2 justify-evenly items-center fixed z-20  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50">
                                                    <div className="w-full h-1/2 flex justify-center items-center flex-col">
                                                        <button
                                                            onClick={() => {
                                                                dispatch({ type: 'CLOSE_BUY_MODAL' })

                                                            }}
                                                            className="absolute w-1/4 rounded-md h-10 top-2 right-3 bg-red-500">Close</button>
                                                        <img className="  w-1/2 rounded-md" src={singleItem.img} alt={singleItem.name} />
                                                        <div className="flex flex-col w-1/2  justify-center items-center">
                                                            <h2>{singleItem.name}</h2>
                                                            <div className="flex justify-center items-center">
                                                                <span className="text-lg">
                                                                    {singleItem.price}
                                                                </span>
                                                                <span className="text-yellow-400 text-xl">
                                                                    <RiMoneyDollarBoxFill />
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => buyItem(singleItem.id, singleItem)}
                                                        className=" text-white w-1/2 h-12 bg-blue-600 rounded-md shadow-md shadow-blue-800">Buy</button>

                                                </div>

                                                <div
                                                    key={new Date().getMinutes()}
                                                    onClick={() => dispatch({ type: 'CLOSE_BUY_MODAL' })}
                                                    className="fixed w-screen z-10 top-0 left-0 h-screen bg-black bg-opacity-50">

                                                </div>
                                            </>
                                            :
                                            ""
                                        }
                                        <div
                                            key={singleItem.id}
                                            onClick={() => {
                                                dispatch({ type: 'OPEN_BUY_MODAL', payload: singleItem.id })
                                            }}
                                            className="item-container w-2/12 h-3/5   rounded-md relative overflow-hidden flex flex-col justify-center items-center">

                                            <img className="  w-full rounded-md" src={singleItem.img} alt={singleItem.name} />
                                            <div className="absolute top-0 flex text-lg justify-center gap-1 items-center w-full px-2 ">
                                                <span>{singleItem.price}</span>
                                                <span className="text-yellow-400 text-2xl "><RiMoneyDollarBoxFill /></span>
                                            </div>

                                            <div className="item-text flex flex-col rounded-sm justify-around items-center w-full px-4  h-full absolute bg-black bg-opacity-90   ">
                                                <h2 className="w-full text-white text-lg text-center">{singleItem.name}</h2>
                                                <p className="text-sm w-full h-1/2 text-center text-white">{singleItem.desc}</p>
                                            </div>
                                        </div>
                                    </>

                                )
                            })}


                        </div>
                    )
                })}

            </div>

        </div >
    )
}
