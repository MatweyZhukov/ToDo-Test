import './App.css';
import { Input, Button, notification, Select } from 'antd';
import { createContext, useMemo, useState } from 'react';

interface ITodoOption {
  value: string;
  label: string;
}

interface OpenNotificationParams {
  message: string;
  description: string;
  type: NotificationType;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Context = createContext({ name: 'Default' });

function App() {
  const [api, contextHolder] = notification.useNotification();
  const [todos, setTodos] = useState<ITodoOption[]>([]);
  const [addTodoValue, setAddTodoValue] = useState<string>('');

  const openNotification = ({
    description,
    message,
    type
  }: OpenNotificationParams) => {
    api[type]({
      message,
      description,
      placement: 'topRight'
    });
  };

  const addTodo = () => {
    if (addTodoValue.trim()) {
      const newTodo: ITodoOption = {
        value: String(Date.now()),
        label: addTodoValue
      };
      setTodos(prev => [...prev, newTodo]);
      setAddTodoValue('');
      openNotification({
        description: 'New task has been added!',
        message: 'Success!',
        type: 'success'
      });
    } else {
      openNotification({
        description: 'The field is empty!',
        message: 'Warning!',
        type: 'warning'
      });
    }
  };

  const deleteTodo = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    setTodos(prev => prev.filter(todo => todo.value !== id));
    openNotification({
      description: 'Todo has been deleted',
      message: 'Success!',
      type: 'success'
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <main className="appWrapper">
        <div className="appContent">
          <h1 className="appTitle">todos</h1>
          <form
            className="addBlock"
            onSubmit={handleSubmit}
          >
            <Input
              value={addTodoValue}
              onChange={e => setAddTodoValue(e.target.value)}
              placeholder="New todo..."
              className="addTodoInput"
            />
            <Button
              htmlType="submit"
              className="addTodoButton"
            >
              Add
            </Button>
          </form>
          <Select
            placeholder="Choose the task..."
            className="todosList"
          >
            {todos.map(todo => (
              <Select.Option key={todo.value}>
                <div className="todoItem">
                  <span className="todoItemText">{todo.label}</span>
                  <Button onClick={e => deleteTodo(e, todo.value)}>
                    Delete
                  </Button>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>
      </main>
    </Context.Provider>
  );
}

export default App;
