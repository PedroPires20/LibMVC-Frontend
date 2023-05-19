import { useState, useEffect } from "react";
import NetworkClient from "../utils/network_client";


export function useLoanFields() {
    const [readers, setReaders] = useState("");
    const [bookTitles, setBookTitles] = useState("");
    const network = new NetworkClient(API_BASE_URL);

    useEffect(() => {
        network.fetchLoanFieldValues("reader")
        .then((readers) => setReaders(
            readers.filter((value) => value && value !== "")
        ))
        .catch((error) => setReaders(error));
        network.fetchLoanFieldValues("bookTitle")
        .then((titles) => setBookTitles(
            titles.filter((value) => value && value !== "")
        ))
        .catch((error) => setBookTitles(error));
    }, []);

    return { readers, bookTitles };
}
