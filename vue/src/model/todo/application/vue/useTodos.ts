import { todoService, todoStore } from "@/model/serviceLocator";
import { onMounted, onUnmounted, ref } from "vue";

import type { ITodoUpdateParams } from "../../domain/todo";

export function useTodos() {
  const todos = ref(todoStore.getTodosSnapshot());
  const isLoading = ref(todoStore.getIsLoadingSnapshot());
  const error = ref(todoStore.getErrorSnapshot());

  let todosSubscription: any;
  let isLoadingSubscription: any;
  let errorSubscription: any;

  onMounted(() => {
    todosSubscription = todoStore.getTodosObservable().subscribe((newTodos) => {
      todos.value = newTodos;
    });

    isLoadingSubscription = todoStore
      .getIsLoadingObservable()
      .subscribe((newIsLoading) => {
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
