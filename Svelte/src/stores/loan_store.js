import { writable } from "svelte/store";
import NetworkClient from "@common/utils/network_client";
import Loan from "@common/models/loan";
import { removeEmptyFilters, objectEquals } from "@common/utils/utils";


export function createLoans() {
    let api = new NetworkClient(API_BASE_URL);
    let previousFilters;
    const loadStatus = writable({ loading: false, error: false });
    const selectedLoans = writable([]);

    async function fetchLoans(filters = {}) {
        let newFilters = removeEmptyFilters(filters);
        if(!objectEquals(previousFilters, newFilters)) {
            try {
                loadStatus.set({ loading: true, error: false });
                let loansData = await api.fetchLoans(
                    newFilters,
                    { reader: 1, bookTitle: 1, startDate: -1 }
                );
                selectedLoans.set(
                    loansData.map((loanData, index) => new Loan(loanData, index))
                );
                loadStatus.set({ loading: false, error: false });
                previousFilters = newFilters;
            }catch(exception) {
                console.error("Error loading loans: " + exception);
                loadStatus.set({ loading: false, error: true, errorMessage: exception?.message });
            }
        }
    }

    async function createLoan(formData) {
        let newLoan = Loan.fromFormData(formData);
        try {
            let createdId = await api.createLoan(newLoan.toRequestBody());
            selectedLoans.update((loans) => [...loans, Loan.fromFormData(formData, createdId)]);
        }catch(exception) {
            console.error("Error creating loan: " + exception);
            return { error: true, errorMessage: exception?.message };
        }
        return { error: false };
    }

    return {
        loadStatus: { subscribe: loadStatus.subscribe },
        selectedLoans: { subscribe: selectedLoans.subscribe },
        fetchLoans,
        createLoan
    };
}
