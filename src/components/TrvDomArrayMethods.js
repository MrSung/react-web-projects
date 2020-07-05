import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import heading from '../config/heading';

const useGetRandomUsers = (userCount) => {
  const [users, setUsers] = useState([]);
  const getRandomUsers = async () => {
    try {
      // This api can retrieve only one random user 😫
      const res = await fetch('https://randomuser.me/api');
      const { results } = await res.json();
      const randomUser = results[0];
      return {
        id: randomUser.cell,
        name: `${randomUser.name.first} ${randomUser.name.last}`,
        money: Math.floor(Math.random() * 1000000),
      };
    } catch (err) {
      console.error(`Error in catch block: ${err}`);
    }
  };
  useEffect(() => {
    const setRandomUsers = async () => {
      const randomUsers = await getRandomUsers(userCount);
      setUsers((prevUsers) => [...prevUsers, randomUsers]);
    };
    for (let i = 0; i < userCount; i += 1) {
      setRandomUsers();
    }
  }, [userCount]);
  return users;
};

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export default function TrvDomArrayMethods({ userCount = 3 }) {
  const [resultsToShow, setResultsToShow] = useState(null);
  const [entireWealth, setEntireWealth] = useState(null);
  const randomUsers = useGetRandomUsers(userCount);

  useEffect(() => {
    if (randomUsers.length === userCount) {
      setResultsToShow(randomUsers);
    }
  }, [randomUsers, userCount]);

  // TODO: Finish below
  const handleAddUser = () => {};
  const handleDoubleMoney = () => {
    setResultsToShow((usersData) =>
      usersData.map((userData) => ({ ...userData, money: userData.money * 2 }))
    );
  };
  const handleFilterMillionaires = () => {
    setResultsToShow((usersData) =>
      usersData.filter((userData) => userData.money > 1000000)
    );
  };
  // TODO: Correct below to work properly
  const handleSortByRichest = () => {
    setResultsToShow((usersData) => {
      console.log(usersData.sort((a, b) => b.money - a.money));
      return usersData.sort((a, b) => b.money - a.money);
    });
  };
  const handleCalculateEntireWealth = () => {
    const total = resultsToShow.reduce((acc, cur) => {
      const currentMount = acc + cur.money;
      return currentMount;
    }, 0);
    setEntireWealth(total);
  };

  return (
    <div>
      <h1>{heading.trvDomArrayMethods}</h1>
      <div>
        <aside>
          <button type="button">Add User 👱‍♂️</button>
          <button type="button" onClick={handleDoubleMoney}>
            Double Money 💰
          </button>
          <button type="button" onClick={handleFilterMillionaires}>
            Show Only Millionaires 💵
          </button>
          <button type="button" onClick={handleSortByRichest}>
            Sort by Richest 👇
          </button>
          <button type="button" onClick={handleCalculateEntireWealth}>
            Calculate entire Wealth 🧮
          </button>
        </aside>

        <main id="main">
          <table>
            <thead>
              <tr>
                <th>Person</th>
                <th>Wealth</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(resultsToShow) &&
                resultsToShow.map(({ id, name, money }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{`$${formatNumber(money)}`}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {entireWealth && (
            <dl style={{ paddingLeft: '0.5em' }}>
              <dt>Total Wealth</dt>
              <dd>{`$${formatNumber(entireWealth)}`}</dd>
            </dl>
          )}
        </main>
      </div>
    </div>
  );
}

TrvDomArrayMethods.propTypes = {
  userCount: PropTypes.number,
};
