import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function generateRandomNumberID() {
    let isEqual: boolean = false;

    do {
      var number: number = Math.random() * 10;
      tasks.filter((task) => task.id === number).length !== 0
        ? (isEqual = true)
        : (isEqual = false);
    } while (isEqual);

    return number;
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (!newTaskTitle) return;

    const newTask: Task = {
      id: generateRandomNumberID(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((tasks) => [...tasks, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newList = tasks.map(
      (task): Task =>
        task.id === id
          ? {
              ...task,
              isComplete: !task.isComplete,
            }
          : task
    );

    setTasks(newList);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newList = tasks.filter((task) => task.id !== id);

    setTasks(newList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
