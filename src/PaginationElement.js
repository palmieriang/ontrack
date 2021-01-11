import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";
import paginate from "jw-paginate";

const PaginationElement = ({
  count,
  currentPage,
  itemsPerPage,
  pageChanged,
}) => {
  const { startPage, endPage, totalPages } = paginate(
    count,
    currentPage,
    itemsPerPage
  );

  let items = [];
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={pageChanged}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination data-testid="pagination-element">
      {startPage >= 2 && <Pagination.Ellipsis />}
      {items}
      {endPage < totalPages && <Pagination.Ellipsis />}
    </Pagination>
  );
};

PaginationElement.propTypes = {
  count: PropTypes.number,
  endPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  totalPages: PropTypes.number,
  pageChanged: PropTypes.func,
};

export default PaginationElement;
