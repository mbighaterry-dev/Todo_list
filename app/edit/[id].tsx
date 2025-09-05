import { StyleSheet, Text, View, TouchableOpacity, TextInput, } from 'react-native';
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '../context/taskContext';

export default function UpdateTask() {
  const {id} = useLocalSearchParams();
  const {tasks, updateTask} = useTasks();
  const router = useRouter();
  const task = tasks.find((t) => t.id === id);


  const [title, setTitle] = useState(task ? task.title : '');
  const [date, setDate] = useState<Date | null>(task ? task.date : null);
  const [time, setTime] = useState<Date | null>(task ? task.time : null);
  const [pickerMode, setPickerMode] = useState<'date' | 'time' >('date');
  const [pickerVisible, setPickerVisible] = useState(false);
   
  if (!task) return <Text>Task not found</Text>;

  const showPicker = (mode: 'date' | 'time') => {
    setPickerMode(mode);
    setPickerVisible(true);
  };

  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (selected: Date) => {
    if (pickerMode === 'date') setDate(selected);
    if (pickerMode === 'time') setTime(selected);
    hidePicker();
  };

  const handleUpdate = () => {
    if (!title || !date || !time) return alert('Please fill all fields');
    if (updateTask) {
      updateTask({ ...task, title, date, time });
      router.push('/list');
    } else {
      alert('Update function not available');
    }
  };
  return (
     <View style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity style={styles.input} onPress={() => showPicker("date")}>
        <Text>{date ? date.toDateString() : "Select Date"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress={() => showPicker("time")}>
        <Text>{time ? time.toLocaleTimeString() : "Select Time"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listButton} onPress={handleUpdate}>
              <Text style={{color:'#fff', fontSize:16}}>Save Changes</Text>
            </TouchableOpacity>

      <DateTimePickerModal
        isVisible={pickerVisible}
        mode={pickerMode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  )
}

const styles = StyleSheet.create({
   container: { 
    flex: 1,
    justifyContent: "center",
     padding: 20,
    },
  header: { 
    fontSize: 20, 
    fontWeight: "700",
     marginBottom: 20, 
     alignSelf: "center"
     },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  listButton:{
    backgroundColor:'#007BFF',
    padding:12,
    borderRadius:8,
    marginTop:16,
    alignItems:'center',
  }
})