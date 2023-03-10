import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import { useState, useEffect } from "react"
import AddTask from "./Components/AddTask";

function App() {

    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () =>{
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data
    }

    useEffect(() => {
      const getTask = async () => {
        const taskFromServer = await fetchTasks()

        setTasks(taskFromServer)
      }

      getTask()
    }, [])

    const fetchTask = async(id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }


  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  const onDelete = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const onToggle = async (id) => {
    const changeTask = await fetchTask(id);
    const updateTask = {...changeTask, reminder: !changeTask.reminder}
    const res = await fetch (`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })
    const data = await res.json()

    setTasks(tasks.map(task => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  const showTask = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <div className="container">
      <Header onAdd = {showTask} showAdd = {showAddTask} />
      {showAddTask && <AddTask onAdd = {addTask}/>}
      {tasks.length > 0 ? 
      <Tasks tasks = {tasks} onDelete = { onDelete } onToggle = {onToggle} />
      : 'No task to display'}
    </div>
  );
}



export default App;
