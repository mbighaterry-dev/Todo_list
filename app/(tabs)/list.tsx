import { FlatList, StyleSheet, Text , View, } from 'react-native';
import { useTasks } from '../context/taskContext';
import { Checkbox} from 'expo-checkbox'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
export default function List() {
    const {tasks, removeTask} = useTasks();
    const router = useRouter();
  return (
        <View style={styles.container}>
        {
            tasks.length === 0 ? (
                <Text style={styles.emptyText}>No tasks yet</Text>
            ): (
                <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style ={styles.taskContainer}>
                        <View style={{ gap: 8 }}  >
                            <Text style={{ fontWeight: '700', fontSize: 16 }}>{item.title ? item.title : 'Untitled Task'}</Text>
                            <Text>
                                {item.date.toLocaleDateString()} {item.time.toLocaleTimeString()}
                            </Text>
                        </View>

                            <Ionicons name='create-outline' size={24} color='black' onPress={() => router.push({pathname: '/edit/[id]', params: {id: item.id}})} />

                        <Checkbox style={{borderRadius: 10}} value= {false} onValueChange={() => removeTask(item.id)}/>
                    </View>
                )}
                />
            )
        }
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
    },
    emptyText:{
        textAlign: 'center',
        fontSize: 18,
        color: 'gray'
    },
    taskContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        margin: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    iconButton:{
        marginLeft: 10,
    }

})