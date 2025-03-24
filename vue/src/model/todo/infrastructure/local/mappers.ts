import { ITodo, ITodoCreateParams, ITodoUpdateParams } from "../../domain/todo";

/**
 * Todo Data Transfer Object for local storage
 * Extends the domain model with timestamps for persistence
 */
export interface TodoDTO {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

/**
 * Map a domain Todo to a DTO for storage
 * Adds timestamps if they don't exist
 */
export function mapTodoToDTO(todo: ITodo): TodoDTO {
  const now = new Date().toISOString();
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    createdAt: now, // Add timestamp
    updatedAt: now, // Add timestamp
  };
}

/**
 * Map a TodoDTO to a domain Todo model
 * Timestamps are stripped as they're not part of the domain model
 */
export function mapDTOToTodo(dto: TodoDTO): ITodo {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    completed: dto.completed,
    // createdAt and updatedAt are not included in the domain model
  };
}

/**
 * Create a new TodoDTO from create params
 */
export function createTodoDTO(params: ITodoCreateParams, id: string): TodoDTO {
  const now = new Date().toISOString();
  return {
    id,
    title: params.title,
    description: params.description,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Update a TodoDTO with update params
 */
export function updateTodoDTO(
  dto: TodoDTO,
  params: ITodoUpdateParams
): TodoDTO {
  return {
    ...dto,
    ...(params.title !== undefined && { title: params.title }),
    ...(params.description !== undefined && {
      description: params.description,
    }),
    ...(params.completed !== undefined && { completed: params.completed }),
    updatedAt: new Date().toISOString(),
  };
}
