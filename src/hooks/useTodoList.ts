import { Dispatch, SetStateAction } from 'react';
import { IAddTodoParams, ITodo } from '../types';

const useTodoList = (setTodoList: Dispatch<SetStateAction<ITodo[]>>) => {
  const addTodo = (params: IAddTodoParams) => {
    const newTodo: ITodo = {
      id: String(Date.now()),
      isDone: false,
      value: params.value
    };

    if (params.value.trim()) {
      setTodoList(prev => [...prev, newTodo]);
      params.setValue('');
    }
  };

  const deleteTodo = (id: string) => {
    setTodoList(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodoCompletion = (id: string) => {
    setTodoList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isDone: !item.isDone
          };
        }
        return item;
      })
    );
  };

  const clearCompletedTodoList = () => {
    setTodoList(prev => prev.filter(todo => !todo.isDone));
  };

  return {
    addTodo,
    deleteTodo,
    toggleTodoCompletion,
    clearCompletedTodoList
  };
};

export { useTodoList };
