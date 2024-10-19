import { render, screen, fireEvent } from '@testing-library/react';
import App from '.';
import '@testing-library/jest-dom';
import React from 'react';

describe('App Component', () => {
  test('renders todo form', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/new todo.../i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/new todo.../i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
  });

  test('removes a todo', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/new todo.../i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButton[0]);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/new todo.../i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();
  });
});
