import { useState, useEffect } from "react";
import { removeEmptyFilters } from "../utils/utils";
import NetworkClient from "../utils/network_client";
import Book from "../models/book";


export function useBooks() {
    const [query, setQuery] = useState({});
    const [books, setBooks] = useState([]);
    const api = new NetworkClient(API_BASE_URL);

    function handleQuery(queryText, filters) {
        let newQuery = {};
        if(queryText) {
            newQuery.text = queryText;
        }
        newQuery.filters = removeEmptyFilters(filters);
        setQuery(newQuery);
    }

    async function createBook(formData) {
        let newBook = Book.fromFormData(formData);
        try {
            await api.createBook(newBook.toRequestBody());
            setBooks([...books, newBook]);
        }catch(exception) {
            console.log("Error creating book: " + exception.message);
        }
    }

    useEffect(() => {
        api.searchBooks(query.text, query.filters)
        .then((booksData) => setBooks(booksData.map(
            (bookData, index) => new Book(bookData, index)
        )))
        .catch((error) => setBooks(error));
    }, [query]);

    return { books, handleQuery, createBook };
}
