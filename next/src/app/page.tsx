"use client";

import { useTodosReact, type ITodo } from "@hexanext/core";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [description, setDescription] = useState("");
  const { todos, isLoading, addTodo, updateTodo, deleteTodo } = useTodosReact();

  function handleAddTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addTodo(description);
    setDescription("");
  }

  function handleDeleteTodo(id: string) {
    deleteTodo(id);
  }

  function handleToggleTodo(id: string, completed: boolean) {
    updateTodo(id, { completed });
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Todo List</h1>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a new todo..."
          />
        </form>
        {isLoading && <p>Loading...</p>}
        <ul>
          {todos.map((todo: ITodo) => (
            <li
              key={todo.id}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id, !todo.completed)}
                />
                <p>{todo.description}</p>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
