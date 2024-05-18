import { defineStore } from 'pinia'


export interface IList {
  title: string
}
const initialTask: IList[] = [
  { title: 'Список покупок' }
]
export const useListStore = defineStore('tasks', {
  state: () => ({
    list: initialTask
  }),
  actions: {
    addList(title: string) {
      this.list.push({ title: title })
    },
    removeList(title: string) {
      const index = this.list.findIndex(item => item.title === title);
      if (index !== -1) this.list.splice(index, 1);
    }
  }
})