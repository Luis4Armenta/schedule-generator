import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Session from './Session';

describe('Session Component', () => {
  const mockSession = {
    color: {
      bg: 'bg-primary',
      text: 'text-white',
    },
    subject: 'Comunicación de datos',
    sequence: 'ABC123',
    teacher: 'Susy Cuevas Escobar',
    positiveScore: 0.7,
  };

  it('renders without crashing', () => {
    render(<Session session={mockSession} />);
    expect(screen.getByText('Comunicación de datos')).toBeInTheDocument();
    // You can add more specific assertions here based on your component structure
  });

  it('renders session information correctly', () => {
    render(<Session session={mockSession} />);
    expect(screen.getByText('Comunicación de datos')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Susy Cuevas Escobar')).toBeInTheDocument();
    expect(screen.getByText('0.70')).toBeInTheDocument(); // Assuming your positiveScore is 0.7
  });

  // Add more test cases as needed based on your component's behavior
});