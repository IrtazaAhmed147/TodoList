import React, { useContext } from 'react';
import { Datacontext } from '../Context/Context';

const TaskBox = (props) => {

  const Data = useContext(Datacontext)


  // console.log(props.generatedDate)


  const handleDelete = (id) => {
    const updatedTask = Data.task.filter((task) => task.id !== id)
    Data.setTask(updatedTask)
    // localStorage.removeItem(Data.task)

  }

  const checkBox = (id) => {
    Data.setIsChecked({ ...Data.isChecked, [id]: !Data.isChecked[id] });
  }


  const handleEdit = (id) => {
    const taskToEdit = Data.task.find(task => task.id === id);
    Data.setCurrentTask(taskToEdit);
    Data.setToggleSubmit(false);
    Data.setModal(true);


  }




  return (
    <>
      <div className='task' style={{ width: "100%", minHeight: "50px", backgroundColor: "#fff", borderRadius: "5px" }}>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>




          <input onChange={() => checkBox(props.id)} checked={Data.isChecked[props.id] ?? false} className="checkbox" type="checkbox" />

          <div >
            <p className='mb-0 task-line' style={{ textDecoration: Data.isChecked[props.id] ?? false ? "line-through" : "none" }}>

              {props.title.charAt(0).toUpperCase() + props.title.slice(1)}
            </p>
            <p className='mb-0 date'>
             {props.time}, {props.genday}
            </p>
          </div>

        </div>

        <div className='detailsBox' style={{ display: "flex", alignItems: "center" }}>

          <div >
            <p className='mb-0 task-line'>
              Due Date
            </p>
            <p className='mb-0 date'>
              {props.duedate}
            </p>
          </div>

          <div >
            <p className='mb-0  task-line'>
              Priority
            </p>
            <p className='mb-0 date'>
              {props.priority}
            </p>
          </div>
          <button onClick={() => handleDelete(props.id)} className='btn btn-dark'><i className="fa-solid fa-trash"></i></button>

          <button className='btn btn-success' onClick={() => handleEdit(props.id)}>Edit</button>

        </div>







      </div>
    </>
  )
}

export default TaskBox
