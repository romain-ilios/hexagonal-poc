import { BehaviorSubject, Observable } from "rxjs";
import type {
  IAddTodoParams,
  ITodo,
  ITodoStore,
  ITodoUpdateParams,
} from "../domain/todo";

import { v4 as uuidv4 } from "uuid";

export class TodoStore implements ITodoStore {
  /**
   * The todos observable
   */
  public readonly todos$ = new BehaviorSubject<ITodo[]>([]);

  /**
   * The isLoading observable
   */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /**
   * The error observable
   */
  public readonly error$ = new BehaviorSubject<string | null>(null);

  /**
   * Get the todos observable
   * @returns the todos observable
   */
  getTodosObservable(): Observable<ITodo[]> {
    return this.todos$.asObservable();
  }

  /**
   * Get the todos snapshot
   * @returns the todos snapshot
   */
  getTodosSnapshot(): ITodo[] {
    return this.todos$.getValue();
  }

  /**
   * Get the isLoading observable
   * @returns the isLoading observable
   */
  getIsLoadingObservable(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  /**
   * Get the error observable
   * @returns the error observable
   */
  getErrorObservable(): Observable<string | null> {
    return this.error$.asObservable();
  }

  /**
   * Get the isLoading snapshot
   * @returns the isLoading snapshot
   */
  getIsLoadingSnapshot(): boolean {
    return this.isLoading$.getValue();
  }

  /**
   * Get the error snapshot
   * @returns the error snapshot
   */
  getErrorSnapshot(): string | null {
    return this.error$.getValue();
  }

  /**
   * Set the todos
   * @param todos the todos
   */
  setTodos(todos: ITodo[]): void {
    this.todos$.next(todos);
  }

  /**
   * Add a todo
   * @param params the todo params
   * @returns void
   */
  addTodo(params: IAddTodoParams): void {
    const newTodo = {
      id: uuidv4(),
      description: params.description,
      completed: false,
    };
    this.todos$.next([...this.todos$.getValue(), newTodo]);
  }

  /**
   * Update a todo
   * @param id the todo id
   * @param params the todo params
   * @returns void
   */
  updateTodo(id: string, params: ITodoUpdateParams): void {
    const todos = this.todos$.getValue();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...params } : todo
    );
    this.todos$.next(updatedTodos);
  }

  /**
   * Delete a todo
   * @param id the todo id
   * @returns void
   */
  deleteTodo(id: string): void {
    const todos = this.todos$.getValue();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodos);
  }

  /**
   * Set the error
   * @param error the error
   */
  setError(error: string): void {
    this.error$.next(error);
  }

  /**
   * Set the isLoading
   * @param isLoading the isLoading
   */
  setIsLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }
}
