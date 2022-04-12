import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

function App() {
  return (
      <TodoTemplate>
        <TodoHead/>
        <TodoList/>
      </TodoTemplate>
    );
}

export default App;
