import { TodoItem } from "./TodoItem";

const listStyle = {
    flex: 1,
    padding: '10px 10px',
    paddingBottom: '20px',
    overflowY: 'auto',
}

const TodoList = () => {
    return (
        <div style={listStyle}>
            <TodoItem text={'1 item'}></TodoItem>
            <TodoItem text={'2 item'}></TodoItem>
            <TodoItem text={'3 item'}></TodoItem>
            <TodoItem text={'4 item'}></TodoItem>
            <TodoItem text={'5 item'}></TodoItem>
        </div>
    );
}

export default TodoList;