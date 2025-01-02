import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoredData, Task } from './types';

const STORAGE_KEY = '@75hard_data';

let currentDefaultTasks: Task[] = [
  { id: 1, title: 'Follow a diet', completed: false },
  { id: 2, title: 'Two 45-minute workouts', completed: false },
  { id: 3, title: 'No alcohol', completed: false },
  { id: 4, title: 'Drink 1 gallon of water', completed: false },
  { id: 5, title: 'Read 10 pages of a book', completed: false },
  { id: 6, title: 'Take a progress picture', completed: false },
];

export const getDefaultTasks = () => [...currentDefaultTasks];

export const updateDefaultTasks = (tasks: Task[]) => {
  currentDefaultTasks = [...tasks];
};

export const saveData = async (data: StoredData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const loadData = async (): Promise<StoredData | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};