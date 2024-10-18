import './App.scss';
import { Pagination } from 'antd';
import { useState, useEffect, FC } from 'react';
import TodoItem from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { FiltersType, ITodo } from './types';
import { Filters } from './components/Filters';

const App: FC = () => {
  const [addTodoValue, setAddTodoValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<FiltersType>('all');
  const [todos, setTodos] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const totalPages = Math.ceil(todos.length / 5);
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [todos, currentPage]);

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'completed') {
      return todo.isDone;
    }
    if (currentFilter === 'in-progress') {
      return !todo.isDone;
    }
    return true;
  });
  const startIndex = (currentPage - 1) * 5;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + 5);

  return (
    <main className="appWrapper">
      <div className="appContent">
        <h1 className="appTitle">todos</h1>
        <TodoForm
          setTodos={setTodos}
          todos={todos}
          addTodoValue={addTodoValue}
          setAddTodoValue={setAddTodoValue}
        />
        {!!filteredTodos.length && (
          <div className="todosWrapper">
            {paginatedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                item={todo}
                setTodos={setTodos}
                todos={todos}
              />
            ))}
          </div>
        )}
        {filteredTodos.length > 5 && (
          <Pagination
            current={currentPage}
            pageSize={5}
            total={filteredTodos.length}
            onChange={(page: number) => setCurrentPage(page)}
            className="pagination"
          />
        )}
        {!!todos.length && (
          <Filters
            setCurrentFilter={setCurrentFilter}
            setTodos={setTodos}
            currentFilter={currentFilter}
          />
        )}
      </div>
    </main>
  );
};

export default App;
