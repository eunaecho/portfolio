import { useCallback, useState } from "react";
import { TodoItem } from "./TodoItem";
import TodoInput from "./TodoInput";

const listStyle = {
    flex: 1,
    padding: '5px 5px',
    paddingBottom: '20px',
    overflowY: 'auto',
    height: '250px',
}

//item container
const TodoList = () => {
    const [items, setItems] = useState([]);

    //todo 리스트 받을 callback 함수
    const addTodoItem = (data) => {
        setItems((prevItems)=> 
            [...prevItems, data]
        );
        console.log(data);
    }

    const renderItem = useCallback((item, index) => {
        return (
            <TodoItem key={item} index={index} text={item} />
        )}, [])
    
    return (
        <div id='div-todolist' style={listStyle}>
            {items.map((v, i) => renderItem(v, i))}
            <TodoInput addTodoItem={addTodoItem}/>
        </div>
    );
}

export default TodoList;