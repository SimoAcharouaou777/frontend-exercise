import '@testing-library/jest-dom';

// Minimal IntersectionObserver mock for jsdom
class IO {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IO;
