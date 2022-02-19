import React from 'react';
import HomePage from './components/HomePage';

/**
 * Component | App
 */
function App() {
  console.info('+++++ Render App +++++');
  return (
    <HomePage />
  );
}

export default React.memo(App);
