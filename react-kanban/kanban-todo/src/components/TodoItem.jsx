import React, { useState } from "react"
import { useDrag } from "react-dnd"
import { ItemType } from "./ItemType"

/***
 const RemoveStyle = ({hover}) => ({
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: hover ? '#ff6b6b' : 'yellow',
    fontSize: '20px',
    cursor: 'pointer',
    display: hover ? 'initial' : 'none',
    text:'remove'
})
***/

const ItemBlockStyle = {
    display: 'flex',
    borderRadius: '10px',
    border: '1px solid white',
    alignItems: 'center',
    padding: '5px',
    margin: '5px'
}

const checkCircle = {
    width: '15px',
    height: '15px',
    borderRadius: '15px',
    border: '1px solid #ced4da',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    cursor: 'pointer'
}

const ItemText = {
    flex: 1,
    fontSize : '15px',
    color: '#495458',
}

export const TodoItem = ({text}) => {
    const [ {isDragging}, drag ] = useDrag(() => {
        type: ItemType.CARD 
        item: () => {
            return {  }
        }
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const opacity = isDragging ? 0 : 1 
    drag()
    
    return (
        <div style={ItemBlockStyle}>
            <div style={checkCircle}> </div>
            <div style={ItemText}>{text}</div>
        </div>
    );
}

