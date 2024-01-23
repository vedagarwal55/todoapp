import React, { useEffect, useState } from 'react'
import Task from './Task';
const Home = () => {
  const initialArray=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
  const [tasks,setTasks]=useState(initialArray);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");

  const titleHandler=(e)=>{
    setTitle(e.target.value)
  }
  const deleteTask=(index)=>{
    const filtered_array=tasks.filter((val,i)=>{
      return i!==index;
    })
    setTasks(filtered_array)
  }
  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])
  const descriptionHandler=(e)=>{
    setDescription(e.target.value)
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    setTasks([...tasks,{
      title:title,
      description:description
    }])
    setTitle("");
    setDescription("");
  }
  return (
    <div className='container'>

      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Title' value={title} onChange={titleHandler}/>
        <textarea placeholder='Description' value={description} onChange={descriptionHandler}></textarea>
        <button type='submit'>ADD</button>
      </form>
      {
        tasks.map((item,index)=>{
          return (
            <Task key={index} title={item.title} description={item.description} deleteTask={deleteTask} index={index}/>
          )
        })
      }
    </div>
  )
}

export default Home