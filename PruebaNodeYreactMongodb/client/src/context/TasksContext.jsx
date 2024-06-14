import { createContext, useContext, useState } from "react";
import { createTasksRequest } from "../api/tasks";

const TasksContext = createContext();

export const useTasks = () => {
    const context = useContext(TasksContext);

    if (!context){
        throw new Error("useTasks must be used within a taskProvider");
    }

    return context;
}

export function TaskProvider({children}) {
    const [tasks, setTasks] = useState([]);

    const createTask = async (task) => {
        const res =  await createTasksRequest(task);
        console.log(res);
    }

    return (
        <TasksContext.Provider value={{
            tasks,
            createTask,
        }}>
            {children}
        </TasksContext.Provider>
    )
}