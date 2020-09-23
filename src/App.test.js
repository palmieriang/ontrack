import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { fetchBooks } from "./utils/api";

jest.mock('./utils/api');

const data = {
  books: [
    {
      book_author: ["Ανώνυμος"],
      book_pages: 104,
      book_publication_city: "Βενετία",
      book_publication_country: "Ιταλία",
      book_publication_year: 1529,
      book_title: "Ο Αλέξανδρος ο Μακεδών",
      id: 2086,
    }
  ]
};

const data2 = {
  books: [
    {
      book_author: ["Πολίτης, Ματθαίος"],
      book_pages: 32,
      book_publication_city: "Βενετία",
      book_publication_country: "Ιταλία",
      book_publication_year: 1548,
      book_title: "Διήγησις εις τας πράξεις του περιβοήτου στρατηγού των ρωμαίων μεγάλου Βελισαρίου",
      id: 2060,
    },
  ]
};

describe("App", () => {
  beforeEach(() => {
    fetchBooks.mockClear();
  })

  it("should fetch the books list", () => {
    fetchBooks.mockResolvedValueOnce(data);

    render(<App />);

    expect(fetchBooks).toHaveBeenCalled();
  });

  it("should display the books list", async () => {
    fetchBooks.mockResolvedValueOnce(data);

    render(<App />);

    await waitFor(() => expect(screen.getByText(`${data.books[0].book_publication_year}`)).toBeInTheDocument());
    expect(screen.getByText(`${data.books[0].book_title}`)).toBeInTheDocument();
    expect(screen.getByText(`${data.books[0].book_author}`)).toBeInTheDocument();
  });

  it("should fetch the books list again when page changed", async () => {
    fetchBooks.mockResolvedValueOnce(data).mockResolvedValueOnce(data2);

    render(<App />);

    await waitFor(() => expect(screen.getByText(`${data.books[0].book_publication_year}`)).toBeInTheDocument());

    const paginationElement = screen.getByRole('button', {name: /2/});
    userEvent.click(paginationElement);

    expect(fetchBooks).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(screen.getByText(`${data2.books[0].book_publication_year}`)).toBeInTheDocument());
    expect(screen.getByText(`${data2.books[0].book_title}`)).toBeInTheDocument();
    expect(screen.getByText(`${data2.books[0].book_author}`)).toBeInTheDocument();
  });
});
