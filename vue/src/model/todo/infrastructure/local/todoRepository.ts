import type { ITodo, ITodoRepository } from "../../domain/todo";

/**
 * Local storage implementation of ITodoRepository
 * Stores todos in the browser's localStorage
 */
export class LocalTodoRepository implements ITodoRepository {
  private readonly STORAGE_KEY = "todo:items";

  getTodos(): Promise<ITodo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const todos = localStorage.getItem(this.STORAGE_KEY);
        resolve(todos ? JSON.parse(todos) : []);
      }, 1000);
    });
  }

  saveTodos(todos: ITodo[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
        resolve();
      }, 500);
    });
  }
}
