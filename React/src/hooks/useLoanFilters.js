import { useState, useEffect } from "react";
import NetworkClient from "../utils/network_client";


function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString();
}

export function useLoanFilters() {
    const [readers, setReaders] = useState("");
    const [bookTitles, setBookTitles] = useState("");
    const [startDates, setStartDates] = useState("");
    const [endDates, setEndDates] = useState("");
    const network = new NetworkClient(API_BASE_URL);

    useEffect(() => {
        network.fetchLoanFieldValues("reader")
        .then((readers) => setReaders(readers))
        .catch((error) => setReaders(error));
        network.fetchLoanFieldValues("bookTitle")
        .then((titles) => setBookTitles(titles))
        .catch((error) => setBookTitles(error));
        network.fetchLoanFieldValues("startDate")
        .then((startDates) => setStartDates(startDates.map(formatDate)))
        .catch((error) => setStartDates(error));
        network.fetchLoanFieldValues("endDate")
        .then((dates) => setEndDates(dates.map(formatDate)))
        .catch((error) => setEndDates(error));
    }, []);

    return { readers, bookTitles, startDates, endDates };
}
