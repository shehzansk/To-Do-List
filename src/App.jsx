import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { 
        id: Date.now(), 
        text: inputValue, 
        completed: false 
      }])
      setInputValue('')
    }
  }

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <>
      <div className="todo-container">
        <h1>Task Master</h1>
        
        <div className="todo-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
          />
          <button onClick={handleAddTodo}>Add Task</button>
        </div>
        
        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-message">Your task list is empty. Start adding tasks!</li>
          ) : (
            todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <div className="todo-content">
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                  </div>
                  <span className={todo.completed ? 'completed' : ''}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="footer">
        made with <span className="heart">❤</span> by Shehzan Sheikh
      </div>
    </>
  )
}

export default App