import React, { useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { ItemType } from "./ItemType"


const ItemBlockStyle = ({hover}) => ({
    display: 'flex',
    borderRadius: '10px',
    border: '1px dashed black',
    alignItems: 'center',
    padding: '5px',
    margin: '5px',
    background: 'white',
})

const checkCircle = {
    width: '10px',
    height: '10px',
    borderRadius: '15px',
    border: '1px solid gray',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
    marginLeft: '5px',
    cursor: 'pointer'
}

const ItemText = {
    flex: 1,
    fontSize : '15px',
    color: '#495458',
}

const RemoveButton = ({hover}) => ({
    display:'flex',
    border: 'none',
    background: 'transparent',
    alignText: 'center',
    fontSize: '12px',
    cursor: 'pointer',
    value: 'remove',
    display: hover ? 'initial' : 'none' ,
})

export const TodoItem = ({text}) => {
    const [hover, setHover] = useState(false);

    return (
        <div style={ItemBlockStyle({hover})} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)}>
            <div style={checkCircle}> </div>
            <div style={ItemText}>{text}</div>
            <button style={RemoveButton({hover})} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)}>삭제</button>
        </div>
    );
}

