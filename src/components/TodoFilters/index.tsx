import { Button } from 'antd';
import styles from './TodoFilters.module.scss';
import { IFiltersProps, FiltersType } from '@/types';
import { useTodoList } from '@/hooks/useTodoList';
import { FC } from 'react';

const TodoFilters: FC<IFiltersProps> = params => {
  const { clearCompletedTodoList } = useTodoList(params.setTodoList);

  const filterTypes: FiltersType[] = ['all', 'in-progress', 'completed'];

  const handleChangeFilter = (filter: FiltersType) => {
    params.setCurrentFilter(filter);
    params.setCurrentPage(1);
  };

  return (
    <div className={styles.filters}>
      {filterTypes.map((filter, index) => (
        <Button
          key={index}
          className={styles.filter}
          onClick={() => handleChangeFilter(filter)}
          type={filter === params.currentFilter ? 'primary' : 'default'}
        >
          {filter}
        </Button>
      ))}
      <Button
        onClick={clearCompletedTodoList}
        className={styles.filter}
      >
        Clear Completed
      </Button>
    </div>
  );
};

export { TodoFilters };
