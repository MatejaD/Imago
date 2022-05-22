import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Habits from "../Components/Habits";

export default function Home({ getData, getUser }) {

    const Habitss = useSelector(state => state.Habits)
    const Daily_Tasks = useSelector(state => state.Daily_Tasks)
    const To_Do = useSelector(state => state.To_Do)

    useEffect(() => {
        // getData()
        // getUser()
    }, [])

    return (
        <div className="w-full min-h-screen flex justify-evenly items-start px-8 py-10 gap-8">
            <Habits
                taskList={Habitss}
                name='Habits'
                placeholder='Habit'
            />

            <Habits
                taskList={Daily_Tasks}
                name='Daily_Tasks'
                placeholder='Daily Task'
            />

            <Habits
                taskList={To_Do}
                name="To_Do"
                placeholder='To Do'
            />

        </div>
    )
}
