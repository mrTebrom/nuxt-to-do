<template>
  <section class="root">
    <DialogModal v-if="showModal" :showModal="showModal" @close="closeModal">
      <h2>Модальное Окно</h2>
      <p>Это содержимое модального окна.</p>
    </DialogModal>
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
        </ul>
      </div>
      <div class="create-container">
        <button @click="openModal"><Icon name="bi:plus-lg" style="width: 16px; height: 16px" class="icon" /> Создать список</button>
      </div>
    </aside>

    <div class="content">
      <header></header>
      <main>
        <slot></slot>
      </main>
      <footer></footer>
    </div>
  </section>
</template>
<script>
export default {
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
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

  aside {
    width: 300px;
    height: 100%;
    background-color: @body-background-color;
    min-height: 100vh;
    padding: 20px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    .user {
      display: flex;
      gap: 20px;
      flex: 0;
      .avatar {
        min-width: 32px;
        min-height: 32px;
        max-width: 32px;
        max-height: 32px;
        background-color: @main-background-color;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: @body-background-color;
        font-weight: bold;
      }
      .username {
        font-size: 14px;
        color: #e6e1e5;
      }
      .email {
        color: #e6e1e5 !important;
        opacity: 0.6;
        font-size: 12px;
      }
    }
    .search-container {
      flex: 0;
      .search {
        padding: 17px;
        width: 100%;
        background: @search-background-color;
        color: #fff;
        outline: none !important;
        border: none;
        border-bottom: 1px solid @search-border-color;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .search-help {
        font-size: 12px;
        color: @search-help-color;
        margin-top: 4px;
        margin-left: 17px;
        display: block;
      }
    }
    .list-container {
      flex: 1;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 1px; /* Ширина скроллбара */
      }

      &::-webkit-scrollbar-track {
        background: transparent; /* Цвет фона трека */
      }

      &::-webkit-scrollbar-thumb {
        background-color: #544794; /* Цвет ползунка */
        border-radius: 4px; /* Скругляем углы ползунка */
      }

      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: block; /* изменено значение на block */
        max-height: calc(100vh - 200px); /* изменено значение на calc(100vh - 200px) */
        li {
          a {
            color: #fff;
            padding: 12px 10px;
            display: flex;
            justify-content: space-between;
            text-decoration: none;
          }
        }
      }
    }

    .create-container {
      flex: 0;
      button {
        width: 100%;
        background-color: transparent;
        color: #9373ff;
        padding: 17px;
        text-align: start;
        cursor: pointer;
        border: 1px solid transparent;
        transition: border-color 0.5s, box-shadow 0.5s; /* Добавляем transition для плавного изменения */
        border-radius: 4px; /* Добавляем скругление углов */
        &:hover {
          border-color: #9373ff;
          box-shadow: 0 0 10px rgba(147, 115, 255, 0.5); /* Добавляем свечение при наведении */
        }
        &:active {
          background-color: rgba(147, 115, 255, 0.1); /* Добавляем подсветку при нажатии */
        }
      }
    }
  }
  .content {
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: @main-background-color;
  }
}
</style>
