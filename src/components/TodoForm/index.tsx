import { Button, Input } from 'antd';
import { ITodoForm } from '../../types';
import { useTodos } from '../../hooks/useTodos';
import styles from './TodoForm.module.scss';
import React from 'react';

const TodoForm: React.FC<ITodoForm> = params => {
  const { addTodo } = useTodos(params.setTodos);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(params.addTodoValue, params.setAddTodoValue);
  };

  return (
    <form
      className={styles.addBlock}
      onSubmit={handleSubmit}
    >
      <Input
        value={params.addTodoValue}
        onChange={e => params.setAddTodoValue(e.target.value)}
        placeholder="New todo..."
        className={styles.addTodoInput}
      />
      <Button
        htmlType="submit"
        className={styles.addTodoButton}
      >
        Add
      </Button>
    </form>
  );
};

export { TodoForm };
