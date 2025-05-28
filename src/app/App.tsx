import React from 'react';

import RoutesList from './routes/Routes';
import Header from './header/Header';

const App = () => (
  <>
    <Header />
    <RoutesList />
    <footer style={{ textAlign: 'center', verticalAlign: 'center', padding: '10px 0' }}>
      Made by Max Shefov 2025
    </footer>
  </>
);

export default App;
