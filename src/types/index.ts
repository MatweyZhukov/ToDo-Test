import { Dispatch, SetStateAction } from 'react';

export type FiltersType = 'all' | 'completed' | 'in-progress';

export interface IAddTodoParams {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export interface ITodo {
  id: string;
  value: string;
  isDone: boolean;
}

export interface ITodoForm {
  addTodoValue: string;
  setAddTodoValue: Dispatch<SetStateAction<string>>;
  todoList: ITodo[];
  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
}

export interface ITodoItem {
  item: ITodo;
  todoList: ITodo[];
  setTodoList: ITodoForm['setTodoList'];
}

export interface IFiltersProps {
  setCurrentFilter: Dispatch<SetStateAction<FiltersType>>;
  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
  currentFilter: FiltersType;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
