import { React, useEffect } from "react";
import { useLoans } from "../hooks/useLoans";
import Select from "../components/select/Select";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell, TableData } from "../components/table_card/TableCard";
import addIcon from "./assets/add_icon.svg";
import "./Loans.css";


export default function Loans() {
    const { loans } = useLoans();

    useEffect(() => {
        document.title = "LibMVC - Empréstimos"
    }, []);
    
    return (
        <div className="loans-page">
            <div className="loans-header">
                <h2>Empréstimos</h2>
                <Button variant="primary">
                    <div className="loans-add-button">
                        <img src={addIcon} alt="novo"/>
                        <span>Novo empréstimo</span>
                    </div>
                </Button>
            </div>
            <div className="loans-filters-card">
                <h3>Filtros</h3>
                <div className="loans-filters-inputs">
                    <div className="loan-select-container">
                        <Select label="Leitor" placeholder="Todos"/>
                    </div>
                    <div className="loan-select-container">
                        <Select label="Obra" placeholder="Todos"/>
                    </div>
                    <div className="loan-select-container">
                        <Select label="Data empréstimo" placeholder="Todos"/>
                    </div>
                    <div className="loan-select-container">
                        <Select label="Data devolução" placeholder="Todos"/>
                    </div>
                    <div className="loan-select-container">
                        <Select label="Atrasado" options={["Sim", "Não"]} placeholder="Todos"/>
                    </div>
                    <div className="loan-select-container">
                        <Select label="Renovação" options={["Sim", "Não"]} placeholder="Todos"/>
                    </div>
                    <div className="loan-button-container">
                        <Button variant="secondary">Aplicar</Button>
                    </div>
                </div>
            </div>
            <TableCard>
                <TableHeader>
                    <TableRow>
                        <TableCell>Leitor</TableCell>
                        <TableCell>Tel Contato</TableCell>
                        <TableCell>Obra</TableCell>
                        <TableCell>Data empréstimo</TableCell>
                        <TableCell>Duração</TableCell>
                        <TableCell>Data devolução</TableCell>
                        <TableCell>Dias restantes</TableCell>
                        <TableCell>Atrasado</TableCell>
                        <TableCell>Renovação</TableCell>
                    </TableRow>
                </TableHeader>
                <TableData>
                    {loans.map((loan) => (
                        <TableRow key={loan.id}>
                            <TableCell>
                                {loan.reader}
                            </TableCell>
                            <TableCell>
                                {loan.phone}
                            </TableCell>
                            <TableCell minWidth="15rem" wrap>
                                {loan.bookTitle}
                            </TableCell>
                            <TableCell>
                                {loan.startDate}
                            </TableCell>
                            <TableCell>
                                {loan.duration}
                            </TableCell>
                            <TableCell>
                                {loan.endDate}
                            </TableCell>
                            <TableCell>
                                {loan.daysRemaining}
                            </TableCell>
                            <TableCell>
                                {loan.late}
                            </TableCell>
                            <TableCell>
                                {loan.renew}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableData>
            </TableCard>
        </div>
    )
}
