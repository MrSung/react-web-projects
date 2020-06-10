import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home, Counter, Form } from './components';

const routes = [
  {
    link: '/',
    name: 'Home',
  },
  {
    link: '/counter',
    name: 'Counter',
  },
  {
    link: '/form',
    name: 'Form',
  },
];

const components = {
  home: Home,
  counter: Counter,
  form: Form,
};

function List({ type }) {
  const TypeComponent = components[type.toLowerCase() || 'home'];
  return <TypeComponent />;
}

List.propTypes = {
  type: PropTypes.string.isRequired,
};

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {routes.map((route) => (
              <li key={route.name}>
                <Link to={route.link}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Switch>
          {routes.reverse().map((route) => (
            <Route path={route.link} key={route.name}>
              <List type={route.name} />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}
