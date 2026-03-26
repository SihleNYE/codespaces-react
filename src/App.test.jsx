import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('App', () => {
  test('renders hero header', () => {
    render(<App />);
    expect(screen.getByText('Short-Form Video Ads Studio')).toBeInTheDocument();
  });

  test('renders AdVids brand', () => {
    render(<App />);
    const brandElement = screen.getByText(/AdVids/i);
    expect(brandElement).toBeDefined();
  });
});
