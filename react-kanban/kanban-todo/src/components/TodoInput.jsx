import { createRef } from "react";

const inputStyle = {
    width: '290px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
}; 

const addTextStyle = {
    width: '150px',
    height: '25px',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '2px solid black',
    background: 'transparent',
    outline: 'none',
    autocomplete: 'false'
};

const addButtonStyle = {
    width: '50px',
    height: '30px',
    marginLeft: '5px',
    border: '2px solid white',
    borderRadius: '15px'
};

const TodoInput = (props) => {
    const ref = createRef();

    function callAddItem() {
        if ( ref.current.value!=='' ){
            props.addItem(ref.current.value);
            ref.current.value = '';
        }
    }

    return (
        <div id='div-todoinput' style={inputStyle}>
            <input ref={ref} id='inputItem' style={addTextStyle} autoComplete='false'></input>
            <button id='btnAddItem' style={addButtonStyle} onClick={callAddItem}>입력</button>
        </div>
    );
}

export default TodoInput;