import React, { useState ,useEffect} from 'react'

function Todo() {

    // store data on local storage
    const getData = () =>{
        const data = JSON.parse(localStorage.getItem('list'));
        if(data){
            return JSON.parse(localStorage.getItem('list'));
        }
        else{
            return [];
        }
    }
    
    const [values,setValues]= useState("");
    const [Listing,setListing]= useState(getData());  //const [Listing,setListing]= useState([]); in case if you dont want local storage

    useEffect(() =>{
        localStorage.setItem('list', JSON.stringify(Listing));  // objects to string and storing in array format
    },[Listing])

    //add task 
    const addTask = () =>{
        if(!values){
            alert("Enter Task")
        }
        else{
        setListing([...Listing,{text:values, checked:false}])
        setValues("")
        }
    }

    //delete the task 
    const DeleteItem = (id) =>{
        const newArr = Listing.filter((val,ind)=>{
            return id !== ind 
        });
        setListing(newArr)
    }
    
    //clear all button function
    const DeleteAll = () =>{
        setListing([]);
    }

    // checkbox changes function 
    const handleTodo = (ind)=> {
        const newTodo = [...Listing]
        newTodo[ind].checked = !newTodo[ind].checked
        setListing(newTodo)
    }


    return (
        
        <div className='whole1'>
        <div className='whole'>
            
            <h2 className='heading'>To Do List:</h2>
            <input
            type="text"
            value={values}
            onChange={(e)=>{setValues(e.target.value)}}
            />
            <button onClick={addTask} className='addbut'>Add</button>
            <div>
                <ul>
                    {
                        Listing.map((val,ind)=>{
                            return <li key={ind} style={{display:"flex"}}>
                                <div className='list1'>
                                <input
                                type="checkbox"
                                checked={val.checked}
                                onChange={()=> handleTodo(ind)}
                                />
                                <span style={{marginRight:"10px",textDecoration: val.checked ? "line-through" : "none"}}>
                                    {val.text}
                                </span><br/><br/>
                                <button onClick={()=>DeleteItem(ind)} className='delbut'>delete</button>
                                </div>
                                <br/>
                                </li>
                        })
                    }
                    <button className='clearbut' onClick={DeleteAll}>Clear All</button>
                </ul>
            </div>
        </div>
        </div>
        
        
    )
}

export default Todo