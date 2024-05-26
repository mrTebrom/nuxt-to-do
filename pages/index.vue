<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/store/task';
import { computed } from 'vue';

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasks);
</script>
