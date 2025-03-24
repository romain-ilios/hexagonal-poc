<script setup lang="ts">
import { ref } from "vue";
import { useTodos } from "@/model/todo/application/vue/useTodos";

const description = ref("");
const { todos, isLoading, addTodo, updateTodo, deleteTodo } = useTodos();

function handleAddTodo(e: Event) {
  e.preventDefault();
  addTodo(description.value);
  description.value = "";
}

function handleDeleteTodo(id: string) {
  deleteTodo(id);
}

function handleToggleTodo(id: string, completed: boolean) {
  updateTodo(id, { completed });
}
</script>

<template>
  <div class="page">
    <main class="main">
      <h1>Todo List</h1>
      <form @submit="handleAddTodo">
        <input
          type="text"
          v-model="description"
          placeholder="Add a new todo..."
        />
      </form>
      <p v-if="isLoading">Loading...</p>
      <ul>
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <div class="todo-content">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="handleToggleTodo(todo.id, !todo.completed)"
            />
            <p>{{ todo.description }}</p>
          </div>
          <button @click="handleDeleteTodo(todo.id)" class="delete-button">
            x
          </button>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
.page {
  padding: 2rem;
}

.main {
  max-width: 600px;
  margin: 0 auto;
}

.todo-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.delete-button {
  width: 24px;
  height: 24px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
