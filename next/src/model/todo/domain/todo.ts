import { Observable } from "rxjs";

export interface ITodo {
  id: string;
  description: string;
  completed: boolean;
}

export interface IAddTodoParams {
  description: string;
}

export interface ITodoUpdateParams {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ITodoRepository {
  getTodos(): Promise<ITodo[]>;
  saveTodos(todos: ITodo[]): Promise<void>;
}

export interface ITodoService {
  getInitialTodos(): Promise<void>;
  saveTodos(todos: ITodo[]): void;
  addTodo(params: IAddTodoParams): void;
  updateTodo(id: string, params: ITodoUpdateParams): void;
  deleteTodo(id: string): void;
}

export interface ITodoStore {
  readonly todos$: Observable<ITodo[]>;
  readonly isLoading$: Observable<boolean>;
  readonly error$: Observable<string | null>;
  getTodosObservable(): Observable<ITodo[]>;
  getTodosSnapshot(): ITodo[];
  getIsLoadingObservable(): Observable<boolean>;
  getIsLoadingSnapshot(): boolean;
  getErrorObservable(): Observable<string | null>;
  getErrorSnapshot(): string | null;
  setError(error: string): void;
  setIsLoading(isLoading: boolean): void;
  setTodos(todos: ITodo[]): void;
  addTodo(params: IAddTodoParams): void;
  updateTodo(id: string, params: ITodoUpdateParams): void;
  deleteTodo(id: string): void;
}
