import { LocalTodoRepository } from "./todo/infrastructure/local/todoRepository";
import { TodoService } from "./todo/application/todoService";
import { TodoStore } from "./todo/application/todoStore";

export const todoStore = new TodoStore();
export const todoRepository = new LocalTodoRepository();
export const todoService = new TodoService(todoRepository, todoStore);
