import { onMounted, onUnmounted, ref } from "vue";
import { todoService, todoStore } from "../../../serviceLocator";
import type { ITodo, ITodoUpdateParams } from "../../domain/todo";

export function useTodos() {
  const todos = ref<ITodo[]>(todoStore.getTodosSnapshot());
  const isLoading = ref<boolean>(todoStore.getIsLoadingSnapshot());
  const error = ref<string | null>(todoStore.getErrorSnapshot());

  let todosSubscription: any;
  let isLoadingSubscription: any;
  let errorSubscription: any;

  onMounted(() => {
    todosSubscription = todoStore
      .getTodosObservable()
      .subscribe((newTodos: ITodo[]) => {
        todos.value = newTodos;
      });

    isLoadingSubscription = todoStore
      .getIsLoadingObservable()
      .subscribe((newIsLoading: boolean) => {
        isLoading.value = newIsLoading;
      });

    errorSubscription = todoStore
      .getErrorObservable()
      .subscribe((newError: string | null) => {
        error.value = newError;
      });

    todoService.getInitialTodos();
  });

  onUnmounted(() => {
    todosSubscription?.unsubscribe();
    isLoadingSubscription?.unsubscribe();
    errorSubscription?.unsubscribe();
  });

  function addTodo(description: string) {
    todoService.addTodo({ description });
  }

  function updateTodo(id: string, params: ITodoUpdateParams) {
    todoService.updateTodo(id, params);
  }

  function deleteTodo(id: string) {
    todoService.deleteTodo(id);
  }

  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
