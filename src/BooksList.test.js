import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import BooksList from "./BooksList";

jest.mock("./utils/api");

const books = [
  {
    book_author: ["Ανώνυμος"],
    book_pages: 104,
    book_publication_city: "Βενετία",
    book_publication_country: "Ιταλία",
    book_publication_year: 1529,
    book_title: "Ο Αλέξανδρος ο Μακεδών",
    id: 2086,
  },
  {
    book_author: ["Πολίτης, Ματθαίος"],
    book_pages: 32,
    book_publication_city: "Βενετία",
    book_publication_country: "Ιταλία",
    book_publication_year: 1548,
    book_title: "Διήγησις εις τας πράξεις του περιβοήτου στρατηγού των ρωμαίων μεγάλου Βελισαρίου",
    id: 2060,
  },
];

describe("BooksList", () => {
  it("should display the books list", async () => {
    render(<BooksList books={books} />);

    await waitFor(() => expect(screen.getByText(`${books[0].book_publication_year}`)).toBeInTheDocument());
    expect(screen.getByText(`${books[0].book_title}`)).toBeInTheDocument();
    expect(screen.getByText(`${books[0].book_author}`)).toBeInTheDocument();
  });
});
