import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import TodoInput from "./components/TodoInput";

function App() {
  return (
      <TodoTemplate>
        <TodoHead/>
        <TodoList/>
      </TodoTemplate>
    );
}

export default App;
