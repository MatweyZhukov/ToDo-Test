import { Button } from 'antd';
import styles from './Filters.module.scss';
import { FiltersProps, FiltersType } from '../../types';
import { useTodos } from '../../hooks/useTodos';
import React from 'react';

const Filters: React.FC<FiltersProps> = ({
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
          key={filter}
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
