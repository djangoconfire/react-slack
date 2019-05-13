import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Home from './Home';
import Register from './Register';
import LoginComponent from './login';


export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={LoginComponent} />
    </Switch>
  </BrowserRouter>
);