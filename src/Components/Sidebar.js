import React from "react"
import { BiSearchAlt } from "react-icons/bi"

export default function Sidebar({ inputValue, setInputValue, searchForItem }) {
  return (
    <div className="flex flex-col justify-start items-start p-4 md:p-8 w-2/6 md:w-1/5 gap-4 min-h-screen bg-blue-300">
      <div className="w-full h-10 flex justify-between items-center px-2 rounded-md bg-white">
        <input
          onKeyUp={() => searchForItem()}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full h-full outline-none "
          type="text"
          placeholder="Search..."
        />
        {!inputValue && (
          <span className="text-xl">
            <BiSearchAlt />
          </span>
        )}
      </div>
    </div>
  )
}
