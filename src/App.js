import React, { useContext } from 'react';
import './App.css';
import Task from './Mycomponent/Task';
import Modal from './Mycomponent/Modal';
import { Datacontext } from './Context/Context';

function App() {

  
  
  const Data = useContext(Datacontext)
  
  return (
    <div className='main'>
      <h1 >Todo List</h1>

      <div className='todoBox' style={{ margin: "0 auto" }}>

        {Data.modal && <Modal />}
        <Task />
      </div>
    </div>
  );
}

export default App;


