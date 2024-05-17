import { defineStore } from 'pinia'


export interface ITask {
  title: string;
  id: number;
}
const initialTask: ITask[] = []
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: initialTask
  }),
  actions: {
    addTask(title: string) {
      this.tasks.push({ title: title, id: this.tasks.length + 1 })
    },
    clearTasks() {
      this.tasks = []
    }
  }
})