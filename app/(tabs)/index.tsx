import { StyleSheet, Text, TextInput, TouchableOpacity, View , KeyboardAvoidingView,Platform} from 'react-native'
import { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRouter } from 'expo-router';
import { useTasks } from '../context/taskContext';

export default function App() {
const {addTask} = useTasks();
const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [pickerMode, setPickerMode] = useState<'date' | 'time' | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const showPiker = (mode: 'date' | 'time') => {
    setPickerMode(mode);
    setPickerVisible(true);
  }
  const hidePiker = () => setPickerVisible(false);

  const handleConfirm = (selected: Date) => {
    if(pickerMode === 'date') setDate(selected);
    if(pickerMode === 'time') setTime(selected);
    hidePiker();
  }

  const handleAdd =()  => {
    if (!title || !date || !time)
      return;
    addTask({
      id: Date.now().toString(),
      title,
      date: date.toLocaleDateString(),
      time: time.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'}),
    });
    setTitle('');
    setDate(null);
    setTime(null);
    router.push('/list')
  }
  return (
    <KeyboardAvoidingView behavior='padding'
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder='Task Title'
      value= {title}
      onChangeText={setTitle}
      />
      <TouchableOpacity style={styles.input} onPress={() => showPiker('date')}>
        <Text>
          {date ? date.toLocaleDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>   
      <TouchableOpacity style={styles.input} onPress={() => showPiker('time')}>
        <Text>
            {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Pick Time'}

        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
      isVisible ={pickerVisible}
      mode ={pickerMode || 'date'}
      onConfirm ={handleConfirm}
      onCancel = {hidePiker}
      />
      <TouchableOpacity style={styles.listButton} onPress={handleAdd}>
        <Text style={{color:'#fff', fontSize:16}}>Add to List</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:"50%",
  },
  input:{
    borderWidth:1,
    borderColor:'#ccc',
    padding:12,
    borderRadius:8,
    width:'80%',
    marginVertical:8,
  },
  listButton:{
    backgroundColor:'#007BFF',
    padding:12,
  borderRadius:8,
    marginTop:16,
  },
})