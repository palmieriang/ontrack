import React, { Fragment, useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
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

  const updateQueryString = (page) => {
    const params = new URLSearchParams(window.location.search);

    params.set('page', page);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }
  const pageChanged = e => {
    setCurrentPage(parseInt(e.target.text));
    updateQueryString(parseInt(e.target.text));
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
    <Container>
      {list.length > 0 ? (
        <Fragment>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author(s)</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {list.map((book) => (
                <tr key={book.id}>
                  <td>{book.book_title}</td>
                  <td>{book.book_author}</td>
                  <td>{book.book_publication_year}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationElement />
        </Fragment>
      ) : (
        <p>No book available</p>
      )}
    </Container>
  );
}

export default App;
