import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import './App.scss';

const url = `http://nyx.vima.ekt.gr:3000/api/books`;
const fetchBooks = (page) => fetch(url, {
    method: 'POST',
    body: JSON.stringify({ page }),
  })
  .then(response => response.json());

const App = () => {
  const [list, setList] = useState({});
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    fetchBooks(currentPage)
      .then(data => {
        console.log(data.books);
        setList(data.books);
        setCount(data.count);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, [itemsPerPage, currentPage]);

  const pageChanged = e => {
    setCurrentPage(parseInt(e.target.text));
  };

  const PaginationElement = () => {
    let items = [];
    for (let number = 1; number <= count/itemsPerPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={pageChanged}>
          {number}
        </Pagination.Item>,
      );
    }
    return <Pagination>{items}</Pagination>;
  }

  if(isLoading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Container className="App">
      {list.length > 0 ? (
        <div>
          {list.map((book) => <p key={book.id}>{book.book_title}</p>)}
          <PaginationElement />
        </div>
      ) : (
        <p>No book available</p>
      )}
    </Container>
  );
}

export default App;
