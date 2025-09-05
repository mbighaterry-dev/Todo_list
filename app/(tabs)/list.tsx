import { FlatList, StyleSheet, Text, View, } from 'react-native';
import { useTasks } from '../context/taskContext';
import { Checkbox} from 'expo-checkbox'
export default function List() {
    const {tasks, removeTask} = useTasks();
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
                        
                        <Checkbox value= {false} onValueChange={() => removeTask(item.id)}/>
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
        justifyContent: 'space-between',
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
    }

})