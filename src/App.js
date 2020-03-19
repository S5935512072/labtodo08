import React, { useState,useEffect } from 'react';
import './App.css';
import {firestore} from './index'

function App() {
  const [tasks,setTasks] = useState([])
  const [name,setName] = useState(' ')
  useEffect(()=>{
    retriveData()
  },[])
  const retriveData = ()=>{
    firestore.collection("tasks").onSnapshot((snapshot)=>{
      console.log(snapshot.docs)
      let myTask = snapshot.docs.map(d=>{
        console.log(d.data)
        const {id,name} = d.data()
        console.log(id,name)
        return {id,name}
      
      })  
      setTasks(myTask)
    })
  }
  const renderTask = ()=>{
    if( tasks && tasks.length){
       return(
      tasks.map((tasks,index)=>{
        return(<li key ={index}>{tasks.id}:{tasks.name}
        <button class="btn btn-warning" onClick={()=>DeleteTask(tasks.id)}>ลบ</button>
        <button class="btn btn-primary" onClick={()=>EditTask(tasks.id)}>แก้ไข</button>
        </li>)
      })
      )
    }
    else{
        return(<li>No task</li>)
    }
  }
  const addTask =()=>{  
     let id = (tasks.length===0)?1:tasks[tasks.length-1].id +1
    firestore.collection("tasks").doc(id+'').set({id,name})
  }
  const DeleteTask = (id)=>{
    firestore.collection("tasks").doc(id+'').delete()
 }
 const EditTask = (id)=>{
   firestore.collection("tasks").doc(id+'').set({id,name})
 }
  return (
    <div align="center" >
     <h1 className="rdTestbt1">Todo firebase08</h1>
      <ul>{ renderTask() }</ul>
      <input type="text" name="name" onChange={ (e)=>setName(e.target.value)}/>
      <button class="btn btn-info" onClick={addTask}>กดยืนยัน</button>
    </div>
  );
}

export default App;