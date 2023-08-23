import { writable } from "svelte/store";
import NetworkClient from "@common/utils/network_client";


const DEFAULT_FIELD_STATE = { loading: true, error: false, fieldData: [] };

function getFieldSetter(fieldName) {
    return async (set) => {
        let api = new NetworkClient(API_BASE_URL);
        set(DEFAULT_FIELD_STATE);
        try {
            let fieldData = await api.fetchBookFieldValues(fieldName);
            set({
                loading: false,
                error: false,
                fieldData: fieldData.filter((value) => value !== "")
            });
        }catch(exception) {
            set({ loading: false, error: exception.message || true });
        }
    }
}

export function createBookFields() {
    const availableFields = {
        author: writable(DEFAULT_FIELD_STATE, getFieldSetter("author")),
        categories: writable(DEFAULT_FIELD_STATE, getFieldSetter("categories")),
        publisher: writable(DEFAULT_FIELD_STATE, getFieldSetter("publisher")),
        format: writable(DEFAULT_FIELD_STATE, getFieldSetter("format"))
    };

    function appendCategory(newCategory) {
        availableFields.categories.update((categoryValues) => {
            if(!categoryValues.fieldData.includes(newCategory)) {
                return {
                    ...categoryValues,
                    fieldData: [ ...categoryValues.fieldData, newCategory ]
                };
            }
            return categoryValues;
        });
    }

    function refreshBookFields() {
        for(let field in availableFields) {
            getFieldSetter(field)(availableFields[field].set);
        }
    }

    return {
        author: { subscribe: availableFields.author.subscribe },
        categories: {
            subscribe: availableFields.categories.subscribe,
            appendCategory
        },
        publisher: { subscribe: availableFields.publisher.subscribe },
        format:  { subscribe: availableFields.format.subscribe },
        refreshBookFields
    };
}
