
import React, { useContext, useEffect } from 'react';
import { Datacontext } from '../Context/Context';
import "../CSS/Task.css"
import TaskBox from './TaskBox';

const Task = () => {

  const Data = useContext(Datacontext)

  const style = {
    minHeight: "100px",
    backgroundColor: "#ecedf6",
    marginTop: "10px",
    borderRadius: "12px"

  }
  const handleModalbtn = () => {
    Data.setModal(true)
  }


  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(Data.task))

  }, [Data.task]);
  useEffect(() => {
    localStorage.setItem("check", JSON.stringify(Data.isChecked))

  }, [Data.isChecked]);



  return (
    <>
      <div >
        <button style={{ backgroundColor: "#646ff0" }} className='btn btn-primary' onClick={handleModalbtn}>Add Task</button>
      </div>
      <div className='taskCont' style={style}>


        {Data.task.length === 0 && <h1>No todo here</h1>}

        {Data.task.map((element, index) => {
          return <div className='Taskhere' key={element.id}>
            <TaskBox title={element.title} index={index} id={element.id} priority={element.priority} date={element.date} pinned={element.pin} />

          </div>
        })}

      </div>
    </>
  )
}

export default Task
