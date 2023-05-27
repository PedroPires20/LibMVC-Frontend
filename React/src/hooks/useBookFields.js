import { useState, useEffect } from "react";
import NetworkClient from "../utils/network_client";

const DEFAULT_FIELD_STATE = { loading: true, error: false, fieldData: [] };


export function useBookFields() {
    const [authors, setAuthors] = useState(DEFAULT_FIELD_STATE);
    const [categories, setCategories] = useState(DEFAULT_FIELD_STATE);
    const [publishers, setPublishers] = useState(DEFAULT_FIELD_STATE);
    const [formats, setFormats] = useState(DEFAULT_FIELD_STATE);
    const api = new NetworkClient(API_BASE_URL);

    function appendCategory(newCategory) {
        if(!categories.includes(newCategory)) {
            setCategories({...categories, fieldData: [...categories.fieldData, newCategory]});
        }
    }

    useEffect(() => {
        const loadBookFields = async () => {
            try {
                let authorsData = await api.fetchBookFieldValues("author");
                setAuthors({
                    loading: false,
                    error: false,
                    fieldData: authorsData.filter((value) => value && value !== "")
                });
            }catch(exception) {
                setAuthors({ loading: false, error: exception.message || true });
            }
            try {
                let categoriesData = await api.fetchBookFieldValues("categories");
                setCategories({
                    loading: false,
                    error: false,
                    fieldData: categoriesData.filter((value) => value && value !== "")
                });
            }catch(exception) {
                setCategories({ loading: false, error: exception.message || true });
            }
            try {
                let publishersData = await api.fetchBookFieldValues("publisher");
                setPublishers({
                    loading: false,
                    error: false,
                    fieldData: publishersData.filter((value) => value && value !== "")
                });
            }catch(exception) {
                setPublishers({ loading: false, error: exception.message || true });
            }
            try {
                let formatsData = await api.fetchBookFieldValues("format");
                setFormats({
                    loading: false,
                    error: false,
                    fieldData: formatsData.filter((value) => value && value !== "")
                });
            }catch(exception) {
                setFormats({ loading: false, error: exception.message || true });
            }
        }
            
        loadBookFields();
    }, []);

    return { authors, categories, appendCategory, publishers, formats };
}
