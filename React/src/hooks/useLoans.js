import { useState, useEffect } from "react";
import { removeEmptyFilters } from "../utils/utils";
import NetworkClient from "../utils/network_client";
import Loan from "../models/loan";


export function useLoans() {
    const [filters, setFilters] = useState({});
    const [loans, setLoans] = useState([]);
    const api = new NetworkClient(API_BASE_URL);

    function handleFilters(filters) {
        setFilters(removeEmptyFilters(filters));
    }

    async function createLoan(formData) {
        let newLoan = Loan.fromFormData(formData);
        try {
            let { createdId } = await api.createLoan(newLoan.toRequestBody());
            setLoans([...loans, Loan.fromFormData(formData, createdId)]);
        }catch(exception) {
            console.log("Error creating loan: " + exception.message);
        }
    }

    async function updateLoan(index, formData) {
        let updatedLoan = Loan.fromFormData(formData, loans[index].id, index);
        let diff = loans[index].getFieldsDiff(updatedLoan);
        try {
            await api.updateLoan(updatedLoan.id, diff);
            setLoans([
                ...loans.slice(0, index),
                updatedLoan,
                ...loans.slice(index + 1)
            ]);
        }catch(exception) {
            console.log("Error updating loan: " + exception.message);
        }
    }

    async function deleteLoan(index) {
        try {
            await api.deleteLoan(loans[index].id);
            setLoans([...loans.slice(0, index), ...loans.slice(index + 1)]);
        }catch(exception) {
            console.log("Error deleting loan: " + exception.message);
        }
    }

    useEffect(() => {
        const fetchTransformLoans = async () => {
            try {
                let loansData = await api.fetchLoans(filters);
                setLoans(loansData.map((loanData, index) => new Loan(loanData, index)));
            }catch(exception) {
                setLoans(exception);
            }
        }

        fetchTransformLoans();
    }, [filters]);

    return { loans, handleFilters, createLoan, updateLoan, deleteLoan };
}
