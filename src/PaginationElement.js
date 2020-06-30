import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const PaginationElement = ({ count, itemsPerPage, currentPage, pageChanged }) => {
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

PaginationElement.propTypes = {
    count: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    pageChanged: PropTypes.func,
};

export default PaginationElement;
