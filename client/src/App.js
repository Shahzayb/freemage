import React from 'react';
import { Router, Route } from 'react-router-dom';
import Startup from './hoc/Startup';
import history from './lib/history';
import RootRoutesMapping from './components/RootRoutesMapping';

import withTracker from './hoc/withTracker';

function App() {
  return (
    <Router history={history}>
      <Startup>
        <Route component={withTracker(RootRoutesMapping)} />
      </Startup>
    </Router>
  );
}

export default App;
