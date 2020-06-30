import React, { Fragment, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import './App.scss';
import BooksList from './BooksList';
import PaginationElement from './PaginationElement';

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

  const updateQueryString = (page) => {
    const params = new URLSearchParams(window.location.search);

    params.set('page', page);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }

  const pageChanged = e => {
    setCurrentPage(parseInt(e.target.text));
    updateQueryString(parseInt(e.target.text));
  };

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
        <Fragment>
          <BooksList books={list} />
          <PaginationElement
            count={count}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            pageChanged={pageChanged}
          />
        </Fragment>
      ) : (
        <p>No book available</p>
      )}
    </Container>
  );
}

export default App;
