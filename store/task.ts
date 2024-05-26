import { defineStore } from 'pinia'

// Интерфейс для описания задачи
export interface ITask {
  id: number;
  title: string;
  checked: boolean;
  important: boolean;
  list: string;
}

// Начальное состояние задач (пустой список)
const initialTask: ITask[] = [];

// Функция для сохранения состояния задач в localStorage
const save = (state: ITask[]) => {
  localStorage.setItem('task', JSON.stringify(state));
}

// Функция для получения состояния задач из localStorage
const get = async (): Promise<ITask[]> => {
  return new Promise<ITask[]>((resolve) => {
    const local = localStorage.getItem('task');
    if (local) {
      resolve(JSON.parse(local) as ITask[]);
    } else {
      resolve(initialTask);
    }
  });
};

// Функция для генерации нового уникального id для задачи
const generateId = (state: ITask[]) => {
  const ids: number[] = state.map(item => item.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

// Определение магазина задач с помощью Pinia
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: initialTask
  }),
  actions: {
    // Инициализация состояния задач из localStorage
    async initialize() {
      this.tasks = await get();
    },
    // Получение задач по списку
    findTaskByList(title: string) {
      return this.tasks.filter(item => item.list === title);
    },
    // Добавление новой задачи
    addTask({ title, list }: { title: string; list: string }) {
      this.tasks.push({
        title,
        id: generateId(this.tasks),
        important: false,
        checked: false,
        list
      });
      save(this.tasks);
    },
    // Переключение состояния 'checked' задачи по id
    setChecked(id: number) {
      const task = this.tasks.find(item => item.id === id);
      if (task) {
        task.checked = !task.checked;
        save(this.tasks);
      }
    },
    // Переключение состояния 'important' задачи по id
    toggleImportant(id: number) {
      const task = this.tasks.find(item => item.id === id);
      if (task) {
        task.important = !task.important;
        save(this.tasks);
      }
    },
    // Удаление задачи по id
    destroy(id: number) {
      const index = this.tasks.findIndex(item => item.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        save(this.tasks);
      }
    },
    // Очистка всех задач
    clearTasks() {
      this.tasks = [];
      save(this.tasks);
    }
  }
});
