import React, { useState } from "react"

const rmStyle = ({hover}) => ({
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: hover ? '#ff6b6b' : 'yellow',
    fontSize: '20px',
    cursor: 'pointer',
    display:'none'
})

const ItemBlockStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
}

const checkCircle = {
    width: '30px',
    height: '30px',
    borderRadius: '16px',
    border: '1px solid #ced4da',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    cursor: 'pointer'
}

const Text = {
    flex: 1,
    fontSize : '15px',
    color: '#495057',
}

export const TodoItem = ({text, rm}) => {
    const [ hover, setHover ] = useState(false);
    
    return (
        <div style={TodoItem}>
            <div style={checkCircle}> </div>
            <div style={Text}>{text}</div>
            <div style={rmStyle({hover})}
            onPointerOver={()=> setHover(true)}
            onPointerOut={()=> setHover(false)}>{rm}</div>
        </div>
    );
}

