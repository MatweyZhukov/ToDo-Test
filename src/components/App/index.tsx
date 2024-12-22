import './App.scss';
import { useState, useEffect, FC } from 'react';
import { Pagination } from 'antd';
import TodoItem from '../TodoItem';
import { TodoForm } from '../TodoForm';
import { FiltersType, ITodo } from '@/types';
import { TodoFilters } from '../TodoFilters';

const App: FC = () => {
  const [addTodoValue, setAddTodoValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<FiltersType>('all');
  const [todoList, setTodoList] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem('todoList') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    const totalPages = Math.ceil(todoList.length / 5);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [todoList, currentPage]);

  const filteredTodoList = todoList.filter(todo => {
    switch (currentFilter) {
      case 'completed':
        return todo.isDone;
      case 'in-progress':
        return !todo.isDone;
      default:
        return true;
    }
  });

  const startIndex = (currentPage - 1) * 5;
  const paginatedTodoList = filteredTodoList.slice(startIndex, startIndex + 5);

  return (
    <main className="appWrapper">
      <div className="appContent">
        <h1 className="appTitle">todos</h1>
        <TodoForm
          setTodoList={setTodoList}
          todoList={todoList}
          addTodoValue={addTodoValue}
          setAddTodoValue={setAddTodoValue}
        />
        {!!filteredTodoList.length && (
          <ul className="todoListWrapper">
            {paginatedTodoList.map(todo => (
              <TodoItem
                key={todo.id}
                item={todo}
                setTodoList={setTodoList}
                todoList={todoList}
              />
            ))}
          </ul>
        )}
        {filteredTodoList.length > 5 && (
          <Pagination
            current={currentPage}
            pageSize={5}
            total={filteredTodoList.length}
            onChange={(page: number) => setCurrentPage(page)}
            className="pagination"
          />
        )}
        {!!todoList.length && (
          <TodoFilters
            setCurrentPage={setCurrentPage}
            setCurrentFilter={setCurrentFilter}
            setTodoList={setTodoList}
            currentFilter={currentFilter}
          />
        )}
      </div>
    </main>
  );
};

export default App;
