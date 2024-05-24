import { defineStore } from 'pinia'


export interface IList {
  id: number;
  title: string;

}
const initialTask: IList[] = [
  { id: 0, title: 'Список покупок' }
]
const save = (state: IList[]) => {
  return new Promise<void>((resolve) => {
    localStorage.setItem('list', JSON.stringify(state));
    resolve();
  });
};

const get = async (): Promise<IList[]> => {
  return new Promise<IList[]>((resolve) => {
    const local = localStorage.getItem('list');
    if (local) {
      resolve(JSON.parse(local) as IList[]);
    } else {
      resolve(initialTask);
    }
  });
};

const genetationId = (state: IList[]) => {
  const lenghtId: number[] = state.map(item => item.id);
  return Math.max(...lenghtId) + 1;
}
export const useListStore = defineStore('list', {
  state: () => ({
    list: [] as IList[]
  }),
  actions: {
    async initialize() {
      this.list = await get();
    },
    addList(title: string) {
      const candidate = this.list.find(item => item.title.toLocaleLowerCase() === title.toLocaleLowerCase());
      if (candidate) return
      this.list.push({ title: title, id: genetationId(this.list) })
      save(this.list)
    },
    removeList(title: string) {
      const index = this.list.findIndex(item => item.title === title);
      if (index !== -1) this.list.splice(index, 1);
    }
  }
})