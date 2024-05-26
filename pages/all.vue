<template>
  <div class="container">
    <Task v-for="task in taskStore.tasks" :key="task.id" :id="task.id" :checked="task.checked ?? false" :important="task.important ?? false" :title="task.title" />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/store/task';

const taskStore = useTaskStore();
</script>

<style lang="less" scoped>
@import url('~/var.less');

.container {
  overflow: auto;
  padding-right: 5px;
  max-height: calc(100vh - 40px);
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: @main-color;
  }

  &::-webkit-scrollbar-thumb {
    background: #ffffff;

    &:hover {
      background: #555;
    }
  }
}
</style>
