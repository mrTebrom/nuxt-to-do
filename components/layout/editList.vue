<template>
  <div class="">
    <div class="create-container">
      <button @click="openModal"><Icon name="bi:plus-lg" style="width: 16px; height: 16px" class="icon" /> Создать список</button>
    </div>
    <DialogModal :showModal="showModal" @close="closeModal">
      <div class="add-list">
        <h1>Изменить список {{ title }}</h1>
        <div v-if="error" class="alert">Данный список уже существует</div>
        <div :class="{ inputContainer: true, active: border }">
          <input :onfocus="onFocus" :onblur="onBlur" type="text" v-model="value" @keydown.enter="add" />
        </div>
        <div class="btn-list">
          <button class="cancel" @click="cancel">Отмена</button>
          <button class="ok" @click="add">Создать</button>
        </div>
      </div>
    </DialogModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useListStore } from '~/store/list';
const value = ref('');
const border = ref(false);
const showModal = ref(false);
const error = ref(false);
const title = ref('');
const listStore = useListStore();
const add = () => {
  if (value.value.trim().length <= 0) return;
  const candidate = listStore.list.find((item) => item.title.toLocaleLowerCase() === value.value.toLocaleLowerCase());

  if (candidate) {
    error.value = true;
    return;
  } else {
    listStore.addList(value.value);
    console.log('List added:', value.value);
    value.value = ''; // Очистить поле ввода после добавления
    border.value = false;
    error.value = false;
    closeModal();
  }
};

const cancel = () => {
  console.log('Cancel');
  value.value = ''; // Очистить поле ввода при отмене
  border.value = false;
  closeModal();
};

const onFocus = () => {
  border.value = true;
};

const onBlur = () => {
  if (value.value.trim().length <= 0) {
    border.value = false;
  }
};
const openModal = () => {
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
  newList.value = ''; // Clear input on close
};
</script>
<style lang="less">
.add-list {
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .alert {
    padding: 12px;
    background-color: #d9415da8;
    color: #ffffff;
    border-radius: 8px;
  }
  h1 {
    margin: 0;
    font-weight: 200;
    font-size: 22px;
  }
  .inputContainer {
    position: relative;
    width: 100%;

    input {
      width: 100%;
      padding: 16px;
      border: 1px solid transparent;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      outline: none;
      background-color: #49454f;
      color: #fff;
    }
    &::after {
      content: '';
      bottom: -2px;
      width: 0;
      height: 2px;
      right: 0;
      background-color: #544794;
      position: absolute;
      transition: 0.5s;
    }
    &:hover::after {
      width: 100%;
      transition: 0.5s;
      left: 0 !important;
      right: unset;
    }
    &.active::after {
      width: 100%;
    }
  }
  .btn-list {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    button {
      padding: 12px 17px;
      border-radius: 30px;
      border-width: 1px;
      border-style: solid;
      background-color: transparent;
      color: #ffffff;
      border-color: transparent;
      cursor: pointer;
      transition: 0.5s;
      &.cancel {
        &:hover {
          border-color: #544794;
        }
      }
      &.ok {
        background-color: #544794;
        border-color: #544794;
        &:active {
          background-color: #635a91 !important;
          border-color: #635a91 !important;
          transition: 0.5s;
        }
        &:hover {
          background-color: #635a91 !important;
          border-color: #635a91 !important;
          transition: 0.5s;
        }
      }
    }
  }
}
</style>
