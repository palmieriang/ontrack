import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [list, setList] = useState({});
  console.info('list', list);

  useEffect(() => {
    const url = 'http://nyx.vima.ekt.gr:3000/api/books';
    const requestOptions = {
      method: 'POST',
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        setList(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
