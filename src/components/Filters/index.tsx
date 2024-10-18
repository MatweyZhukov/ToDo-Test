import { Button } from 'antd';
import { FC } from 'react';
import styles from './Filters.module.scss';
import { FiltersProps, FiltersType } from '../../types';
import { useTodos } from '../../hooks/useTodos';

const Filters: FC<FiltersProps> = ({
  setCurrentFilter,
  setTodos,
  currentFilter
}) => {
  const { clearCompletedTodos } = useTodos(setTodos);

  const filterTypes: FiltersType[] = ['all', 'in-progress', 'completed'];

  return (
    <div className={styles.filters}>
      {filterTypes.map(filter => (
        <Button
          onClick={() => setCurrentFilter(filter)}
          className={styles.filter}
          type={filter === currentFilter ? 'primary' : undefined}
        >
          {filter}
        </Button>
      ))}
      <Button
        onClick={clearCompletedTodos}
        className={styles.filter}
      >
        Clear Completed
      </Button>
    </div>
  );
};

export { Filters };
