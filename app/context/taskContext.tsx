import { useContext, createContext, useState } from "react";


type Task = {id: string, title:string, date: string, time: string}
type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void
    removeTask: (id: string) => void
}
const TaskContext = createContext<TaskContextType | undefined>(undefined)
export default function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const addTask = (task: Task) => setTasks((prev) => [...prev, task])
    const removeTask = (id: string) => setTasks((prev) => prev.filter((task) => task.id !== id));
    return (
        <TaskContext.Provider value={{tasks, addTask, removeTask}}>
            {children}
        </TaskContext.Provider>
    )
};
export const useTasks = () => {
    const ctx = useContext(TaskContext)
    if (!ctx) throw new Error('useTasks must be used inside a TaskProvider');
    return ctx;
}