import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

function App() {
  const headList = ['TO DO LIST', 'DONE'];

  return (
      headList.map((v, i) => (
          <TodoTemplate key={i+v} index={i}>
          <TodoHead title={v}/>
          <TodoList index={i}/>
          </TodoTemplate>
      ))
    );
}

export default App;
