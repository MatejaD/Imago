import React from "react"
import { useSelector } from "react-redux"

export default function LvlUpModal({ setShowLvlUpModal }) {
  const lvl = useSelector((state) => state.lvl)
  const name = useSelector((state) => state.currentUser.name)

  console.log(name)
  return (
    <>
      <div className="w-4/6 md:w-3/6 lg:w-2/6 h-2/3 flex flex-col text-xl p-4 gap-2 justify-evenly items-center fixed rounded-md z-20  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50">
        <div className="w-full h-1/3 flex flex-col gap-4 justify-center items-center">
          <h2 className="text-3xl">Congradulations!</h2>
          <p className="text-blue-600">You just leveled up!</p>
        </div>

        <div className="w-full h-1/4 flex md:text-2xl text-lg justify-center items-center break-words px-2">
          <h3>
            {name} you're level {lvl}.
          </h3>
        </div>

        <div className="w-full h-20  flex flex-col gap-2 justify-center items-center">
          <button
            onClick={() => setShowLvlUpModal(false)}
            className="md:w-2/3 w-3/5 md:h-12 h-10 bg-blue-400 text-base rounded-md shadow-md shadow-blue-700 hover:border-2 border-blue-900 duration-100 ease-in-out "
          >
            Continue your journey
          </button>
          <span className="text-sm text-blue-600">Your wounds are healed!</span>
        </div>
      </div>

      <div
        onClick={() => setShowLvlUpModal(false)}
        className="fixed w-screen z-10 h-screen bg-black bg-opacity-70"
      ></div>
    </>
  )
}
