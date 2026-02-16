import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../features/todo/todoSlice";
import editLogo from "../assits/icons8-edit-72.png";
import saveIcon from "../assits/icons8-save-96.png";
import { useState } from "react";

function Todos() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleEdit = (todo) => {
    if (editingId === todo.id) {
      // Save mode
      if (editingTitle.trim()) {
        dispatch(editTodo({ id: todo.id, title: editingTitle }));
      }
      setEditingId(null);
      setEditingTitle("");
    } else {
      // Edit mode
      setEditingId(todo.id);
      setEditingTitle(todo.title);
    }
  };

  return (
    <>
      <div className="text-white text-2xl font-bold p-4 bg-gray-800 rounded-lg shadow-md">My Todo List</div>
      <ul className="list-none mt-4">
        {todos.map((todo) => (
          <li
            className="mt-2 flex justify-between items-center bg-gray-700 px-4 py-3 rounded-lg"
            key={todo.id}
          >
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={() => {
                if (todo && todo.id) {
                  dispatch(toggleTodo(todo.id));
                }
              }}
            />
            {editingId === todo.id && todo.completed != true ? (
              <input
                type="text"
                className="text-black bg-white px-2 py-1 rounded focus:outline-none"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                autoFocus
              />
            ) : (
              <div className="text-white text-lg">{todo.title}</div>
            )}
            <div className="gap-4 flex flex-row">
              <button
                onClick={() => handleEdit(todo)}
                className="text-white bg-blue-600 border-0 py-1 px-4 focus:outline-none hover:bg-blue-700 rounded-lg transition-colors"
              >
                <img src={editingId === todo.id ? saveIcon : editLogo} alt={editingId === todo.id ? "Save" : "Edit"} className="w-6 h-6" />
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-white bg-red-600 border-0 py-1 px-4 focus:outline-none hover:bg-red-700 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
