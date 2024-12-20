import React, { useContext, useState, useEffect } from 'react'
import { Datacontext } from '../Context/Context'
import '../CSS/Modal.css'

const Modal = () => {

    const [inputValue, setInputValue] = useState("")
    const [warning, setWarning] = useState(false)
    const [selectedVal, setSelectedVal] = useState("Normal")
    const [status, setStatus] = useState("InCompleted")
    const [date, setDate] = useState("2024-10-01")

    const Data = useContext(Datacontext)



  


    // for edit task 
    useEffect(() => {
        if (Data.currentTask) {
            setInputValue(Data.currentTask.title);
            setSelectedVal(Data.currentTask.priority);
            setDate(Data.currentTask.duedate);
            setStatus(Data.isChecked[Data.currentTask.id] ? "Completed" : "InComplete");
            
        }
    }, [Data.currentTask, Data.isChecked]);



    // Time
    const convertTo12HourFormat = (time24) => {
        let [hours, minutes] = time24.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    };
    const currentTime = new Date().toLocaleTimeString();  
    const timeIn12HourFormat = convertTo12HourFormat(currentTime);


    // current date 
    const staticDate = new Date();
    const formattedDate = staticDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })



    const handleModal = () => {
        Data.setModal(false)
        Data.setCurrentTask(null);
        Data.setToggleSubmit(true);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSelected = (e) => {
        setSelectedVal(e.target.value)
    }

    const handleDate = (e) => {
        setDate(e.target.value)
    }

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };





    const addTask = () => {


        const trimmedValue = inputValue.trim();
        
        if (!trimmedValue) {
            setWarning(true)

        }

        else {
            
            if (Data.toggleSubmit) {
                // Add new task
                const newTaskId = Date.now();
                const newTask = {
                    title: trimmedValue,
                    id: Date.now(),
                    priority: selectedVal,
                    duedate: date, 
                    time: timeIn12HourFormat,
                    generatedDate: formattedDate,
                    status: 'completed',
                };
                const updatedTasks = [...Data.task, newTask];
                Data.setIsChecked({ ...Data.isChecked, [newTaskId]: status === "Completed" });
                Data.setTask(updatedTasks);


            } else {
                // Edit task
                console.log(Data)
                const updatedTasks = Data.task.map((task) =>
                    task.id === Data.currentTask.id
                        ? { ...task, title: trimmedValue, priority: selectedVal, duedate: date }
                        : task
                );
                Data.setTask(updatedTasks);
                Data.setIsChecked({ ...Data.isChecked, [Data.currentTask.id]: status === "Completed" });
                

            }

            Data.setModal(false);
            setWarning(false);
            Data.setCurrentTask(null);
            Data.setToggleSubmit(true);
        }
    }

    return (
        <>
                <div className='color'></div>
            <div className='modalMainBox'>

            <div className='modals' >
                <h1 >Add Todo</h1>
                <div style={{ width: "100%" }}>


                    <label style={{ textAlign: "start", width: "100%" }} htmlFor=""> Title: <br />
                        <input value={inputValue} type="text" className='input' onChange={handleChange} required />
                    </label>

                    {warning && <p className='danger mb-0'>Please input field</p>}
                </div>



                <div className='modalDet' >


                    <div>


                        <p className='mb-0'>Priority</p>

                        <select className='select' onChange={handleSelected} name="" id="" value={selectedVal}>
                            <option className='option' value="Normal" >Normal</option>
                            <option className='option' value="High">High</option>
                            <option className='option' value="Low">Low</option>
                        </select>
                    </div>

                    <div>


                        <p className='mb-0'>Status</p>

                        <select className='select' name="" id="" onChange={handleStatus} value={status}>
                            <option className='option' value="InComplete">InComplete</option>
                            <option className='option' value="Completed" >Completed</option>
                        </select>
                    </div>
                    <div>


                        <p className='mb-0'>Due Date</p>

                        <input onChange={handleDate} type="date" className='dateinput' value={date} />

                    </div>

                </div>

                <div style={{ display: "flex", gap: "30px" }}>

                    {Data.toggleSubmit ? <button style={{ backgroundColor: "rgb(100, 111, 240)", }} className='btn btn-primary' onClick={addTask}>Add Task</button> : <button style={{ backgroundColor: "rgb(100, 111, 240)", }} className='btn btn-primary' onClick={addTask}>Edit Task</button>}



                    <button className='btn btn-dark' onClick={handleModal} >Cancel</button>
                </div>

            </div>
            </div>
        </>
    )
}

export default Modal
