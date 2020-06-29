import React, { useState, useEffect } from 'react';
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
        setList(data.books);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="App">
      {list.length > 0 ? (
        <ul>
          {list.map((book) => <li key={book.id}>{book.book_title}</li>)}
        </ul>
      ) : (
        <p>Test</p>
      )}
    </div>
  );
}

export default App;
