import React from 'react';
import { BrowserRouter, Route, Switch , Redirect } from 'react-router-dom';

// Components
import Home from './Home';
import Register from './Register';
import LoginComponent from './login';
import CreateTeamComponent from './CreateTeam';
import decode from 'jwt-decode';
import DashboardComponent from './Dashboard';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))}
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={LoginComponent} />
      <Route path="/dashboard/:teamId?/:channelId?" exact component={DashboardComponent} />
      <PrivateRoute path="/create_team" exact component={CreateTeamComponent} />
    </Switch>
  </BrowserRouter>
);