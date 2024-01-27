import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './app';
import App2 from './app2';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/app2" component={App2} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);