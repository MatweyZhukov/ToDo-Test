import './App.scss';
import { Pagination } from 'antd';
import { useState, useEffect, FC } from 'react';
import TodoItem from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { ITodo } from './types';

const App: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [addTodoValue, setAddTodoValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const totalPages = Math.ceil(todos.length / 5);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [todos, currentPage]);

  const startIndex = (currentPage - 1) * 5;
  const paginatedTodos = todos.slice(startIndex, startIndex + 5);

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
        {!!todos.length && (
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
        <Pagination
          current={currentPage}
          pageSize={5}
          total={todos.length}
          onChange={(page: number) => setCurrentPage(page)}
          className="pagination"
        />
      </div>
    </main>
  );
};

export default App;
