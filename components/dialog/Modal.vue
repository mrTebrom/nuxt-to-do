<template>
  <transition name="modal">
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal"><Icon name="bi:x" /></button>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped lang="less">
@modal-background-color: rgba(0, 0, 0, 0.6);
@modal-content-background-color: #fff;
@modal-transition-duration: 0.3s;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: @modal-background-color;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: @modal-content-background-color;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 80%;
  position: relative;
  background-color: #201f24;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity @modal-transition-duration, transform @modal-transition-duration;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
