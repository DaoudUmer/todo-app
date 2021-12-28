import React, { useState, useEffect } from 'react'
import "./style.css";

const getLocalData = () => {
    const items = localStorage.getItem("TodoList");

    if(items){
        return JSON.parse(items);
    }else{
        return [];
    }
}

const Todo = () => {
    const   initialState = "";
    const [ inputData, setInputData ] = useState( initialState );
    const [ items, setItems ] = useState( getLocalData );
    const [ isEditedItem, setIsEditedItem ] = useState("");
    const [ toggleButton, setToggleButton ] = useState(false);

    const addItem = () => {
        if( !inputData ){
            alert( "Please input Something" );
        }
        else if(inputData && toggleButton){
            setItems(
                items.map(
                    (curElem) => {
                        if(curElem.id === isEditedItem){
                            return{...curElem, name:inputData}
                        }
                    }
                )
            );
        setInputData([]);
        setIsEditedItem(null);
        setToggleButton(false);
        }
        
        else{
            const NewInputData = {
                id: new Date().getTime().toString(),
                name: inputData 
            }
            setItems( [ ...items,NewInputData ] );
            setInputData("");
        }
    }
    const editItem = (index) => {
        const edited_todo_item = items.find((curElem) => {
            return curElem.id === index;
        })
        setInputData(edited_todo_item.name);
        setIsEditedItem(index);
        setToggleButton(true);

    }
    const deleteItem = ( id ) => {
        const updatedItemsList = items.filter( ( curElem ) => {
            return curElem.id !== id;
        } )
        setItems( updatedItemsList );
    }
    const removeAll = () => {
        setItems([]);
    }
    useEffect(() => {
        localStorage.setItem("TodoList", JSON.stringify(items))
    }, [items])
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='add Item' className='form-control' value={ inputData } onChange={ ( e ) => setInputData( e.target.value ) } />
                        {
                            toggleButton ? 
                            <i className="far fa-edit add-btn" onClick={ addItem } ></i>
                            :
                            <i className="fa fa-plus add-btn" onClick={ addItem } ></i>
                        }
                    </div>
                    <div className="showItems">
                        {
                            items.map( ( curElem ) => {
                                return (
                                    <div className="eachItem" key={ curElem.id }>
                                        <h3>{ curElem.name }</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                            <i className="fa fa-trash-alt add-btn" onClick={ () => deleteItem( curElem.id ) } ></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo

