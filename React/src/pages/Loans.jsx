import { React, useEffect } from "react";
import Select from "../components/select/Select";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell } from "../components/table_card/TableCard";
import addIcon from "../assets/add_icon.svg";
import "./Loans.css";


export default function Loans() {
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
            <div className="loans-table-container">
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
                            <TableCell>Atrasado (S/N)</TableCell>
                            <TableCell>Renovação (S/N)</TableCell>
                        </TableRow>
                    </TableHeader>
                </TableCard>
            </div>
        </div>
    )
}
