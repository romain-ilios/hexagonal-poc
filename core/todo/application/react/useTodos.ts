import { useEffect, useState } from "react";
import { todoService, todoStore } from "../../../serviceLocator";
import type { ITodo, ITodoUpdateParams } from "../../domain/todo";

export function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>(todoStore.getTodosSnapshot());
  const [isLoading, setIsLoading] = useState<boolean>(
    todoStore.getIsLoadingSnapshot()
  );
  const [error, setError] = useState<string | null>(
    todoStore.getErrorSnapshot()
  );

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
