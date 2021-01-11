import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

const BooksList = ({ books }) => {
  const Book = books.map(
    ({ id, book_title, book_author, book_publication_year }) => (
      <tr key={id} data-testid="book-element">
        <td>{book_title}</td>
        <td>{book_author}</td>
        <td>{book_publication_year}</td>
      </tr>
    )
  );

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>{Book}</tbody>
    </Table>
  );
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      book_title: PropTypes.string,
      book_author: PropTypes.array,
      book_publication_year: PropTypes.number,
    })
  ),
};

export default BooksList;
