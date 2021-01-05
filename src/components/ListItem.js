import React,{useState} from "react";
import "./../styles/App.css";

function ListItem(props) 
{
    const [editedItem,setEditedItem] = useState(props.item.task);
    const [editMode,setEditMode] = useState(false);
    const [doneMode,setDoneMode] = useState(false);
    
    const editedItemChanged = (evnt) =>{
		setEditedItem(evnt.target.value);
    }
    const saveEditedItem = () =>{
        props.editHandler(editedItem,props.idx);
        setEditMode(false)

    }
    
	return (
	<div className="list">
        {props.item.done || doneMode ?
        <div className="todos">
        {props.item.task}
        <span className="float-buttons">
        <button className="delete btn-danger" onClick={() => props.deleteHandler(props.idx)}>delete</button>
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2 tick" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg></span>
        </span>
        </div>
        :
        <>
        {editMode ?
        (<div className="todos-save">
        <textarea className="editTask" style={{width:"400px"}} onChange={editedItemChanged} placeholder="Edit Task" value={editedItem}></textarea>
        <button className="saveTask btn-success" onClick={saveEditedItem} disabled={editedItem.trim().length ===0}>Save Task</button>
        </div>) : <div className="todos">
         {props.item.task}
         <span className="float-buttons">
         <button className="edit btn-success" onClick={ ()=> setEditMode(true)}>edit</button>
         <button className="delete btn-danger" onClick={() => props.deleteHandler(props.idx)}>delete</button>
         <button className="done btn-primary" onClick={()=>{
             props.setDoneHandler(props.idx);
             setDoneMode(true);
             }}>Done</button>
         </span>
        </div>
        }
        </>
    }
    </div>
	);
}


export default ListItem;
