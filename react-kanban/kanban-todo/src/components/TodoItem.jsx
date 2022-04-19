import React, { useRef, useState } from "react"


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
    width: '13px',
    height: '13px',
    borderRadius: '5px',
    border: '1px solid gray',
    fontSize: '10px',
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
    border: 'none',
    background: 'transparent',
    color: 'red',
    alignText: 'center',
    fontSize: '12px',
    cursor: 'pointer',
    value: 'remove',
    display: hover ? 'initial' : 'none' ,
});

const ModifyButton = ({hover}) => ({
    border: 'none',
    background: 'transparent',
    alignText: 'center',
    fontSize: '12px',
    cursor: 'pointer',
    value: 'remove',
    display: hover ? 'initial' : 'none' ,
});

export const TodoItem = (props) => {
    const [hover, setHover] = useState(false);
    
    function checkItem() {
        console.log('checkItem');
    }
    
    function callModifyItem() {
        console.log('callModifyItem');
    }
    
    function callRemoveItem() {
        props.removeItem(props.index, props.content);
    }
    
    return (
        <div style={ItemBlockStyle({hover})} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)}>
            <div id='btn-check' style={checkCircle} onClick={checkItem}>{props.index}</div>
            <div style={ItemText}>{props.content}</div>
            <button style={ModifyButton({hover})} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)} onClick={callModifyItem}>수정</button>
            <button style={RemoveButton({hover})} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)} onClick={callRemoveItem}>삭제</button>
        </div>
    );
}