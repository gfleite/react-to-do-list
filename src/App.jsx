import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Comprar mantimentos', done: false },
    { id: 2, text: 'Ir à academia', done: true },
  ])
  const [input, setInput] = useState('')

  const addTask = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTasks([...tasks, { id: Date.now(), text: trimmed, done: false }])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  const pending = tasks.filter(t => !t.done).length

  return (
    <div className="container">
      <header>
        <h1>Tarefas</h1>
        {pending > 0 && <span className="badge">{pending}</span>}
      </header>

      <div className="input-row">
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addTask} disabled={!input.trim()}>
          <PlusIcon />
        </button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty">Nenhuma tarefa por enquanto.</li>
        )}
        {tasks.map(task => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <button
              className="check-btn"
              onClick={() => toggleTask(task.id)}
              aria-label="Concluir tarefa"
            >
              <span className="circle">
                {task.done && <CheckIcon />}
              </span>
            </button>
            <span className="task-text">{task.text}</span>
            <button
              className="remove-btn"
              onClick={() => removeTask(task.id)}
              aria-label="Remover tarefa"
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>

      {tasks.some(t => t.done) && (
        <button
          className="clear-btn"
          onClick={() => setTasks(tasks.filter(t => !t.done))}
        >
          Limpar concluídas
        </button>
      )}
    </div>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default App
