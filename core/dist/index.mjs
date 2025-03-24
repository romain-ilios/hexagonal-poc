import { BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';
import { useState, useEffect } from 'react';
import { ref, onMounted, onUnmounted } from 'vue';

// todo/infrastructure/local/todoRepository.ts
var LocalTodoRepository = class {
  constructor() {
    this.STORAGE_KEY = "todo:items";
  }
  getTodos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const todos = localStorage.getItem(this.STORAGE_KEY);
        resolve(todos ? JSON.parse(todos) : []);
      }, 1e3);
    });
  }
  saveTodos(todos) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
        resolve();
      }, 500);
    });
  }
};

// todo/application/todoService.ts
var TodoService = class {
  constructor(todoRepository2, todoStore2) {
    this.todoRepository = todoRepository2;
    this.todoStore = todoStore2;
  }
  async getInitialTodos() {
    this.todoStore.setIsLoading(true);
    try {
      const todos = await this.todoRepository.getTodos();
      this.todoStore.setTodos(todos);
    } catch (error) {
      this.todoStore.setError(error);
    } finally {
      this.todoStore.setIsLoading(false);
    }
  }
  async addTodo(params) {
    const oldTodos = this.todoStore.getTodosSnapshot();
    try {
      this.todoStore.addTodo(params);
      this.saveTodos();
    } catch (error) {
      this.todoStore.setError(error);
      this.todoStore.setTodos(oldTodos);
    }
  }
  async updateTodo(id, params) {
    const oldTodos = this.todoStore.getTodosSnapshot();
    try {
      this.todoStore.updateTodo(id, params);
      this.saveTodos();
    } catch (error) {
      this.todoStore.setError(error);
      this.todoStore.setTodos(oldTodos);
    }
  }
  async deleteTodo(id) {
    const oldTodos = this.todoStore.getTodosSnapshot();
    try {
      this.todoStore.deleteTodo(id);
      this.saveTodos();
    } catch (error) {
      this.todoStore.setError(error);
      this.todoStore.setTodos(oldTodos);
    }
  }
  async saveTodos() {
    try {
      const todos = this.todoStore.getTodosSnapshot();
      await this.todoRepository.saveTodos(todos);
    } catch (error) {
      this.todoStore.setError(error);
    }
  }
};
var TodoStore = class {
  constructor() {
    /**
     * The todos observable
     */
    this.todos$ = new BehaviorSubject([]);
    /**
     * The isLoading observable
     */
    this.isLoading$ = new BehaviorSubject(false);
    /**
     * The error observable
     */
    this.error$ = new BehaviorSubject(null);
  }
  /**
   * Get the todos observable
   * @returns the todos observable
   */
  getTodosObservable() {
    return this.todos$.asObservable();
  }
  /**
   * Get the todos snapshot
   * @returns the todos snapshot
   */
  getTodosSnapshot() {
    return this.todos$.getValue();
  }
  /**
   * Get the isLoading observable
   * @returns the isLoading observable
   */
  getIsLoadingObservable() {
    return this.isLoading$.asObservable();
  }
  /**
   * Get the error observable
   * @returns the error observable
   */
  getErrorObservable() {
    return this.error$.asObservable();
  }
  /**
   * Get the isLoading snapshot
   * @returns the isLoading snapshot
   */
  getIsLoadingSnapshot() {
    return this.isLoading$.getValue();
  }
  /**
   * Get the error snapshot
   * @returns the error snapshot
   */
  getErrorSnapshot() {
    return this.error$.getValue();
  }
  /**
   * Set the todos
   * @param todos the todos
   */
  setTodos(todos) {
    this.todos$.next(todos);
  }
  /**
   * Add a todo
   * @param params the todo params
   * @returns void
   */
  addTodo(params) {
    const newTodo = {
      id: v4(),
      description: params.description,
      completed: false
    };
    this.todos$.next([...this.todos$.getValue(), newTodo]);
  }
  /**
   * Update a todo
   * @param id the todo id
   * @param params the todo params
   * @returns void
   */
  updateTodo(id, params) {
    const todos = this.todos$.getValue();
    const updatedTodos = todos.map(
      (todo) => todo.id === id ? { ...todo, ...params } : todo
    );
    this.todos$.next(updatedTodos);
  }
  /**
   * Delete a todo
   * @param id the todo id
   * @returns void
   */
  deleteTodo(id) {
    const todos = this.todos$.getValue();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodos);
  }
  /**
   * Set the error
   * @param error the error
   */
  setError(error) {
    this.error$.next(error);
  }
  /**
   * Set the isLoading
   * @param isLoading the isLoading
   */
  setIsLoading(isLoading) {
    this.isLoading$.next(isLoading);
  }
};

// serviceLocator.ts
var todoStore = new TodoStore();
var todoRepository = new LocalTodoRepository();
var todoService = new TodoService(todoRepository, todoStore);
function useTodos() {
  const [todos, setTodos] = useState(todoStore.getTodosSnapshot());
  const [isLoading, setIsLoading] = useState(
    todoStore.getIsLoadingSnapshot()
  );
  const [error, setError] = useState(
    todoStore.getErrorSnapshot()
  );
  useEffect(() => {
    const subscription = todoStore.getTodosObservable().subscribe(setTodos);
    const isLoadingSubscription = todoStore.getIsLoadingObservable().subscribe(setIsLoading);
    const errorSubscription = todoStore.getErrorObservable().subscribe(setError);
    todoService.getInitialTodos();
    return () => {
      subscription.unsubscribe();
      isLoadingSubscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, []);
  function addTodo(description) {
    todoService.addTodo({ description });
  }
  function updateTodo(id, params) {
    todoService.updateTodo(id, params);
  }
  function deleteTodo(id) {
    todoService.deleteTodo(id);
  }
  return { todos, isLoading, error, addTodo, updateTodo, deleteTodo };
}
function useTodos2() {
  const todos = ref(todoStore.getTodosSnapshot());
  const isLoading = ref(todoStore.getIsLoadingSnapshot());
  const error = ref(todoStore.getErrorSnapshot());
  let todosSubscription;
  let isLoadingSubscription;
  let errorSubscription;
  onMounted(() => {
    todosSubscription = todoStore.getTodosObservable().subscribe((newTodos) => {
      todos.value = newTodos;
    });
    isLoadingSubscription = todoStore.getIsLoadingObservable().subscribe((newIsLoading) => {
      isLoading.value = newIsLoading;
    });
    errorSubscription = todoStore.getErrorObservable().subscribe((newError) => {
      error.value = newError;
    });
    todoService.getInitialTodos();
  });
  onUnmounted(() => {
    todosSubscription?.unsubscribe();
    isLoadingSubscription?.unsubscribe();
    errorSubscription?.unsubscribe();
  });
  function addTodo(description) {
    todoService.addTodo({ description });
  }
  function updateTodo(id, params) {
    todoService.updateTodo(id, params);
  }
  function deleteTodo(id) {
    todoService.deleteTodo(id);
  }
  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo
  };
}

export { TodoService, TodoStore, todoRepository, todoService, todoStore, useTodos as useTodosReact, useTodos2 as useTodosVue };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map