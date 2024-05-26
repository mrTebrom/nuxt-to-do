<template>
  <div class="container">
    <div class="header">
      <section class="header-action">
        <h1>{{ capitalize(Array.isArray(id) ? id[0] : id) }}</h1>
        <div class="btn-list">
          <button><Icon name="ant-design:edit-twotone" /></button>
          <button @click="destroy"><Icon name="ant-design:delete-outlined" /></button>
        </div>
      </section>
      <section class="header-tabs">
        <span :class="{ active: activeTabs === 'all' }" @click="toggleTabs"> Задачи </span>
        <span :class="{ active: activeTabs === 'cheked' }" @click="toggleTabs"> Решение </span>
      </section>
    </div>
    <div class="main">
      <Task v-for="task in currentTask" :key="task.id.toString()" :id="task.id" :checked="task.checked ?? false" :important="task.important ?? false" :title="task.title" />
    </div>
    <div class="footer">
      <span><Icon name="bi:plus-lg" /></span>
      <input type="text" v-model="input" @keydown.enter="change" />
      <button @click="change"><Icon name="bi:caret-right-fill" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useTaskStore, type ITask } from '~/store/task';
import { useListStore } from '~/store/list';
import { useRoute } from 'vue-router';

const input = ref('');
const activeTabs = ref<'all' | 'cheked'>('all');
const route = useRoute();
const taskStore = useTaskStore();
const listStore = useListStore();
const currentTask = ref<ITask[]>([]);
const { id } = route.params;

const updateCurrentTask = () => {
  currentTask.value = taskStore.findTaskByList(Array.isArray(id) ? id[0] : id);
};

const change = (): void => {
  taskStore.addTask({ title: input.value, list: Array.isArray(id) ? id[0] : id });
  input.value = '';
  updateCurrentTask(); // Обновление списка задач после добавления
};

const destroy = (): void => {
  navigateTo('/');
  listStore.removeList(Array.isArray(id) ? id[0] : id);
};

const capitalize = (title: string): string => {
  if (!title) return '';
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
};

const toggleTabs = (): void => {
  activeTabs.value = activeTabs.value == 'all' ? 'cheked' : 'all';
};
onMounted(() => {
  updateCurrentTask(); // Инициализация списка задач при монтировании компонента
});

watchEffect(() => {
  updateCurrentTask(); // Реактивное обновление списка задач при изменении id
});
</script>

<style scoped lang="less">
@import url('~/var.less');

@input-color: #e5e0e429;

.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  width: 100%;
  padding: 0;
  gap: 20px;

  .header {
    flex: 0;

    .header-action {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-size: 22px;
        color: #ffffff;
        font-weight: 200;
      }

      .btn-list {
        display: flex;
        gap: 20px;

        button {
          padding: 5px;
          border: 1px solid transparent;
          background-color: transparent;
          color: #ffffff;
          font-size: 24px;
          cursor: pointer;
        }
      }
    }

    .header-tabs {
      display: flex;
      gap: 10px;

      span {
        font-size: 14px;
        width: 180px;
        height: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid #e6e1e550;
        color: #e6e1e550 !important;
        cursor: pointer;
        transition: 0.5s;

        &.active {
          color: @main-color-active !important;
          border-color: @main-color-active !important;
          transition: 0.5s;
        }
      }
    }
  }

  .main {
    flex: 1;
    overflow: auto;
    padding-right: 5px;

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

  .footer {
    flex: 0;
    display: flex;

    span {
      display: block;
      padding: 8px;
      padding-right: 0;
      background-color: @input-color;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      color: #ffffff;

      svg {
        margin-top: -2px;
      }
    }

    input {
      width: 100%;
      padding: 8px 16px;
      border: 1px solid transparent;
      background-color: @input-color;
      outline: none;
      color: #ffffff;
    }

    button {
      background-color: transparent;
      color: #fff;
      border-style: solid;
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
      background-color: @input-color;
      border-color: @input-color;
      cursor: pointer;
    }
  }
}
</style>
