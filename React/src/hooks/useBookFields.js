import { useState, useEffect } from "react";
import NetworkClient from "../utils/network_client";


export function useBookFields() {
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [formats, setFormats] = useState([]);
    const network = new NetworkClient(API_BASE_URL);

    function appendCategory(newCategory) {
        if(!categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
        }
    }

    useEffect(() => {
        network.fetchBookFieldValues("author")
        .then((authors) => setAuthors(
            authors.filter((value) => value && value !== "")
        ))
        .catch((error) => setAuthors(error));
        network.fetchBookFieldValues("categories")
        .then((categories) => setCategories(
            categories.filter((value) => value && value !== "")
        ))
        .catch((error) => setCategories(error));
        network.fetchBookFieldValues("publisher")
        .then((publishers) => setPublishers(
            publishers.filter((value) => value && value !== "")
        ))
        .catch((error) => setPublishers(error));
        network.fetchBookFieldValues("format")
        .then((formats) => setFormats(
            formats.filter((value) => value && value !== "")
        ))
        .catch((error) => setFormats(error));
    }, []);

    return { authors, categories, appendCategory, publishers, formats };
}
