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
