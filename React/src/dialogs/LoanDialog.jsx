import { React, useState } from "react";
import { useBooks } from "../hooks/useBooks";
import DialogBox from "../components/dialog_box/DialogBox";
import Input from "../components/input/Input";
import Checkbox from "../components/checkbox/Checkbox";
import Select from "../components/select/Select";
import DatePicker from "../components/date_picker/DatePicker";
import StateDialog from "./StateDialog";
import "./LoanDialog.css";

const DEFAULT_LOAN_DATA = {
    reader: "",
    phone: "",
    bookId: "",
    startDate: "",
    duration: "",
    renew: false
};


export default function LoanDialog({ updateTarget, onClose, onSubmit }) {
    const isUpdateDialog = !!updateTarget;
    const [loanData, setLoanData] = useState(
        (isUpdateDialog) ? updateTarget.toFormData() : DEFAULT_LOAN_DATA
    );
    const [saveState, setSaveState] = useState({ saving: false, error: false });
    const { books } = useBooks();

    function handleInputChange(name, value) {
        setLoanData({ ...loanData, [name]: value });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const formElement = event.target;
        if(!formElement.checkValidity()) {
            const firstInvalidInput = formElement.querySelector(":invalid");
            firstInvalidInput && firstInvalidInput.focus();
        }else {
            setSaveState({ saving: true, error: false });
            let submitStatus = await onSubmit(loanData);
            if(!submitStatus.error) {
                onClose();
            }else {
                setSaveState({
                    saving: false,
                    error: true,
                    errorMessage: submitStatus.errorMessage
                });
            }
        }
    }

    return (
        <DialogBox>
            {(!saveState.saving && !saveState.error) ? (
                <div className="loan-dialog-container">
                    <h3>
                        {(isUpdateDialog) ? "Editar empréstimo" : "Novo empréstimo"}
                    </h3>
                    <p>
                        {(isUpdateDialog) ? "Edite, abaixo, as informações desejadas e confirme suas alterações"
                            : "Preencha as informações abaixo para cadastrar um novo empréstimo no sistema"}
                    </p>
                    <form name="loan-dialog-form" onSubmit={handleFormSubmit} noValidate>
                        <Input
                            name="reader"
                            type="text"
                            label="Leitor"
                            supportingText="Entre o nome do leitor"
                            onChange={handleInputChange}
                            value={loanData.reader}
                            required
                        />
                        <Input
                            name="phone"
                            type="text"
                            label="Telefone"
                            supportingText="Entre o telefone de contato do leitor"
                            onChange={handleInputChange}
                            value={loanData.phone}
                            validationPattern="\(\d{2,5}\)\s*9?\d{4}-?\d{4}"
                            errorMessage="Por favor, entre um número de telefone válido"
                            required
                        />
                        <Select
                            name="bookId"
                            label="Livro"
                            placeholder="Selecione o livro a ser emprestado"
                            options={books.map((book) => book.title)}
                            optionValues={books.map((book) => book.id)}
                            onChange={handleInputChange}
                            value={loanData.bookId}
                            formVariant
                            required
                        />
                        <DatePicker
                            name="startDate"
                            label="Data de início"
                            formVariant
                            onChange={handleInputChange}
                            value={loanData.startDate}
                            required
                        />
                        <Input
                            name="duration"
                            type="number"
                            label="Duração"
                            supportingText="Entre a duração do empréstimo (em dias)"
                            onChange={handleInputChange}
                            value={loanData.duration}
                            minValue={1}
                            required
                        />
                        <Checkbox
                            name="renew"
                            label="Renovação"
                            supportingText="Marque essa opção se estiver registrando a renovação de um empréstimo anterior"
                            onChange={handleInputChange}
                            value={loanData.renew}
                        />
                        <div className="book-dialog-buttons">
                            <button
                                className="click-ripple-effect-light"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                }}
                            >
                                Cancelar
                            </button>
                            <button className="click-ripple-effect-light">
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <StateDialog
                    variant={(saveState.error) ? "error" : "load"}
                    heading={(saveState.error) ? "Erro" : "Salvando"}
                    message={(saveState.error) ? "Ocorreu um erro ao salvar as alterações no sistema." : "As alterações estão sendo processadas pelo sistema"}
                    detailsSummary={(saveState.errorMessage && saveState.errorMessage !== "") && "Detalhes do erro"}
                    detailsContent={saveState.errorMessage}
                    onClose={onClose}
                />
            )}
        </DialogBox>
    )
}
