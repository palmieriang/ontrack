import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import App from './App';
import { fetchBooks } from './utils/api';

jest.mock("./utils/api");

const data = {
  books: [{
    book_author: ["Ανώνυμος"],
    book_pages: 104,
    book_publication_city: "Βενετία",
    book_publication_country: "Ιταλία",
    book_publication_year: 1529,
    book_title: "Ο Αλέξανδρος ο Μακεδών",
    id: 2086,
  },
  {
    book_author: ["Ανώνυμος"],
    book_pages: 32,
    book_publication_city: "Βενετία",
    book_publication_country: "Ιταλία",
    book_publication_year: 1548,
    book_title: "Διήγησις εις τας πράξεις του περιβοήτου στρατηγού των ρωμαίων μεγάλου Βελισαρίου",
    id: 2060,
  }],
  count: 2425,
};

describe("App", () => {
  it("should fetch and display the books list", async () => {
    fetchBooks.mockResolvedValueOnce(data);

    render(<App />);

    await waitFor(() => expect(screen.getByText(`${data.books[0].book_publication_year}`)).toBeInTheDocument());
  });
});
