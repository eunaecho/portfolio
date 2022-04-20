import React, { useRef, useState } from "react"


const ItemBlockStyle = ({hover}) => ({
    display: 'flex',
    borderRadius: '10px',
    border: '1px dashed black',
    alignItems: 'center',
    width: '85%',
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
    border: 'none',
    fontSize : '15px',
    color: '#495458',
    outline: 'none',
    width: 'inherit'
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
    const [readOnly, setReadOnly] = useState(true);
    const [hover, setHover] = useState(false);
    const ref = useRef();
    
    function checkItem() {
        console.log('checkItem');
    }
    
    function callModifyItem(e) {
        // readOnly일 경우
        if(readOnly){
            // readOnly 해제
            setReadOnly(false);
            //focus input으로
            ref.current.focus();

            // 수정버튼 -> 저장 버튼으로 바뀌게
            e.target.innerText='저장'
        } else {
            // 수정된 값 전달해서(input 전달x, item 자제를 전달해야함 그래야 index와 value를 받아서 setItem 할 때 편함) 저장하기
            props.modifyItem(props, ref.current.value);

            // 저장버튼 누르면, 다시 readOnly로
            setReadOnly(true);
            e.target.innerText='수정'
        }
    }
    
    function callRemoveItem() {
        props.removeItem(props.index, props.content);
    }
    
    return (
        <div style={ItemBlockStyle({hover})} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)}>
            <div id='btn-check' style={checkCircle} onClick={checkItem}>{props.index}</div>
            <input ref={ref} id='input-item' readOnly={readOnly} defaultValue={props.content} style={ItemText}></input>
            <button style={ModifyButton({hover})} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)} onClick={callModifyItem}>수정</button>
            <button style={RemoveButton({hover})} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)} onClick={callRemoveItem}>삭제</button>
        </div>
    );
}