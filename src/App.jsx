import { useRef} from "react";
import "./App.css";
import addBtn from "./assets/addBtn.svg";
import check from "./assets/Check.svg";
import trash from "./assets/TrashSimple.svg";
import back from "./assets/arrow-go-back-fill.svg"
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, toggleCompleted } from "./redux/todoSlice";

function App() {
  const inputRef = useRef();
  let todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const completedTodos = todos.filter((todo) => todo.completed === true).length;
  const pendingTodos = todos.length - completedTodos;

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
    dispatch(toggleCompleted(id));
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a new task" ref={inputRef} />
        <button className="addBtn">
          <img src={addBtn} alt="Button" />
        </button>
      </form>
      <p className={pendingTodos == 0 ? "none" : "tasks_title_undone"}>Tasks to do - {pendingTodos}</p>
      <div className="tasks">
              <ul className="tasks_lists">
      {todos.length > 0 &&
        todos.map((todo, index) => {
          if(todo.completed == false){
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
          }
        })}
        </ul>
        <p className={completedTodos == 0 ? "none" : "tasks_title_done"}>Done- {completedTodos}</p>
            <ul className="tasks_lists">
              {
                todos.length > 0 && 
                todos.map((todo, index) => {
                  if(todo.completed === true) {
                    return (
                      <li key={index} className="task_list">
                        <span className="task_completed">{todo.text}</span>
                          <button onClick={() => handleCompleted(todo.id)} className="task_check">
                            <img src={back} alt="check" />
                          </button>
                      </li>
                    )
                  }
                })
              }
            </ul>
            </div>
            
    </div>
  );
}

export default App;
