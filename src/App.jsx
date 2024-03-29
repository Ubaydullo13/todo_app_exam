import { useRef } from "react";
import "./App.css";
import addBtn from "./assets/addBtn.svg";
import check from "./assets/Check.svg";
import trash from "./assets/TrashSimple.svg";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, completed } from "./redux/todoSlice";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);
  const inputRef = useRef();
 console.log(todos);
  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value !== "") {
      const todo = {
        id: Date.now(),
        text: inputRef.current.value,
        completed: false,
      };
      dispatch(addTodo(todo));
      inputRef.current.value = "";
    }

  }
function handleDelete(id) {
    dispatch(deleteTodo(id));
  }
  function handleCompleted(id) {
    dispatch(completed(id));
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a new task" ref={inputRef} />
        <button className="addBtn">
          <img src={addBtn} alt="Button" />
        </button>
      </form>
      <p className="tasks_title">Tasks to do - {todos.length}</p>
      <div className="tasks">
              <ul className="tasks_lists">
      {todos.length > 0 &&
        todos.map((todo, index) => {
          // console.log(todo.id);
          return (
            
                <li key={index} className="task_list">
                  <span>{todo.text}</span>
                  <div className="task_actions">
                    <button onClick={() => handleCompleted(todo.id)} className="task_check">
                      <img src={check} alt="check" />
                    </button>
                    <button onClick={() => handleDelete(todo.id)} className="task_trash">
                      <img src={trash} alt="trash" />
                    </button>
                  </div>
                </li>
              
          );
        })}
        </ul>
            </div>
    </div>
  );
}

export default App;
