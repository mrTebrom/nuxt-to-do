import { defineStore } from 'pinia'

// Интерфейс для описания списка
export interface IList {
  id: number;
  title: string;
}

// Начальное состояние списка (с одним элементом)
const initialTask: IList[] = [
  { id: 0, title: 'Список покупок' }
];

// Функция для сохранения состояния списка в localStorage
const save = (state: IList[]) => {
  return new Promise<void>((resolve) => {
    localStorage.setItem('list', JSON.stringify(state));
    resolve();
  });
};

// Функция для получения состояния списка из localStorage
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

// Функция для генерации нового уникального id для списка
const generateId = (state: IList[]) => {
  const ids: number[] = state.map(item => item.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

// Определение магазина списков с помощью Pinia
export const useListStore = defineStore('list', {
  state: () => ({
    list: [] as IList[]
  }),
  actions: {
    // Инициализация состояния списка из localStorage
    async initialize() {
      this.list = await get();
    },
    // Добавление нового списка
    async addList(title: string) {
      const candidate = this.list.find(item => item.title.toLocaleLowerCase() === title.toLocaleLowerCase());
      if (candidate) return;
      this.list.push({
        title,
        id: generateId(this.list)
      });
      await save(this.list);
    },
    // Удаление списка по названию
    async removeList(title: string) {
      const index = this.list.findIndex(item => item.title === title);
      if (index !== -1) {
        this.list.splice(index, 1);
        await save(this.list);
      }
    }
  }
});
