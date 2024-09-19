import { createContext, useState} from "react";

export const Datacontext = createContext("")

export const Dataprovider = (props) => {


    const getLocalItems = ()=> {
        const list = localStorage.getItem('list')
    
        if (list) {
          return JSON.parse(localStorage.getItem('list'))
    
        }  else {
            return []
        }
      }
    const getStatus = ()=> {
        const list = localStorage.getItem('check')
    
        if (list) {
          return JSON.parse(localStorage.getItem('check'))
    
        }  else {
            return {}
        }
      }

    const [modal, setModal] = useState(false)
    const [userValue, setUserValue] = useState("")
    const [task, setTask] = useState(getLocalItems())
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null)
    const [currentTask, setCurrentTask] = useState(null);
    const [isChecked, setIsChecked] = useState(getStatus)

    
  

    return <Datacontext.Provider value={{ modal, setModal, userValue, setUserValue, task, setTask, isChecked, setIsChecked, toggleSubmit, setToggleSubmit, isEditItem, setIsEditItem, currentTask, setCurrentTask }}>
        {props.children}
    </Datacontext.Provider>
}