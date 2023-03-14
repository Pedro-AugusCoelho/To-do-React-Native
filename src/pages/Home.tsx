import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find(item => item.title === newTaskTitle)

    if(!findTask) {
      let data = {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        done: false
      }

      setTasks([...tasks, data])
    } else {
    Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome', [
      {
        text:'OK'

      }
    ])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({...task}))
    const findTask = updateTasks.find(item => item.id === id)

    if (findTask) {
      findTask.done = !findTask.done
      setTasks(updateTasks)
    }
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item','Tem certeza que você deseja remover este item?', [
      {
          style:'cancel',
          text:'Não'
      },
      {
          style:'default',
          text: 'Sim',
          onPress: () => {
            const copyTasks = tasks.filter(item => item.id !== id)
            setTasks(copyTasks)
          }
      }
    ])
  }

  function handleToggleEditTask(id: number, text: string) {
    const updateTasks = tasks.map(task => ({...task}))
    const findTask = updateTasks.find(item => item.id === id)

    if (findTask) {
      findTask.title = text
      setTasks(updateTasks)
    }
    //TODO - toggle task done if exists
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleToggleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})