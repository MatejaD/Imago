import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../Components/Sidebar"
import { RiMoneyDollarBoxFill } from "react-icons/ri"

export default function Inventroy() {
  const [inputValue, setInputValue] = useState("")

  const dispatch = useDispatch()

  const inventory = useSelector((state) => state.inventory)

  const searchForItem = () => {
    let newRegExp = new RegExp(inputValue, "im")
    let searchArray = inventory.filter((value) => newRegExp.test(value.name))
    dispatch({ type: "SET_INVENTORY_ITEMS", payload: searchArray })
  }

  return (
    <div className="w-full min-h-full flex justify-start items-start ">
      <Sidebar
        inputValue={inputValue}
        setInputValue={setInputValue}
        searchForItem={searchForItem}
      />
      <div
        key={"container"}
        className="w-10/12 mr-2 min-h-screen flex flex-col justify-start gap-16 items-start p-8 bg-blue-100 border-l-2 border-r-2 border-black"
      >
        <div className="flex flex-wrap relative cursor-pointer justify-start items-end bg-blue-100 px-4 gap-y-8 gap-x-16  w-full min-h-64 ">
          {inventory.map((singleItem) => {
            return (
              <div
                key={singleItem.id}
                onClick={() => {
                  dispatch({
                    type: "OPEN_BUY_MODAL",
                    payload: singleItem.id,
                  })
                }}
                className="item-container w-2/12 h-3/5   rounded-md relative overflow-hidden flex shrink-0 flex-col justify-center items-center"
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

                <div className="item-text flex flex-col rounded-sm justify-start items-center gap-8 w-full px-4 py-2  h-full absolute bg-black bg-opacity-80   ">
                  <h2 className="w-full text-white text-lg text-center ">
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
