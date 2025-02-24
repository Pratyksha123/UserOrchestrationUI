import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import '@testing-library/jest-dom';
import App from './App';



jest.mock('axios');

describe('UserDetails Component', () => {
  test('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/user/test@example.com']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays user details correctly', async () => {
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      ssn: '123-45-6789',
      email: 'test@example.com',
      image: 'https://example.com/profile.jpg',
    };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    render(
      <MemoryRouter initialEntries={['/user/test@example.com']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/user/getByEmail?email=test@example.com'));
    
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('SSN: 123-45-6789')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'John Doe' })).toHaveAttribute('src', 'https://example.com/profile.jpg');
  });

  test('handles no user found scenario', async () => {
    axios.get.mockResolvedValue({ data: null });
    
    render(
      <MemoryRouter initialEntries={['/user/unknown@example.com']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/user/getByEmail?email=unknown@example.com'));
    
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });
});
