import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const PaginationElement = ({ startPage, endPage, currentPage, totalPages, pageChanged }) => {
    let items = [];
    for (let number = startPage; number <= endPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={pageChanged}>
                {number}
            </Pagination.Item>,
        );
    };

    return (
        <Pagination>
            {startPage >= 2 && <Pagination.Ellipsis />}
            {items}
            {endPage < totalPages && <Pagination.Ellipsis />}
        </Pagination>
    );
}

PaginationElement.propTypes = {
    startPage: PropTypes.number,
    endPage: PropTypes.number,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    pageChanged: PropTypes.func,
};

export default PaginationElement;
