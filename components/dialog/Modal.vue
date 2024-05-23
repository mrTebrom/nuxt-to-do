<template>
  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal"><Icon name="bi:x" /></button>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less">
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
  animation: fadeIn @modal-transition-duration;
}

.modal-content {
  background-color: @modal-content-background-color;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 80%;
  position: relative;
  animation: slideIn @modal-transition-duration;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-content-leave-active,
.modal-content-enter-active {
  transition: opacity @modal-transition-duration, transform @modal-transition-duration;
}

.modal-content-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
