<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
    </ul>
    <button @click="addTask('New Task')">Add Task</button>
    <button @click="clearTasks">Clear Tasks</button>
  </div>
</template>

<script setup>
import { useTaskStore } from '~/store/task';
import { computed } from 'vue';

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.tasks);

const addTask = (title) => {
  taskStore.addTask(title);
};

const clearTasks = () => {
  taskStore.clearTasks();
};
</script>
