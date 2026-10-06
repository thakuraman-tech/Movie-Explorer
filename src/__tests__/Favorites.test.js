import React from 'react';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Favorites from '../pages/Favorites';
import { MovieProvider, useMovie } from '../context/MovieContext';

describe('Favorites Feature & Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders empty state when no favorites exist', () => {
    render(
      <BrowserRouter>
        <MovieProvider>
          <Favorites />
        </MovieProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Your collection is empty/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Save films by clicking the heart/i)
    ).toBeInTheDocument();
  });

  test('toggleFavorite persists movie to localStorage and updates favorites count', () => {
    const wrapper = ({ children }) => (
      <BrowserRouter>
        <MovieProvider>{children}</MovieProvider>
      </BrowserRouter>
    );

    const { result } = renderHook(() => useMovie(), { wrapper });

    const sampleMovie = {
      id: 550,
      title: 'Fight Club',
      release_date: '1999-10-15',
      vote_average: 8.432,
      poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    };

    expect(result.current.favorites.length).toBe(0);
    expect(result.current.isFavorite(550)).toBe(false);

    // Add to favorites
    act(() => {
      result.current.toggleFavorite(sampleMovie);
    });

    expect(result.current.favorites.length).toBe(1);
    expect(result.current.isFavorite(550)).toBe(true);

    // Verify localStorage persistence
    const saved = JSON.parse(
      localStorage.getItem('movie_explorer_favorites') || '[]'
    );
    expect(saved.length).toBe(1);
    expect(saved[0].id).toBe(550);
    expect(saved[0].title).toBe('Fight Club');

    // Remove from favorites via toggle
    act(() => {
      result.current.toggleFavorite(sampleMovie);
    });

    expect(result.current.favorites.length).toBe(0);
    expect(result.current.isFavorite(550)).toBe(false);

    const updatedSaved = JSON.parse(
      localStorage.getItem('movie_explorer_favorites') || '[]'
    );
    expect(updatedSaved.length).toBe(0);
  });
});
