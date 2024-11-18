import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Project Requirements Survey/i);
  expect(titleElement).toBeInTheDocument();
});
