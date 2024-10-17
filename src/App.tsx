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
        description: 'Задача добавлена успешно!',
        message: 'Успех!',
        type: 'success'
      });
    } else {
      openNotification({
        description: 'Поле не заполнено!',
        message: 'Внимание!',
        type: 'warning'
      });
    }
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
              Добавить
            </Button>
          </form>
          <Select
            size="large"
            options={todos}
            placeholder="Выберите задачу"
            style={{ width: '100%', marginTop: '20px' }}
          />
        </div>
      </main>
    </Context.Provider>
  );
}

export default App;
