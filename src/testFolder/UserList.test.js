import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import UserList from './UserList';
import './App.css'

jest.mock('axios');

describe('UserList Component', () => {
  test('renders input and search button', () => {
    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );
    
    expect(screen.getByPlaceholderText('Search users by name or SSN')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('updates input value correctly', () => {
    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText('Search users by name or SSN');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(input.value).toBe('John');
  });

  test('fetches and displays users correctly', async () => {
    const mockUsers = [
      { id: 1, firstName: 'John', lastName: 'Doe', ssn: '123-45-6789', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', ssn: '987-65-4321', email: 'jane@example.com' }
    ];
    
    axios.get.mockResolvedValue({ data: mockUsers });
    
    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByPlaceholderText('Search users by name or SSN'), { target: { value: 'Jo' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/user/searchByNamePrefix?prefix=Jo'));
    
    expect(await screen.findByText('John')).toBeInTheDocument();
    expect(await screen.findByText('Doe')).toBeInTheDocument();
    expect(await screen.findByText('123-45-6789')).toBeInTheDocument();
    expect(await screen.findByText('Jane')).toBeInTheDocument();
  });

  test('handles empty results', async () => {
    axios.get.mockResolvedValue({ data: [] });
    
    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByPlaceholderText('Search users by name or SSN'), { target: { value: 'XYZ' } });
    fireEvent.click(screen.getByText('Search'));
    
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/user/searchByNamePrefix?prefix=XYZ'));
    
    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('Doe')).not.toBeInTheDocument();
  });
});
