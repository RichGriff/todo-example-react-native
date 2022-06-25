import { useState } from 'react'
import { Keyboard, Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Task from './components/Tasks'

export default function App() {
  const [task, setTask] = useState(null)
  const [taskItems, setTaskItems] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const handleInputSubmit = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask("")
  }

  const removeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  } 

  const completeTask = (index, task) => {
    setCompletedTasks([...completedTasks, task])
    removeTask(index)
  }

  const handleUndo = (index, task) => {
    // Remove From Completed
    let itemsCopy = [...completedTasks]
    itemsCopy.splice(index, 1)
    setCompletedTasks(itemsCopy)

    // Add to Tasks
    setTaskItems([...taskItems, task])
  }


  const clearAll = () => {
    setCompletedTasks([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {/* This is where the tasks will go */}
          {taskItems.length > 0 ? taskItems.map((item, index) => {
            return (
              <Task key={index} index={index} text={item} remove={removeTask} complete={completeTask} completed={false} /> 
            )
          }) : (
            <Text style={styles.emptyTasksText}>No Tasks</Text>
          )}
        </View>
        {completedTasks.length > 0 && (
          <View style={styles.completedTasks}>
            <View style={styles.completedTaskHeading}>
              <Text style={styles.completedTaskHeadingText}>Completed Tasks:</Text>
              <TouchableOpacity onPress={clearAll}>
                <Text>Clear All</Text>
              </TouchableOpacity>
            </View>

            {/* Completed Tasks */}
            {completedTasks.map((item, index) => {
              return <Task key={index} index={index} text={item} remove={removeTask} undo={handleUndo} completed={true} /> 
            })}
          </View>
        )}
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behaviour={Platform.OS === "ios" ? "padding" : "height"}  
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={task => setTask(task)} onSubmitEditing={ () => handleInputSubmit() }/>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 26, 
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#d4d8dd',
    paddingVertical: 30
  },
  input: {
    paddingVertical: 15, 
    width: '90%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  addWrapper: {
    width: 60,
    height: 60, 
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addText: {},
  completedTasks: {
    marginTop: 20,
  },
  completedTaskHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  completedTaskHeadingText: {
    fontSize: 18,
    // color: '#c0c0c0',
    paddingVertical: 10
  }, 
  emptyTasksText: {
    fontSize: 18,
    color: '#c0c0c0',
  }
});
