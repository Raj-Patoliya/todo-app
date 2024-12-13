import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/navbar/Navbar";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [showFinished, setShowFinished] = useState(true);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  useEffect(() => {
    let str = localStorage.getItem("todos");
    if (str) {
      let todos = JSON.parse(str);
      setTodos(todos);
    }
  }, []);
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let todo;
    todos.map((item) => {
      if (item.id == id) {
        todo = item;
      }
    });
    setTodo(todo.todo);
    todos.splice(
      todos.findIndex((a) => a.id === id),
      1
    );
    setTodos([...todos]);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    todos.splice(
      todos.findIndex((a) => a.id === id),
      1
    );
    setTodos([...todos]);
    saveToLS();
  };
  const handleFinish = (e) => {
    todos.filter((todo) => {
      if (todo.id == e.target.id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos([...todos]);
    saveToLS();
  };
  const handleShowFinish = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-violet-400 rounded-xl p-5 min-[80vh] w-1/2">
        <h1 className="font-bold text-center text-xl">
          iTask Manage your todos at a place
        </h1>
        <div className="addTodo flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="w-full rounded-md p-2"
          />
          <button
            disabled={todo.length <= 1}
            onClick={handleAdd}
            className="bg-violet-800 disabled:bg-violet-600 hover:bg-violet-950 py-1 p-3 text-sm font-bold text-white rounded-md"
          >
            Save
          </button>
        </div>
        <input
          type="checkbox"
          name=""
          checked={showFinished}
          onChange={handleShowFinish}
        />{" "}
        Show finished
        <h1 className="text-lg font-bold">Your todos</h1>
        <div className="todos">
          {todos.length == 0 ? (
            <div className="todo flex justify-between w-1/2 bg-violet-200 gap-1 rounded-lg m-2 p-4">
              <div className={`text `}>
                <h2>No todos....</h2>
              </div>
            </div>
          ) : (
            todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex justify-between w-1/3 bg-violet-200 gap-1 rounded-lg m-2 p-4"
                  >
                    <div className="flex gap-5">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        name=""
                        id={item.id}
                        onChange={handleFinish}
                      />
                      <div
                        className={`text ${
                          item.isCompleted ? "line-through" : ""
                        }`}
                      >
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex h-full">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
