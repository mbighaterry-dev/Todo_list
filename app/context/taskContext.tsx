import { useContext, createContext, useState , useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


 export type Task = {
    id: string;
     title:string;
      date:  Date;
      time:  Date;
    }
type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void
    removeTask: (id: string) => void
    updateTask?: (task: Task) => void
}
const TaskContext = createContext<TaskContextType | undefined>(undefined)
export default function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    console.log('Tasks:', tasks);
    useEffect(() => {
    const loadTasks = async() => {
         try{
        const store = await AsyncStorage.getItem('tasks')
        if (store) {
            const persed = JSON.parse(store);
            const restored = persed.map((tasks: any) => ({
                tasks,
                date : new Date(tasks.date),
                time : new Date(tasks.time),
                title: tasks.title,
                id: tasks.id,
            }));
            setTasks(restored);
        }
    }catch(err) {
        console.log("Error loading task", err) ;
    };
    }
    loadTasks();
   }, []);

    useEffect(() => {
        const safeTasks = async() => {
            try {
                const toStore = tasks.map((task) => ({
                    ...task,
                    date: new Date(task.date).getTime(),
                    time: new Date(task.time).getTime(),
                    title: task.title,
                    id: task.id,
                }));
                 await AsyncStorage.setItem("tasks", JSON.stringify(toStore));
             }catch(err) {
                console.log('Error saving tasks' , err);
             }
        };
        safeTasks(); 
    } ,[tasks]);

   
    const addTask = (task: Task) => setTasks((prev) => [...prev, task])
    const removeTask = (id: string) => setTasks((prev) => prev.filter((task) => task.id !== id));
    const updateTask = (updatedTask: Task) => setTasks((prev) => prev.map((task) => task.id === updatedTask.id ? {...task, ...updatedTask} : task));
    return (
        <TaskContext.Provider value={{tasks, addTask, removeTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    )
};
export const useTasks = () => {
    const ctx = useContext(TaskContext)
    if (!ctx) throw new Error('useTasks must be used inside a TaskProvider');
    return ctx;
}