import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from 'App';
import App2 from 'App2';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/likes" component={App2} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);