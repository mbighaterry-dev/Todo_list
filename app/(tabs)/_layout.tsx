import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons'
import { StatusBar } from "react-native";

 export default function TabsLayout() {
    return (
      <Tabs screenOptions={{ tabBarActiveTintColor: '#007BFF', tabBarInactiveTintColor: 'gray'}}>
         <StatusBar  barStyle='default'/>
        <Tabs.Screen name="index" options={{
         tabBarLabel: ' Home',
         tabBarIcon: () => (
            <Ionicons name="home" size={24}  color='gray' />
         ),
         headerTitle: 'My To-Do App',
         headerTitleAlign: 'center',
         headerStyle: {backgroundColor: '#007BFF'},
         headerTitleStyle: {color: 'white'}
        }}/>
        <Tabs.Screen name="list" options={{
         tabBarLabel: 'Tasks',
         tabBarIcon: () => (
            <Ionicons name="list" size={24} color='gray' />
         ),
         headerTitle: 'My Tasks',
         headerTitleAlign: 'center',
         headerStyle: {backgroundColor: '#007BFF'},
         headerTitleStyle: {color: 'white'}
        }}/>
    </Tabs>
    )
   
 } 
 