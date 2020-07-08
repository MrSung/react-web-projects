import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  Home,
  CounterReducer,
  CounterRef,
  Form,
  ClickGame,
  ExpletiveProviderConsumer,
  LocaleContextSample,
  MathCalc,
  TrvFormRoughValidator,
  TrvMovieSeatBooking,
  TrvExchangeRateCalc,
  TrvDomArrayMethods,
  ZtmToDo,
  UidToDo1,
  UidToDo2,
} from './components';
import heading from './config/heading';

const routes = [
  {
    link: '/',
    name: 'Home',
    heading: heading.home,
  },
  {
    link: '/counter-reducer',
    name: 'CounterReducer',
    heading: heading.counterReducer,
  },
  {
    link: '/counter-ref',
    name: 'CounterRef',
    heading: heading.counterRef,
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
  {
    link: '/math-calc',
    name: 'MathCalc',
    heading: heading.mathCalc,
  },
  {
    link: '/trv-form-rough-validator',
    name: 'TrvFormRoughValidator',
    heading: heading.trvFormRoughValidator,
  },
  {
    link: '/trv-movie-seat-booking',
    name: 'TrvMovieSeatBooking',
    heading: heading.trvMovieSeatBooking,
  },
  {
    link: '/trv-exchange-rate-calc',
    name: 'TrvExchangeRateCalc',
    heading: heading.trvExchangeRateCalc,
  },
  {
    link: '/trv-dom-array-methods',
    name: 'TrvDomArrayMethods',
    heading: heading.trvDomArrayMethods,
  },
  {
    link: '/ztm-to-do',
    name: 'ZtmToDo',
    heading: heading.ztmToDo,
  },
  {
    link: '/uid-to-do-1',
    name: 'UidToDo1',
    heading: heading.uidToDo1,
  },
  {
    link: '/uid-to-do-2',
    name: 'UidToDo2',
    heading: heading.uidToDo2,
  },
];

const components = {
  home: Home,
  counterReducer: CounterReducer,
  counterRef: CounterRef,
  form: Form,
  clickGame: ClickGame,
  expletiveProviderConsumer: ExpletiveProviderConsumer,
  localeContextSample: LocaleContextSample,
  mathCalc: MathCalc,
  trvFormRoughValidator: TrvFormRoughValidator,
  trvMovieSeatBooking: TrvMovieSeatBooking,
  trvExchangeRateCalc: TrvExchangeRateCalc,
  trvDomArrayMethods: TrvDomArrayMethods,
  ztmToDo: ZtmToDo,
  uidToDo1: UidToDo1,
  uidToDo2: UidToDo2,
};

function List({ type }) {
  const TypeComponent =
    components[type[0].toLowerCase() + type.slice(1) || 'home'];
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
          {routes.map((route) => (
            <Route
              path={route.link}
              exact={route.link === '/'}
              key={route.name}
            >
              <List type={route.name} />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}
