import { Observable, BehaviorSubject } from 'rxjs';
import * as vue from 'vue';

interface ITodo {
    id: string;
    description: string;
    completed: boolean;
}
interface IAddTodoParams {
    description: string;
}
interface ITodoUpdateParams {
    title?: string;
    description?: string;
    completed?: boolean;
}
interface ITodoRepository {
    getTodos(): Promise<ITodo[]>;
    saveTodos(todos: ITodo[]): Promise<void>;
}
interface ITodoService {
    getInitialTodos(): Promise<void>;
    saveTodos(todos: ITodo[]): void;
    addTodo(params: IAddTodoParams): void;
    updateTodo(id: string, params: ITodoUpdateParams): void;
    deleteTodo(id: string): void;
}
interface ITodoStore {
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

/**
 * Local storage implementation of ITodoRepository
 * Stores todos in the browser's localStorage
 */
declare class LocalTodoRepository implements ITodoRepository {
    private readonly STORAGE_KEY;
    getTodos(): Promise<ITodo[]>;
    saveTodos(todos: ITodo[]): Promise<void>;
}

declare class TodoService implements ITodoService {
    private readonly todoRepository;
    private readonly todoStore;
    constructor(todoRepository: ITodoRepository, todoStore: ITodoStore);
    getInitialTodos(): Promise<void>;
    addTodo(params: IAddTodoParams): Promise<void>;
    updateTodo(id: string, params: ITodoUpdateParams): Promise<void>;
    deleteTodo(id: string): Promise<void>;
    saveTodos(): Promise<void>;
}

declare class TodoStore implements ITodoStore {
    /**
     * The todos observable
     */
    readonly todos$: BehaviorSubject<ITodo[]>;
    /**
     * The isLoading observable
     */
    readonly isLoading$: BehaviorSubject<boolean>;
    /**
     * The error observable
     */
    readonly error$: BehaviorSubject<string | null>;
    /**
     * Get the todos observable
     * @returns the todos observable
     */
    getTodosObservable(): Observable<ITodo[]>;
    /**
     * Get the todos snapshot
     * @returns the todos snapshot
     */
    getTodosSnapshot(): ITodo[];
    /**
     * Get the isLoading observable
     * @returns the isLoading observable
     */
    getIsLoadingObservable(): Observable<boolean>;
    /**
     * Get the error observable
     * @returns the error observable
     */
    getErrorObservable(): Observable<string | null>;
    /**
     * Get the isLoading snapshot
     * @returns the isLoading snapshot
     */
    getIsLoadingSnapshot(): boolean;
    /**
     * Get the error snapshot
     * @returns the error snapshot
     */
    getErrorSnapshot(): string | null;
    /**
     * Set the todos
     * @param todos the todos
     */
    setTodos(todos: ITodo[]): void;
    /**
     * Add a todo
     * @param params the todo params
     * @returns void
     */
    addTodo(params: IAddTodoParams): void;
    /**
     * Update a todo
     * @param id the todo id
     * @param params the todo params
     * @returns void
     */
    updateTodo(id: string, params: ITodoUpdateParams): void;
    /**
     * Delete a todo
     * @param id the todo id
     * @returns void
     */
    deleteTodo(id: string): void;
    /**
     * Set the error
     * @param error the error
     */
    setError(error: string): void;
    /**
     * Set the isLoading
     * @param isLoading the isLoading
     */
    setIsLoading(isLoading: boolean): void;
}

declare const todoStore: TodoStore;
declare const todoRepository: LocalTodoRepository;
declare const todoService: TodoService;

declare function useTodos$1(): {
    todos: ITodo[];
    isLoading: boolean;
    error: string | null;
    addTodo: (description: string) => void;
    updateTodo: (id: string, params: ITodoUpdateParams) => void;
    deleteTodo: (id: string) => void;
};

declare function useTodos(): {
    todos: vue.Ref<{
        id: string;
        description: string;
        completed: boolean;
    }[], ITodo[] | {
        id: string;
        description: string;
        completed: boolean;
    }[]>;
    isLoading: vue.Ref<boolean, boolean>;
    error: vue.Ref<string | null, string | null>;
    addTodo: (description: string) => void;
    updateTodo: (id: string, params: ITodoUpdateParams) => void;
    deleteTodo: (id: string) => void;
};

export { type IAddTodoParams, type ITodo, type ITodoRepository, type ITodoService, type ITodoStore, type ITodoUpdateParams, TodoService, TodoStore, todoRepository, todoService, todoStore, useTodos$1 as useTodosReact, useTodos as useTodosVue };
