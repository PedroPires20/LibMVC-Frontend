import { writable } from "svelte/store";
import NetworkClient from "@common/utils/network_client";
import Book from "@common/models/book";
import { objectEquals } from "@common/utils/utils";


export function createBooks() {
    const { set, update, subscribe } = writable([]);
    let api = new NetworkClient(API_BASE_URL);
    let previousQuery;
    let previousFilters;

    async function queryBooks(queryText = "", filters = {}) {
        if(queryText !== previousQuery && !objectEquals(filters, previousFilters)) {
            try {
                let booksData = await api.searchBooks(queryText, filters, { title: 1 });
                set(booksData.map((bookData, index) => new Book(bookData, index)));
                previousQuery = queryText;
                previousFilters = filters;
            }catch(exception) {
                console.error("Error loading books: " + exception);
                throw exception;
            }
        }
    }

    return {
        subscribe,
        queryBooks
    };
}
