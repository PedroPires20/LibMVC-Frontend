import { useState, useEffect } from "react";
import NetworkClient from "../utils/network_client";
import Book from "../models/book";


function removeEmptyFilters([filterEntry, value]) {
    if(Array.isArray(value)) {
        return value.length > 0;
    }
    return value && value !== "";
}

export function useBooks() {
    const [query, setQuery] = useState({});
    const [books, setBooks] = useState([]);
    const network = new NetworkClient(API_BASE_URL);

    function handleQuery(queryText, filters) {
        let newQuery = {};
        if(queryText) {
            newQuery.text = queryText;
        }
        newQuery.filters = Object.fromEntries(
            Object.entries(filters).filter(removeEmptyFilters)
        );
        setQuery(newQuery);
    }

    useEffect(() => {
        network.searchBooks(query.text, query.filters)
        .then((booksData) => setBooks(booksData.map(
            (bookData, index) => new Book(bookData, index)
        )))
        .catch((error) => setBooks(error));
    }, [query]);

    return { books, handleQuery };
}

