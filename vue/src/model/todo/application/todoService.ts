import type {
  IAddTodoParams,
  ITodoRepository,
  ITodoService,
  ITodoStore,
  ITodoUpdateParams,
} from "../domain/todo";

export class TodoService implements ITodoService {
  constructor(
    private readonly todoRepository: ITodoRepository,
    private readonly todoStore: ITodoStore
  ) {}

  async getInitialTodos(): Promise<void> {
    this.todoStore.setIsLoading(true);
    try {
      const todos = await this.todoRepository.getTodos();
      this.todoStore.setTodos(todos);
    } catch (error) {
      this.todoStore.setError(error as string);
    } finally {
      this.todoStore.setIsLoading(false);
    }
  }

  async addTodo(params: IAddTodoParams): Promise<void> {
    const oldTodos = this.todoStore.getTodosSnapshot();

    try {
      this.todoStore.addTodo(params);
      this.saveTodos();
    } catch (error) {
      this.todoStore.setError(error as string);
      this.todoStore.setTodos(oldTodos);
    }
  }

  async updateTodo(id: string, params: ITodoUpdateParams): Promise<void> {
    const oldTodos = this.todoStore.getTodosSnapshot();

    try {
      this.todoStore.updateTodo(id, params);
      this.saveTodos();
    } catch (error) {
      this.todoStore.setError(error as string);
      this.todoStore.setTodos(oldTodos);
    }
  }

  async deleteTodo(id: string): Promise<void> {
    const oldTodos = this.todoStore.getTodosSnapshot();

    try {
      this.todoStore.deleteTodo(id);
      this.saveTodos();
    } catch (error) {
      this.todoStore.setError(error as string);
      this.todoStore.setTodos(oldTodos);
    }
  }

  async saveTodos(): Promise<void> {
    try {
      const todos = this.todoStore.getTodosSnapshot();
      await this.todoRepository.saveTodos(todos);
    } catch (error) {
      this.todoStore.setError(error as string);
    }
  }
}
