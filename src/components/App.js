import React,{useState,useEffect} from "react";
import ListItem from "./ListItem";
import "./../styles/App.css";

function App() 
{
	const [items,setItems] = useState([]);
	const [newItem,setNewItem] = useState("");
	
	const setDoneHandler = (idx)=>{
		const todoId = items[idx]._id;
		var requestOptions = {
		  method: 'PUT',
		  redirect: 'follow'
		};
		
		fetch(`https://todo-app-backend-by-karthik.herokuapp.com/updateDone/${todoId}`, requestOptions)
		  .then(response => response.json())
		  .then(result => console.log(result))
		  .catch(error => console.log('error', error));
		  

	} 
	const addItem = () =>{
		
		var myHeaders = new Headers();
 		myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({"task":newItem,"done":false});

			var requestOptions = {
  			method: 'POST',
  			headers: myHeaders,
 			body: raw,
  			redirect: 'follow'
};

				fetch("https://todo-app-backend-by-karthik.herokuapp.com/createTodo", requestOptions)
  				.then(response => response.json())
  				.then(result => {
					  console.log(result)
					  items.push(result);
					  setItems([...items]);
        			  setNewItem("");
				  })
  				.catch(error => console.log('error', error));
				//setItems(items);
				
	}
	const newItemChanged = (evnt) =>{
		setNewItem(evnt.target.value);
	}
	const deleteHandler = (itemIdx) =>{
		const todoId = items[itemIdx]._id;
		var requestOptions = {
		  method: 'DELETE',
		  redirect: 'follow'
		};
		
		fetch(`https://todo-app-backend-by-karthik.herokuapp.com/todo/${todoId}`, requestOptions)
		  .then(response => response.text())
		  .then(result => console.log(result))
		  .catch(error => console.log('error', error));
		items.splice(itemIdx,1);
		setItems([...items]);
	}
	const editHandler = (editedValue,itemIdx) =>{
         const todoId = items[itemIdx]._id;

		 var myHeaders = new Headers();
		 myHeaders.append("Content-Type", "application/json");
		 
		 var raw = JSON.stringify({"task":editedValue});
		 
		 var requestOptions = {
		   method: 'PUT',
		   headers: myHeaders,
		   body: raw,
		   redirect: 'follow'
		 };
		 
		 fetch(`https://todo-app-backend-by-karthik.herokuapp.com/todo/${todoId}`, requestOptions)
		   .then(response => response.text())
		   .then(result => console.log(result))
		   .catch(error => console.log('error', error));
		items[itemIdx].task = editedValue;
		setItems([...items]);
	}
	useEffect(()=>{
			var requestOptions = {
  			method: 'GET',
  			redirect: 'follow'
		};

		fetch("https://todo-app-backend-by-karthik.herokuapp.com/todo", requestOptions)
  		.then(response => response.json())
  		.then(result => setItems(result))
  		.catch(error => console.log('error', error));
	},[])
	return (
	<div id="main">
	<div>
	<h1>Todo List By Karthik</h1>
    </div>
	<div className="toplevel">		
	<textarea id="task" onChange={newItemChanged} placeholder="New Item" value={newItem} style={{width:"500px"}}></textarea>
    <button id="btn" className="btn-warning" onClick={addItem} disabled={newItem.trim().length === 0}>Add Item</button>
    </div>
	{
      items.map((item,idx) =>(
		  <ListItem item={item}  key={`${item}_${idx}`} idx={idx} editHandler={editHandler} deleteHandler={deleteHandler} setDoneHandler={setDoneHandler}  />
	  ))
	}
	</div>
	);
}


export default App;
