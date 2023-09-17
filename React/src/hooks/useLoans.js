import { useState, useEffect } from "react";
import { removeEmptyFilters, objectEquals } from "@common/utils/utils";
import NetworkClient from "@common/utils/network_client";
import Loan from "@common/models/loan";


export function useLoans() {
    const [filters, setFilters] = useState({});
    const [loans, setLoans] = useState([]);
    const [loadStatus, setLoadStatus] = useState({ loading: false, error: false });
    const api = new NetworkClient(API_BASE_URL);

    useEffect(() => {
        setLoadStatus({ loading: true, error: false });
        const fetchTransformLoans = async () => {
            try {
                let loansData = await api.fetchLoans(filters, { reader: 1, bookTitle: 1, startDate: -1 });
                setLoans(loansData.map((loanData, index) => new Loan(loanData, index)));
                setLoadStatus({ loading: false, error: false });
            }catch(exception) {
                console.error("Error loading loans: " + exception);
                setLoadStatus({ loading: false, error: true, errorMessage: exception.message });
            }
        }

        fetchTransformLoans();
    }, [filters]);

    function filterLoans(inputFilters) {
        let newFilters = removeEmptyFilters(inputFilters);
        if(!objectEquals(filters, newFilters)) {
            setFilters(newFilters);
        }
    }

    async function createLoan(formData) {
        let newLoan = Loan.fromFormData(formData);
        try {
            let { createdId } = await api.createLoan(newLoan.toRequestBody());
            setLoans([...loans, Loan.fromFormData(formData, createdId)]);
        }catch(exception) {
            console.error("Error creating loan: " + exception.message);
            return { error: true, errorMessage: exception.message };
        }
        return { error: false };
    }

    async function updateLoan(index, formData) {
        let updatedLoan = Loan.fromFormData(formData, loans[index].id, index);
        let diff = loans[index].getFieldsDiff(updatedLoan);
        if(Object.keys(diff).length > 0) {
            try {
                await api.updateLoan(updatedLoan.id, diff);
                setLoans([
                    ...loans.slice(0, index),
                    updatedLoan,
                    ...loans.slice(index + 1)
                ]);
            }catch(exception) {
                console.error("Error updating loan: " + exception.message);
                return { error: true, errorMessage: exception.message };
            }
        }
        return { error: false };
    }

    async function deleteLoan(index) {
        try {
            await api.deleteLoan(loans[index].id);
            setLoans([...loans.slice(0, index), ...loans.slice(index + 1)]);
        }catch(exception) {
            console.error("Error deleting loan: " + exception.message);
            return { error: true, errorMessage: exception.message };
        }
        return { error: false };
    }

    return { loans, loadStatus, filterLoans, createLoan, updateLoan, deleteLoan };
}
