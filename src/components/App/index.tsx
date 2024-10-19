import './App.scss';
import React from 'react';
import { Pagination } from 'antd';
import TodoItem from '../TodoItem';
import { TodoForm } from '../TodoForm';
import { FiltersType, ITodo } from '../../types';
import { Filters } from '../Filters';

const App: React.FC = () => {
  const [addTodoValue, setAddTodoValue] = React.useState<string>('');
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentFilter, setCurrentFilter] = React.useState<FiltersType>('all');
  const [todos, setTodos] = React.useState<ITodo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]')
  );

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  React.useEffect(() => {
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
