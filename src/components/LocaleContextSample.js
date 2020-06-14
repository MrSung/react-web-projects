import React, { createContext, useState, useMemo, useContext } from 'react';
import heading from '../config/heading';

const LocaleContext = createContext('en');

function LocaleContextProvider() {
  const [locale, setLocale] = useState('en');
  const toggleLocale = () => {
    setLocale((loc) => (loc === 'en' ? 'es' : 'en'));
  };
  const value = useMemo(
    () => ({
      locale,
      toggleLocale,
    }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>
      <label htmlFor="locale">
        <input
          type="checkbox"
          onChange={toggleLocale}
          name="locale"
          id="locale"
        />
        <span style={{ marginLeft: '0.5em' }}>Toggle locale</span>
      </label>
      <div>Locale provider: {locale}</div>
      <LocaleContextConsumer />
    </LocaleContext.Provider>
  );
}

// function LocaleContextConsumer() {
//   return (
//     <LocaleContext.Consumer>
//       {({ locale }) => <div>Locale consumer: {locale}</div>}
//     </LocaleContext.Consumer>
//   );
// }

function LocaleContextConsumer() {
  const { locale } = useContext(LocaleContext);
  return <div>Locale consumer: {locale}</div>;
}

export default function LocaleContextSample() {
  return (
    <>
      <h1>{heading.localeContextSample}</h1>
      <LocaleContextProvider />
    </>
  );
}
