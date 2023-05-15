import { useState, useEffect } from "react";
import NetworkClient from "../utils/network_client";
import Loan from "../models/loan";


export function useLoans() {
    const [loans, setLoans] = useState([]);
    const network = new NetworkClient(API_BASE_URL);

    useEffect(() => {
        const fetchTransformLoans = async () => {
            try {
                let loansData = await network.fetchLoans();
                setLoans(loansData.map((loanData, index) => new Loan(loanData, index)));
            }catch(exception) {
                setLoans(exception);
            }
        }

        fetchTransformLoans();
    }, []);

    return { loans };
}
