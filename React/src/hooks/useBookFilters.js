import { useState, useEffect } from "react";
import NetworkClient from "../utils/network_client";


export function useBookFilters() {
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [formats, setFormats] = useState([]);
    const network = new NetworkClient(API_BASE_URL);

    useEffect(() => {
        network.fetchBookFieldValues("author")
        .then((authors) => setAuthors(authors))
        .catch((error) => setAuthors(error));
        network.fetchBookFieldValues("categories")
        .then((categories) => setCategories(categories))
        .catch((error) => setCategories(error));
        network.fetchBookFieldValues("publisher")
        .then((publishers) => setPublishers(publishers))
        .catch((error) => setPublishers(error));
        network.fetchBookFieldValues("format")
        .then((formats) => setFormats(formats))
        .catch((error) => setFormats(error));
    }, []);

    return { authors, categories, publishers, formats };
}
