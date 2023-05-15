import { useState, useEffect } from "react";
import NetworkClient from "../utils/network_client";
import Book from "../models/book";


export function useBooks() {
    const [books, setBooks] = useState([]);
    const network = new NetworkClient(API_BASE_URL);

    useEffect(() => {
        network.fetchBooks()
        .then((booksData) => setBooks(booksData.map(
            (bookData, index) => new Book(bookData, index)
        )))
        .catch((error) => setBooks(error));
    }, []);

    return { books };
}

