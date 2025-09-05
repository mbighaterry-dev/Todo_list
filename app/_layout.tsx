import { Stack } from "expo-router";
import TaskProvider from "./context/taskContext";
export default function Layout () {
  return (
    <TaskProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </TaskProvider>
  )
}