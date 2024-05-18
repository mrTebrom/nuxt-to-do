import { defineStore } from 'pinia'


export interface ITask {
  id: number;
  title: string;
  cheked: boolean;
  important: boolean;
}
const initialTask: ITask[] = [
  { title: 'Купить хлеб', id: 0, important: false, cheked: false }
]
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: initialTask
  }),
  actions: {
    addTask(title: string) {
      this.tasks.push({ title: title, id: this.tasks.length + 1, important: false, cheked: false })
    },
    clearTasks() {
      this.tasks = []
    }
  }
})