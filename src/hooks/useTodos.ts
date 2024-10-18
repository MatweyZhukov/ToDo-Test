import { Dispatch, SetStateAction } from 'react';
import { ITodo } from '../types';

const useTodos = (setTodos: Dispatch<SetStateAction<ITodo[]>>) => {
  const addTodo = (
    addTodoValue: string,
    setAddTodoValue: Dispatch<SetStateAction<string>>
  ) => {
    if (addTodoValue.trim()) {
      setTodos(prev => [
        ...prev,
        {
          id: String(Date.now()),
          value: addTodoValue,
          isDone: false
        }
      ]);
      setAddTodoValue('');
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodoCompletion = (id: string) => {
    setTodos(prev =>
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

  const clearCompletedTodos = () => {
    setTodos(prev => prev.filter(todo => !todo.isDone));
  };

  return { addTodo, deleteTodo, toggleTodoCompletion, clearCompletedTodos };
};

export { useTodos };
