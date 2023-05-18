import { useState, useEffect } from "react";
import { removeEmptyFilters } from "../utils/utils";
import NetworkClient from "../utils/network_client";
import Loan from "../models/loan";


export function useLoans() {
    const [filters, setFilters] = useState({});
    const [loans, setLoans] = useState([]);
    const network = new NetworkClient(API_BASE_URL);

    function handleFilters(filters) {
        setFilters(removeEmptyFilters(filters));
    }

    useEffect(() => {
        const fetchTransformLoans = async () => {
            try {
                let loansData = await network.fetchLoans(filters);
                setLoans(loansData.map((loanData, index) => new Loan(loanData, index)));
            }catch(exception) {
                setLoans(exception);
            }
        }

        fetchTransformLoans();
    }, [filters]);

    return { loans, handleFilters };
}
