import { Dispatch, SetStateAction } from 'react';

export interface ITodo {
  id: string;
  value: string;
  isDone: boolean;
}

export interface ITodoForm {
  addTodoValue: string;
  setAddTodoValue: Dispatch<SetStateAction<string>>;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export interface ITodoItem {
  item: ITodo;
  todos: ITodo[];
  setTodos: ITodoForm['setTodos'];
}

export interface FiltersProps {
  setCurrentFilter: Dispatch<SetStateAction<FiltersType>>;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  currentFilter: FiltersType;
}

export type FiltersType = 'all' | 'completed' | 'in-progress';
