import React, { useState, useMemo, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import heading from '../config/heading';
import { allCurrencies } from '../data/trvExchangeRateCalc';

const ENDPOINT_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';
const DEFAULT_BASE_CURRENCY = 'USD';
const DEFAULT_BASE_RATE = 1;
const DEFAULT_TARGET_RATE = 'JPY';

export default function TrvExchangeRateCalc() {
  const [fetchedResponse, setFetchedResponse] = useState(null);
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(
    DEFAULT_BASE_CURRENCY
  );
  const [inputBaseRate, setInputBaseRate] = useState(DEFAULT_BASE_RATE);
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState(
    DEFAULT_TARGET_RATE
  );
  const [convertedRate, setConvertedRate] = useState(null);
  const fixedConvertedRate = useMemo(() => {
    if (convertedRate) {
      return convertedRate.toFixed(2);
    }
    return null;
  }, [convertedRate]);
  const selectedBaseCurrencyRef = useRef(DEFAULT_BASE_CURRENCY);
  const baseRateRef = useRef(DEFAULT_BASE_RATE);
  const selectedTargetCurrencyRef = useRef(DEFAULT_TARGET_RATE);

  const handleSwapButtonClick = () => {
    setSelectedBaseCurrency(selectedTargetCurrency);
    setSelectedTargetCurrency(selectedBaseCurrency);
  };

  useEffect(() => {
    fetch(`${ENDPOINT_BASE_URL}/${selectedBaseCurrency}`)
      .then((response) => response.json())
      .then((resJson) => {
        setFetchedResponse(resJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedBaseCurrency, selectedBaseCurrencyRef]);
  useEffect(() => {
    if (!fetchedResponse) return;
    const selectedTargetCurrencyRate =
      fetchedResponse.rates[selectedTargetCurrency];
    setConvertedRate(inputBaseRate * selectedTargetCurrencyRate);
  }, [fetchedResponse, inputBaseRate, selectedTargetCurrency]);

  return (
    <>
      <h1>{heading.trvExchangeRateCalc}</h1>
      <h2>Exchange Rate Calculator</h2>
      <h4>Choose the currency and the amounts to get the exchange rate</h4>
      <hr />
      <table>
        <tbody>
          <tr>
            <td>
              <span>
                <label htmlFor="baseCurrency">
                  <select
                    name="baseCurrency"
                    id="baseCurrency"
                    ref={selectedBaseCurrencyRef}
                    value={selectedBaseCurrency}
                    onChange={() =>
                      setSelectedBaseCurrency(
                        selectedBaseCurrencyRef.current.value
                      )
                    }
                  >
                    {allCurrencies.map((currency) => (
                      <option value={currency} key={`${currency}-${nanoid(5)}`}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </label>
              </span>
            </td>
            <td>
              <span>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  name="baseRate"
                  id="baseRate"
                  ref={baseRateRef}
                  defaultValue={1}
                  onChange={() => {
                    setInputBaseRate(baseRateRef.current.value);
                  }}
                />
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={handleSwapButtonClick}>
                Swap
              </button>
            </td>
            <td>
              {convertedRate && (
                <span
                  style={{ paddingLeft: '0.75em' }}
                >{`${inputBaseRate} ${selectedBaseCurrency} = ${fixedConvertedRate} ${selectedTargetCurrency}`}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <label htmlFor="targetCurrency">
                  <select
                    name="targetCurrency"
                    id="targetCurrency"
                    ref={selectedTargetCurrencyRef}
                    value={selectedTargetCurrency}
                    onChange={() => {
                      setSelectedTargetCurrency(
                        selectedTargetCurrencyRef.current.value
                      );
                    }}
                  >
                    {allCurrencies.map((currency) => (
                      <option value={currency} key={`${currency}-${nanoid(5)}`}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </label>
              </span>
            </td>
            <td>
              <span>
                <input
                  type="number"
                  name="targetRate"
                  id="targetRate"
                  value={String(fixedConvertedRate)}
                  readOnly
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
