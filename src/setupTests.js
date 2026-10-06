// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Mock window.matchMedia for Material UI theme mode detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock IntersectionObserver for infinite scroll testing
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver;

// Mock TMDb API calls to prevent unmocked external network requests during unit tests
jest.mock('./api/tmdb', () => {
  const actual = jest.requireActual('./api/tmdb');
  return {
    ...actual,
    getGenres: jest.fn().mockResolvedValue([
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 18, name: 'Drama' },
      { id: 878, name: 'Science Fiction' },
    ]),
    getTrending: jest.fn().mockResolvedValue({
      page: 1,
      results: [],
      total_pages: 1,
    }),
    searchMovies: jest.fn().mockResolvedValue({
      page: 1,
      results: [],
      total_pages: 1,
    }),
    discoverMovies: jest.fn().mockResolvedValue({
      page: 1,
      results: [],
      total_pages: 1,
    }),
  };
});
