import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  Home,
  Counter,
  Form,
  ClickGame,
  ExpletiveProviderConsumer,
  LocaleContextSample,
} from './components';
import heading from './config/heading';

const routes = [
  {
    link: '/',
    name: 'Home',
    heading: heading.home,
  },
  {
    link: '/counter',
    name: 'Counter',
    heading: heading.counter,
  },
  {
    link: '/form',
    name: 'Form',
    heading: heading.form,
  },
  {
    link: '/click-game',
    name: 'ClickGame',
    heading: heading.clickGame,
  },
  {
    link: '/expletive-provider-consumer',
    name: 'ExpletiveProviderConsumer',
    heading: heading.expletiveProviderConsumer,
  },
  {
    link: '/locale-context-sample',
    name: 'LocaleContextSample',
    heading: heading.localeContextSample,
  },
];

const components = {
  home: Home,
  counter: Counter,
  form: Form,
  clickgame: ClickGame,
  expletiveproviderconsumer: ExpletiveProviderConsumer,
  localecontextsample: LocaleContextSample,
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
                <Link to={route.link}>{route.heading}</Link>
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
