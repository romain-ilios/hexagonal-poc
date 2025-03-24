## Hexagonal Architecture

Hexagonal architecture, also known as ports and adapters architecture, is a design pattern used to create loosely coupled application components that can be easily connected to their software environment by means of ports and adapters. This architecture allows an application to be equally driven by users, programs, automated tests, or batch scripts, and to be developed and tested in isolation from its eventual runtime devices and databases.

### Application in This Proof of Concept

In this proof of concept, we have applied hexagonal architecture to structure our codebase in a way that promotes separation of concerns and ease of testing and maintenance.

#### Core Folder

The `core` folder represents the main core concept of domains. It includes the domain logic and infrastructure. For simplicity, we have used localStorage as the repository for storing todos, but this can be easily changed to another storage mechanism due to the flexibility provided by hexagonal architecture.

The core folder also includes an application layer that is based on RxJS. This makes it very easy to create adapters for different frontend frameworks such as Vue, React, or Angular. The use of RxJS allows us to manage state and asynchronous operations in a reactive way.

#### Vue and Next Folders

The `vue` and `next` folders are implementations of the core folder, which is referred to as the "model" folder within the examples. These folders contain the specific adapters and components needed to integrate the core domain logic with the Vue and Next.js frameworks, respectively.

By following hexagonal architecture, we ensure that the core business logic remains independent of the specific frontend framework, making it easier to switch or add new frameworks in the future without significant changes to the core logic.

#### Todo Domain

The `todo` domain is a crucial part of our application, and it is defined in the `todo.ts` file. This file outlines the domain and the interfaces, which are essential for maintaining the hexagonal architecture. Here's a detailed explanation of the todo domain:

1. **Domain and Interfaces Definition in `todo.ts`**:

   - The `todo.ts` file defines the core domain logic and interfaces for the todo application. It includes interfaces such as `ITodo`, `IAddTodoParams`, `ITodoUpdateParams`, `ITodoRepository`, `ITodoService`, and `ITodoStore`.
   - `ITodo` represents the structure of a todo item, including properties like `id`, `description`, and `completed`.
   - `IAddTodoParams` and `ITodoUpdateParams` define the parameters required for adding and updating todos, respectively.
   - `ITodoRepository` outlines the methods for interacting with the data storage, such as `getTodos` and `saveTodos`.
   - `ITodoService` defines the business logic methods, including `getInitialTodos`, `addTodo`, `updateTodo`, and `deleteTodo`.
   - `ITodoStore` represents the state management interface, providing observables for `todos`, `isLoading`, and `error`, along with methods to manipulate the state.

2. **Repository Implementation**:

   - The repository is implemented on the infrastructure side, adhering to the `ITodoRepository` interface defined in the domain.
   - In our example, the `LocalTodoRepository` class implements the `ITodoRepository` interface and uses the browser's localStorage to store todos.
   - The repository includes methods like `getTodos` and `saveTodos`, which interact with localStorage and return promises.
   - Mappers are used to map the domain objects to Data Transfer Objects (DTOs) and vice versa, ensuring a clear separation between the domain logic and the data storage mechanism.

3. **Application Layer**:

   - The application layer consists of an RxJS store and a service that connects the store with the repository.
   - The RxJS store is created using `BehaviorSubject` to manage the state of todos, loading status, and errors reactively.
   - The `TodoService` class is responsible for handling the business logic and interacting with the repository. It maps the store with the repository by updating the store's state based on the repository's data.
   - Framework adapters are created on top of the application layer to integrate with specific frontend frameworks like Vue and React. These adapters use the service and store to manage the state and perform operations on the todos.

4. **Service Locator**:
   - A service-locator file is created to instantiate the different classes throughout the application.
   - The service locator ensures that the dependencies are managed centrally and can be easily swapped or updated without affecting the rest of the application.
   - It provides instances of the `TodoService`, `TodoStore`, and `TodoRepository`, which are then used by the framework adapters to interact with the todo domain.

By following this structure, we ensure that the core business logic remains independent of the specific frontend framework, promoting separation of concerns and ease of testing and maintenance. The hexagonal architecture allows us to easily switch or add new frameworks in the future without significant changes to the core logic.
