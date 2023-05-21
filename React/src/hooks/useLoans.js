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

    return { loans, handleFilters, createLoan };
}
