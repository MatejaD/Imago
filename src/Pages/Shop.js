import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import sword from "../Components/BasicSwordBig.png"

// Icons
import { RiMoneyDollarBoxFill } from "react-icons/ri"
import { BiSearchAlt } from "react-icons/bi"
import Sidebar from "../Components/Sidebar"
import { useNavigate } from "react-router-dom"

export default function Shop() {
  const dispatch = useDispatch()

  const shopItems = useSelector((state) => state.shopItems)
  const inventory = useSelector((state) => state.inventory)
  const marketElements = useSelector((state) => state.marketElements)
  const [inputValue, setInputValue] = useState("")
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: "SET_SHOP_ITEMS", payload: shopItems })
  }, [shopItems, showModal])

  const searchForItem = () => {
    let newRegExp = new RegExp(inputValue, "im")
    let searchArray = shopItems.filter((value) => newRegExp.test(value.name))
    dispatch({ type: "SET_SHOP_ITEMS", payload: searchArray })
  }

  const buyItem = (id, singleItem) => {
    dispatch({ type: "BUY_ITEM", payload: id, item: singleItem })
  }

  return (
    <div
      key={"main"}
      className="w-full min-h-full flex justify-start items-start "
    >
      <Sidebar
        inputValue={inputValue}
        setInputValue={setInputValue}
        searchForItem={searchForItem}
      />
      <div
        key={"container"}
        className="w-10/12 mr-2 min-h-screen flex flex-col justify-start gap-16 items-start p-4 bg-blue-100 border-l-2 border-r-2 border-black"
      >
        <h1 className="text-3xl after:block ">Market</h1>
        {marketElements.map((item, index) => {
          return item.items.length > 0 ? (
            <>
              <h3 className=" text-2xl border-b-2 border-black">{item.name}</h3>
              <div
                key={item.id}
                className="flex flex-wrap relative cursor-pointer justify-start items-end bg-blue-100 px-4 gap-y-4 gap-x-2  w-full min-h-64 "
              >
                {item.items.map((singleItem, index) => {
                  return (
                    <>
                      {singleItem.buyModal ? (
                        <>
                          <div
                            key={singleItem.id}
                            className="w-2/6 h-2/3 cursor-default rounded-md flex flex-col text-xl p-4 gap-2 justify-evenly items-center fixed z-20  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50"
                          >
                            <div className="w-full h-1/2 flex justify-center items-center flex-col">
                              <button
                                onClick={() => {
                                  dispatch({ type: "CLOSE_BUY_MODAL" })
                                }}
                                className="absolute w-1/4 rounded-md h-10 top-2 right-3 bg-red-500"
                              >
                                Close
                              </button>
                              <img
                                className="  w-1/2 rounded-md"
                                src={singleItem.img}
                                alt={singleItem.name}
                              />
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
                              onClick={() => {
                                dispatch({
                                  type: "BUY_ITEM",
                                  payload: singleItem.id,
                                  item: singleItem,
                                })
                              }}
                              className=" text-white w-1/2 h-12 bg-blue-600 rounded-md shadow-md shadow-blue-800"
                            >
                              Buy
                            </button>
                          </div>

                          <div
                            key={new Date().getMinutes()}
                            onClick={() =>
                              dispatch({ type: "CLOSE_BUY_MODAL" })
                            }
                            className="fixed w-screen z-10 top-0 left-0 h-screen bg-black bg-opacity-50"
                          ></div>
                        </>
                      ) : (
                        ""
                      )}
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
                    </>
                  )
                })}
              </div>
            </>
          ) : (
            ""
          )
        })}
      </div>
    </div>
  )
}
