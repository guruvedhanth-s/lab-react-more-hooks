import { useReducer, useRef } from "react";

const reducer = (initState,action) => {
    switch(action.type) {
            case "ADD_TASK" : {
                return [...initState,{id:Date.now(),text:action.payload,isVisible:true}]
            }
            case "TOGGLE_TASK" : {
                return initState.map((ele) => {
                    return ele.id == action.payload ? {...ele,isVisible:!ele.isVisible} : ele
                })
            }
        
        default :
        return initState

    }
}

const TaskList = () => {

    const inputRef = useRef(null)
    const [state,dispatch] = useReducer(reducer,[])

    const addTask = (e) => {
        dispatch({type:"ADD_TASK",payload:e.target.value})
    }

    const ToggleTask = (taskId) => {
        dispatch({type:"TOGGLE_TASK",payload:taskId})
    }

    const scrollTop = () => {
        window.scrollTo({top:0,behavior:"smooth"})
        inputRef.current.focus()
    }

    return(
        <>
            <div>
                <input type="text" ref={inputRef} onKeyDown={(e) => {
                    if(e.key == "Enter"){
                        addTask(e)
                    }
                }}/>
                <div id="task-container">
                    {
                        state.map((ele) => {
                            return (
                                <li id="task" key={ele.id}>
                                    { ele.isVisible ? <div>
                                       <h2>{ele.text}</h2>
                                        <div>
                                            <button onClick={()=>ToggleTask(ele.id)} >Toggle</button>
                                        </div>
                                    </div> : <div>
                                        <h2>The content is hidden</h2>
                                        <div>
                                            <button onClick={() => ToggleTask(ele.id)} >Toggle</button>
                                        </div>
                                    </div> }
                                </li>
                            )
                        })
                    }
                </div>
            </div>
            <button onClick={()=> scrollTop()} >Scroll to top</button>
        </>
    )

}

export default TaskList