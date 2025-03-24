import { todoService, todoStore } from "@/model/serviceLocator";
import { useEffect, useState } from "react";

import { ITodoUpdateParams } from "../../domain/todo";

export function useTodos() {
  const [todos, setTodos] = useState(todoStore.getTodosSnapshot());
  const [isLoading, setIsLoading] = useState(todoStore.getIsLoadingSnapshot());
  const [error, setError] = useState(todoStore.getErrorSnapshot());

  useEffect(() => {
    const subscription = todoStore.getTodosObservable().subscribe(setTodos);
    const isLoadingSubscription = todoStore
      .getIsLoadingObservable()
      .subscribe(setIsLoading);
    const errorSubscription = todoStore
      .getErrorObservable()
      .subscribe(setError);

    todoService.getInitialTodos();

    return () => {
      subscription.unsubscribe();
      isLoadingSubscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, []);

  function addTodo(description: string) {
    todoService.addTodo({ description });
  }

  function updateTodo(id: string, params: ITodoUpdateParams) {
    todoService.updateTodo(id, params);
  }

  function deleteTodo(id: string) {
    todoService.deleteTodo(id);
  }

  return { todos, isLoading, error, addTodo, updateTodo, deleteTodo };
}
