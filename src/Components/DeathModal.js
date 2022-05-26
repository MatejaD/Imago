import React from "react"

export default function DeathModal({ setIsDead }) {
  return (
    <>
      <div className="w-4/6 md:w-3/6 lg:w-2/6 h-2/3 flex flex-col text-xl p-4 gap-2 justify-evenly items-center fixed z-30  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50">
        <h2>DEAD</h2>
        <button onClick={() => setIsDead(false)}>Revive</button>
      </div>

      <div
        onClick={() => setIsDead(false)}
        className="fixed w-screen z-20 h-screen bg-black bg-opacity-70"
      ></div>
    </>
  )
}
