import { createRef } from "react";

const inputStyle = {
    display: 'flex',
    width: '290px',
    position: 'absolute',
    bottom: '15px',
    justifyContent: 'center'
}; 

const addTextStyle = {
    width: '180px',
    height: '25px',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '2px solid gray',
    background: 'transparent',
    outline: 'none'
};

const addButtonStyle = {
    width: '50px',
    height: '30px',
    marginLeft: '5px',
    borderRadius: '10px'
};

const TodoInput = (props) => {
    const ref = createRef();

    function callAddTodoItem() {
        if ( ref.current.value!=null ){
            props.addTodoItem(ref.current.value);
            ref.current.value = '';
        }
    }

    return (
        <div id='div-todoinput' style={inputStyle}>
            <input ref={ref} id='inputItem' style={addTextStyle} type='text' hint='add to here'></input>
            <button id='btnAddItem' style={addButtonStyle} onClick={callAddTodoItem}> 입력 </button>
        </div>
    );
}

export default TodoInput;