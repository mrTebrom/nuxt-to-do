<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
    </ul>
    <button @click="addTask('New Task')">Add Task</button>
    <button @click="clearTasks">Clear Tasks</button>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/store/task';
import { useListStore } from '~/store/list';
import { computed } from 'vue';

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasks);

const addTask = (title: string): void => {
  taskStore.addTask(title);
};

const clearTasks = () => {
  taskStore.clearTasks();
};
</script>
