import React, { Fragment, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import * as qs from "qs";
import "./App.scss";
import BooksList from "./BooksList";
import PaginationElement from "./PaginationElement";
import { fetchBooks } from "./utils/api";

const App = () => {
  const queryString = window.location.search;
  const parsedQueryString = qs.parse(queryString, { ignoreQueryPrefix: true });

  const [list, setList] = useState({});
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(parsedQueryString.page) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchBooks(currentPage)
      .then((data) => {
        setList(data.books);
        setCount(data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [currentPage]);

  const updateQueryString = (page) => {
    const params = new URLSearchParams(window.location.search);

    params.set("page", page);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  const pageChanged = (event) => {
    if (event.target.text) {
      setCurrentPage(parseInt(event.target.text));
      updateQueryString(parseInt(event.target.text));
    }
  };

  if (isLoading) {
    return (
      <Container className="App">
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="App">
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container className="App">
      {list?.length > 0 ? (
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
        <p>No books available</p>
      )}
    </Container>
  );
};

export default App;
