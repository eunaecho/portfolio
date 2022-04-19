import { useCallback, useState } from "react";
import { TodoItem } from "./TodoItem";
import TodoInput from "./TodoInput";

const listStyle = {
    flex: 1,
    padding: '5px 5px',
    paddingBottom: '20px',
    overflowY: 'auto',
    height: '380px',
}

//item container
const TodoList = () => {
    const [items, setItems] = useState([]);

    //todo 리스트 받을 callback 함수
    const addItem = (data) => {
        setItems((prevItems)=> 
            [...prevItems, data]
        );
    }

    //filter element로 바꾸니까 바로 삭제됨 
    //https://shin1303.tistory.com/entry/JavaScriptArray-%EB%B0%B0%EC%97%B4Array%EC%97%90%EC%84%9C-forEach-filter-map-reduce-%ED%8A%B9%EC%A7%95%EA%B3%BC-%EC%B0%A8%EC%9D%B4%EC%A0%90
    const removeItem = (i, v) => {
        setItems(items.filter((element ,index) => !((index===i)&&(element===v))));
    }   
    
    return (
        <div id='div-todolist' style={listStyle}>
            <TodoInput addItem={addItem}/>
            {items.map((v, i) => <TodoItem key={i} index={i} content={v} removeItem={removeItem}/>)}
        </div>
    );
}

export default TodoList;