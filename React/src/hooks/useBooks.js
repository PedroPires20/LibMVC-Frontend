import { useState, useEffect } from "react";
import DataFetcher from "../utils/data_fetcher";
import Book from "../models/book";


export function useBooks() {
    const [books, setBooks] = useState([]);
    const dataFetcher = new DataFetcher("http://localhost:3000");

    useEffect(() => {
        dataFetcher.fetchBooks()
        .then((booksData) => setBooks(booksData.map(
            (bookData, index) => new Book(bookData, index)
        )))
        .catch((error) => setBooks(error));
    }, []);

    return { books };
}

