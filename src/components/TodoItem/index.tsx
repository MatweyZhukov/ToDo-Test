import { ITodoItem } from '@/types';
import { Button, Checkbox } from 'antd';
import { useTodoList } from '@/hooks/useTodoList';
import styles from './TodoItem.module.scss';
import { FC } from 'react';

const TodoItem: FC<ITodoItem> = ({ item, setTodoList }) => {
  const { toggleTodoCompletion, deleteTodo } = useTodoList(setTodoList);

  return (
    <li
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
    </li>
  );
};

export default TodoItem;
