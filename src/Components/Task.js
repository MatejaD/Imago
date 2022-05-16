import React from "react";
import { useSelector } from "react-redux";

export default function Task({ city }) {



    return (
        <div key={city} className="w-full min-h-4  flex justify-center items-center  bg-red-500">
            <div className="h-full w-1/5 bg-red-500">

            </div>
            <div className="min-h-4 w-2/3 flex justify-start items-center px-2 bg-blue-400">
                {/* <h2>text</h2> */}
                <h2 style={{ minHeight: '9rem' }} className="text-field flex justify-start items-center  min-h-full px-2 py-2 ">
                    {city}
                </h2>
            </div>

            <div className="min-h-36 h-36 w-1/5 bg-red-500">

            </div>
        </div>
    )
}
