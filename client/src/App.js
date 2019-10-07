import React from 'react';
import { Router, Route } from 'react-router-dom';
import Startup from './components/Startup';
import history from './lib/history';
import ModalSwitch from './components/ModalSwitch';

function App() {
  return (
    <Router history={history}>
      <Startup>
        <Route component={ModalSwitch} />
      </Startup>
    </Router>
  );
}

export default App;
