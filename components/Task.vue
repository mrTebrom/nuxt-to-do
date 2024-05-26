<template>
  <div class="task">
    <div>
      <input type="checkbox" :id="'checkbox-' + id" v-model="localChecked" @change="emitChange" class="hidden-checkbox" />
      <label :for="'checkbox-' + id" class="checkbox-label">
        <span class="checkbox-custom"></span>
        <span class="task-title">{{ title }}</span>
      </label>
    </div>
    <div @click="toggleImportant">
      <Icon v-if="important" name="ant-design:star-filled" color="#D9415E" />
      <Icon v-else name="ant-design:star-outlined" color="#D9415E" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useTaskStore } from '~/store/task'; // Путь к вашему Pinia хранилищу

const props = defineProps({
  checked: {
    type: Boolean,
    required: true,
  },
  important: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
});

const emit = defineEmits(['update:checked']);

const localChecked = ref(props.checked);

watch(
  () => props.checked,
  (newVal) => {
    localChecked.value = newVal;
  },
);

const emitChange = () => {
  emit('update:checked', localChecked.value);
};

const taskStore = useTaskStore();

const toggleImportant = () => {
  console.log(props.id);
  taskStore.toggleImportant(props.id);
};
</script>
<style scoped lang="less">
@main-color: #544794;

.task {
  display: flex;
  align-items: center;
  margin: 5px 0;
  background-color: #201f24;
  padding: 18px 16px;
  border-radius: 12px;
  color: #fff;
  position: relative;
  width: 100%;
  justify-content: space-between;
}

.hidden-checkbox {
  display: none;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  background: transparent;
  border: 2px solid #979797;
  border-radius: 4px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
  position: relative;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox-label:hover .checkbox-custom {
  border-color: @main-color;
  background: rgba(255, 255, 255, 0.1);
}

input[type='checkbox']:checked + .checkbox-label .checkbox-custom {
  background-color: @main-color;
  border-color: @main-color;
}

.checkbox-custom:before {
  content: '';
  position: absolute;
  width: 6px;
  height: 12px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

input[type='checkbox']:checked + .checkbox-label .checkbox-custom:before {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(45deg);
}

.task-title {
  color: #9e9e9e;
  transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
}

input[type='checkbox']:checked + .checkbox-label .task-title {
  color: #fff;
}

.task.important .task-title {
  font-weight: bold;
  color: red;
}
</style>
