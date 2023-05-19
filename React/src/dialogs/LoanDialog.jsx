import { React } from "react";
import DialogBox from "../components/dialog_box/DialogBox";
import Input from "../components/input/Input";
import Checkbox from "../components/checkbox/Checkbox";
import TextArea from "../components/textarea/TextArea";
import Select from "../components/select/Select";
import DatePicker from "../components/date_picker/DatePicker";
import "./LoanDialog.css";


export default function LoanDialog() {
    return (
        <DialogBox>
            <div className="loan-dialog-container">
                <h3>Novo empréstimo</h3>
                <p>Preencha as informações abaixo para cadastrar um novo empréstimo no sistema</p>
                <form name="loan-dialog-form" onSubmit={(e) => e.preventDefault()}>
                    <Input type="text" label="Leitor" supportingText="Entre o nome do leitor"/>
                    <Input type="text" label="Telefone" supportingText="Entre o telefone de contato do leitor"/>
                    <Input type="text" label="Leitor" supportingText="Entre o nome do leitor"/>
                    <Select label="Livro" placeholder="Selecione o livro a ser emprestado" formVariant/>
                    <DatePicker label="Data de início" formVariant/>
                    <Input type="number" label="Duração" supportingText="Entre a duração do empréstimo (em dias)"/>
                    <Checkbox label="Renovação" supportingText="Marque essa opção se estiver registrando a renovação de um empréstimo anterior"/>
                </form>
                <div className="book-dialog-buttons">
                    <button className="click-ripple-effect-light">Cancelar</button>
                    <button className="click-ripple-effect-light">Confirmar</button>
                </div>
            </div>
        </DialogBox>
    )
}
