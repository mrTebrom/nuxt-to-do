<template>
  <div :class="['task', { important: important }]">
    <input type="checkbox" v-model="localChecked" @change="emitChange" />
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
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
  },
  data() {
    return {
      localChecked: this.checked,
    };
  },
  watch: {
    checked(newVal) {
      this.localChecked = newVal;
    },
  },
  methods: {
    emitChange() {
      this.$emit('update:checked', this.localChecked);
    },
  },
};
</script>

<style scoped>
.task {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.task input[type='checkbox'] {
  margin-right: 10px;
}

.task.important {
  font-weight: bold;
  color: red;
}
</style>
