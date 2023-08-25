import { writable } from "svelte/store";
import NetworkClient from "@common/utils/network_client";


const DEFAULT_FIELD_STATE = { loading: true, error: false, fieldData: [] };

function getFieldSetter(fieldName) {
    return (set) => {
        let api = new NetworkClient(API_BASE_URL);
        set(DEFAULT_FIELD_STATE);
        api.fetchLoanFieldValues(fieldName)
        .then((fieldData) => {
            set({
                loading: false,
                error: false,
                fieldData: fieldData.filter((value) => value !== "")
            });
        })
        .catch((exception) => {
            set({ loading: false, error: exception.message || true });
        });
    }
}

export function createLoanFields() {
    const availableFields = {
        reader: writable(DEFAULT_FIELD_STATE, getFieldSetter("reader")),
        bookTitle: writable(DEFAULT_FIELD_STATE, getFieldSetter("bookTitle"))
    };

    function refreshLoanFields() {
        for(let field in availableFields) {
            getFieldSetter(field)(availableFields[field].set);
        }
    }

    return {
        reader: { subscribe: availableFields.reader.subscribe },
        bookTitle: { subscribe: availableFields.bookTitle.subscribe },
        refreshLoanFields
    };
}
