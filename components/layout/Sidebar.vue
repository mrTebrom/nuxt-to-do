<template>
  <aside>
    <div class="user">
      <div class="avatar">HH</div>
      <div class="user-info">
        <div class="username">Antonio Bonilla</div>
        <div class="email">antonio.bonilla@horus.com.uy</div>
      </div>
    </div>
    <div class="search-container">
      <input type="text" class="search" placeholder="Поиск" />
      <div class="search-help">поиск списка заданий</div>
    </div>
    <div class="list-container">
      <ul>
        <li>
          <NuxtLink to="/important">
            <span><Icon name="bi:star" class="icon" /> Важное</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
              <path fill="currentColor" fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/all">
            <span><Icon name="bi:house" class="icon" /> Все</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
              <path fill="currentColor" fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
          </NuxtLink>
        </li>
        <hr />
        <li v-for="item in lists" :key="item.title">
          <NuxtLink :to="'/list/' + item.title">
            <span><Icon name="bi:list-task" class="icon" /> {{ item.title }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
              <path fill="currentColor" fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <LayoutCreateList />
  </aside>
</template>

<script setup>
import { useListStore } from '~/store/list';
import { computed, onMounted } from 'vue';

import { useTaskStore } from '~/store/task';

// Инициализация задач

const task = useTaskStore();

const store = useListStore();

const lists = computed(() => store.list);
onMounted(async () => {
  await store.initialize();

  //tasks

  await task.initialize();
});
</script>
<style lang="less">
@body-background-color: #201f24;
@main-background-color: #544794;
@search-background-color: rgba(230, 225, 229, 0.08);
@search-border-color: rgba(230, 225, 229, 0.38);
@search-help-color: rgba(230, 225, 229, 0.38);

body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  margin-top: -4px;
}
body * {
  box-sizing: border-box;
  font-family: sans-serif;
}
.root {
  display: flex;
  width: 100vw; /* ограничиваем ширину до 100vw */
  max-width: 100vw; /* ограничиваем максимальную ширину до 100vw */
  min-width: 100vw; /* ограничиваем минимальную ширину до 100vw */
  height: 100vh; /* ограничиваем высоту до 100vh */
  max-height: 100vh; /* ограничиваем максимальную высоту до 100vh */
  min-height: 100vh; /* ограничиваем минимальную высоту до 100vh */
  .content {
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: @main-background-color;
  }
}
</style>
