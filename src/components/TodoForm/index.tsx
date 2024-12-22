import { Button, Input } from 'antd';
import { ITodoForm } from '@/types';
import { useTodoList } from '@/hooks/useTodoList';
import styles from './TodoForm.module.scss';
import { FC, FormEvent } from 'react';

const TodoForm: FC<ITodoForm> = params => {
  const { addTodo } = useTodoList(params.setTodoList);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ value: params.addTodoValue, setValue: params.setAddTodoValue });
  };

  return (
    <form
      className={styles.addBlock}
      onSubmit={handleSubmit}
    >
      <Input
        className={styles.addTodoInput}
        value={params.addTodoValue}
        onChange={e => params.setAddTodoValue(e.target.value)}
        placeholder="New todo..."
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
