import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let data = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, data])
    //TODO - add new task
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
    const copyTasks = tasks.filter(item => item.id !== id)
    setTasks(copyTasks)
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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