/* eslint-disable no-plusplus, no-param-reassign */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import heading from '../config/heading';

let movieId = 0;
let seatId = 0;
const movies = [
  {
    id: ++movieId,
    title: 'Avengers: Endgame',
    price: 10,
  },
  {
    id: ++movieId,
    title: 'Joker',
    price: 12,
  },
  {
    id: ++movieId,
    title: 'Toy Story 4',
    price: 8,
  },
  {
    id: ++movieId,
    title: 'The Lion King',
    price: 9,
  },
];

export default function TrvMovieSeatBooking() {
  const [selectedMoviePrice, setSelectedMoviePrice] = useState(null);
  const [seats, setSeats] = useState(
    Array(6)
      .fill()
      .map(() => ({ id: ++seatId, state: 'empty' }))
  );
  const occupiedSeats = useMemo(() => {
    const occupiedNum = seats.reduce((acc, cur) => {
      if (cur.state === 'occupied') acc += 1;
      return acc;
    }, 0);
    return { number: occupiedNum, price: occupiedNum * selectedMoviePrice };
  }, [seats, selectedMoviePrice]);
  const selectedMovieRef = useRef(null);

  const handleSeatClick = (id) => {
    setSeats((arr) =>
      arr.map((a) => {
        if (a.id === id) {
          a.state = a.state === 'empty' ? 'occupied' : 'empty';
        }
        return a;
      })
    );
  };

  useEffect(() => {
    const { value } = selectedMovieRef.current;
    setSelectedMoviePrice(Number(value));
  }, [selectedMovieRef]);

  return (
    <>
      <h1>{heading.trvMovieSeatBooking}</h1>
      <div>
        <label htmlFor="movie">
          Pick your favorite movie:{' '}
          <select
            name="movie"
            id="movie"
            ref={selectedMovieRef}
            onChange={() =>
              setSelectedMoviePrice(Number(selectedMovieRef.current.value))
            }
          >
            {movies.map(({ id, title: movieTitle, price: moviePrice }) => (
              <option
                value={moviePrice}
                key={id}
              >{`${movieTitle} ($${moviePrice})`}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        {seats.map(({ id, state: seatState }) => (
          <span key={id}>
            {' '}
            <button type="button" onClick={() => handleSeatClick(id)}>
              {seatState}
            </button>{' '}
          </span>
        ))}
      </div>
      <p
        style={{
          borderTop: '1px dashed rgba(255, 255, 255, 0.5)',
          marginTop: '1em',
          paddingTop: '1em',
        }}
      >
        You have selected {occupiedSeats.number} seats for a price of $
        {occupiedSeats.price}
      </p>
    </>
  );
}
