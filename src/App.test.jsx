import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AdVids brand', () => {
  render(<App />);
  const brandElement = screen.getByText(/AdVids/i);
  expect(brandElement).toBeDefined();
});
