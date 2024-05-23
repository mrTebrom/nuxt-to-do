import { defineStore } from 'pinia'


export interface IList {
  title: string
}
const initialTask: IList[] = [
  { title: 'Список покупок' }
]
export const useListStore = defineStore('list', {
  state: () => ({
    list: initialTask
  }),
  actions: {
    addList(title: string) {
      const candidate = this.list.find(item => item.title.toLocaleLowerCase() === title.toLocaleLowerCase());
      if (candidate) return
      this.list.push({ title: title })
      console.log(this.list)
    },
    removeList(title: string) {
      const index = this.list.findIndex(item => item.title === title);
      if (index !== -1) this.list.splice(index, 1);
    }
  }
})