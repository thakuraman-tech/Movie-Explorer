import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { MovieProvider } from '../context/MovieContext';

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <MovieProvider>{ui}</MovieProvider>
    </BrowserRouter>
  );
};

describe('MovieCard Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockMovie = {
    id: 101,
    title: 'Inception',
    poster_path: '/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    release_date: '2010-07-16',
    vote_average: 8.357,
    genre_ids: [28, 878],
  };

  test('renders movie title, release year, and rating formatted to 1 decimal place', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);

    // Check movie title
    expect(screen.getByText('Inception')).toBeInTheDocument();

    // Check release year
    expect(screen.getByText('2010')).toBeInTheDocument();

    // Check rating formatted to 1 decimal place (8.4)
    expect(screen.getByText(/8.4/)).toBeInTheDocument();
  });

  test('toggles favorite button and updates aria-label', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);

    const favoriteButton = screen.getByLabelText('Add Inception to favorites');
    expect(favoriteButton).toBeInTheDocument();

    // Click favorite button
    fireEvent.click(favoriteButton);

    // Label should update to indicate removal
    expect(
      screen.getByLabelText('Remove Inception from favorites')
    ).toBeInTheDocument();
  });
});
