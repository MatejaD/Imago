import React from "react";
import Habits from "./Habits";

export default function Container() {
    return (
        <div className="w-full min-h-screen flex justify-evenly items-center px-8 gap-8">
            <Habits />

            <Habits />

            <Habits />

        </div>
    )
}
