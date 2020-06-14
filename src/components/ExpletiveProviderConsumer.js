import React, { createContext } from 'react';
import heading from '../config/heading';

const ExpletiveContext = createContext('shit');

function ContextualExclamation() {
  return (
    <ExpletiveContext.Consumer>
      {(word) => <span>Oh {word}!</span>}
    </ExpletiveContext.Consumer>
  );
}

function VisitGrandmasHouse() {
  return (
    <ExpletiveContext.Provider value="poop">
      <h2>Grandma's House 🏡</h2>
      <ContextualExclamation />
    </ExpletiveContext.Provider>
  );
}

function VisitFriendsHouse() {
  return (
    <>
      <h2>Friend's House 🏚</h2>
      <ContextualExclamation />
    </>
  );
}

export default function ExpletiveProviderConsumer() {
  return (
    <>
      <h1>{heading.expletiveProviderConsumer}</h1>
      <VisitGrandmasHouse />
      <VisitFriendsHouse />
    </>
  );
}
