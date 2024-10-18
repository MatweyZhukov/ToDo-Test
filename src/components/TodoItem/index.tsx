import { FC } from 'react';
import { ITodoItem } from '../../types';
import { Button, Checkbox } from 'antd';
import { useTodos } from '../../hooks/useTodos';
import styles from './TodoItem.module.scss';

const TodoItem: FC<ITodoItem> = ({ item, setTodos }) => {
  const { toggleTodoCompletion, deleteTodo } = useTodos(setTodos);

  return (
    <div
      className={styles.todoItem}
      key={item.id}
    >
      <Checkbox
        checked={item.isDone}
        onChange={() => toggleTodoCompletion(item.id)}
      >
        <span className={item.isDone ? styles.todoText : undefined}>
          {item.value}
        </span>
      </Checkbox>
      <Button onClick={() => deleteTodo(item.id)}>Delete</Button>
    </div>
  );
};

export default TodoItem;
