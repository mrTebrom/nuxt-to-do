<template>
  <section class="root">
    <LayoutSidebar />

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
      newList: '',
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.newList = '';
      this.showModal = false;
    },
    onOk() {
      console.log(this.newList);
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
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* Добавляем, чтобы исключить появление прокрутки */
  aside {
    flex: 0 0 300px; /* Гарантируем, что aside будет иметь фиксированную ширину 300px */
    height: 100%;
    background-color: @body-background-color;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box; /* Убедимся, что padding включен в ширину */
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
    flex: 1;
    background-color: @main-background-color;
    padding: 20px; /* Добавляем отступы внутри .content */
    box-sizing: border-box; /* Убедимся, что padding включен в ширину */
    overflow: auto; /* Добавляем прокрутку для контента */
  }
}
</style>
