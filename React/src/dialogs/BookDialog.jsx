import { React, useState } from "react";
import { useBookFields } from "../hooks/useBookFields";
import DialogBox from "../components/dialog_box/DialogBox";
import Input from "../components/input/Input";
import TextArea from "../components/textarea/TextArea";
import Select from "../components/select/Select";
import DatePicker from "../components/date_picker/DatePicker";
import "./BookDialog.css";

const DEFAULT_BOOK_DATA = {
    isbn: "",
    title: "",
    author: "",
    categories: "",
    publisher: "",
    edition: "",
    format: "",
    date: "",
    pages: "",
    copies: "",
    description: "",
    location: ""
};
const NEW_CATEGORY_LABEL = "Nova categoria";


export default function BookDialog({ updateTarget, onClose, onSubmit }) {
    const isUpdateDialog = !!updateTarget;
    const [bookData, setBookData] = useState(
        (isUpdateDialog) ? updateTarget.toFormData() : DEFAULT_BOOK_DATA
    );
    const [categoryAdd, setCategoryAdd] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const { categories, appendCategory } = useBookFields();

    function handleInputChange(name, value) {
        if(name === "categories" && value.includes(NEW_CATEGORY_LABEL)) {
            setCategoryAdd(true);
            return;
        }
        setBookData({ ...bookData, [name]: value });
    }

    
    function handleCategoryAdd(event) {
        if(event.key === "Enter") {
            if(newCategory && newCategory !== "") {
                appendCategory(newCategory);    
                if(!categories.includes(newCategory)) {
                    handleInputChange("categories", [...bookData.categories, newCategory]);
                }
            }
            setNewCategory("");
            setCategoryAdd(false);
        }else if(event.key === "Escape") {
            setCategoryAdd(false);
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formElement = event.target;
        if(!formElement.checkValidity()) {
            const firstInvalidInput = formElement.querySelector(":invalid");
            firstInvalidInput && firstInvalidInput.focus();
        }else {
            onSubmit(bookData);
            onClose();
        }
    }

    return (
        <DialogBox>
            <div className="book-dialog-container">
                <h3>
                    {(isUpdateDialog) ? "Editar livro" : "Adicionar novo livro"}
                </h3>
                <p>
                    {(isUpdateDialog) ? "Edite, abaixo, as informações desejadas e confirme suas alterações"
                        : "Preencha as informações abaixo para cadastrar um novo livro"}
                </p>
                <form name="book-dialog-form" noValidate onSubmit={handleFormSubmit}>
                    <Input
                        name="isbn"
                        type="text"
                        label="ISBN"
                        supportingText="Entre o ISBN do livro"
                        value={bookData.isbn}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        name="title"
                        type="text"
                        label="Título"
                        supportingText="Entre o título do livro"
                        value={bookData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        name="author"
                        type="text"
                        label="Autor(es)"
                        supportingText="Entre o(s) autor(es) do livro"
                        value={bookData.author}
                        onChange={handleInputChange}
                        required
                    />
                    {(categoryAdd) ? (
                        <Input
                            name="new-category"
                            type="text"
                            label="Nova categoria"
                            supportingText="Entre o rótulo da nova categoria e pressione enter"
                            onKeyDown={handleCategoryAdd}
                            onChange={(name, value) => setNewCategory(value)}
                            value={newCategory}
                            autofocus
                        />
                    ) : (
                        <Select
                            name="categories"
                            label="Categorias"
                            options={[...categories, "Nova categoria"]}
                            placeholder="Entre a(s) categoria(s) do livro"
                            value={bookData.categories}
                            onChange={handleInputChange}
                            multiple
                            formVariant
                        />
                    )}
                    <Input
                        name="publisher"
                        type="text"
                        label="Editora"
                        supportingText="Entre a editora do livro"
                        value={bookData.publisher}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="edition"
                        type="text"
                        label="Edição"
                        supportingText="Entre a edição do livro"
                        value={bookData.edition}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="format"
                        type="text"
                        label="Formato"
                        supportingText="Entre o formato do livro"
                        value={bookData.format}
                        onChange={handleInputChange}
                    />
                    <DatePicker
                        name="date"
                        label="Data de publicação"
                        supportingText="Selecione a data de publicação do livro"
                        value={bookData.date}
                        onChange={handleInputChange}
                        formVariant
                    />
                    <Input
                        name="pages"
                        type="number"
                        label="Páginas"
                        supportingText="Entre o número de páginas do livro"
                        minValue={1}
                        value={bookData.pages}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        name="copies"
                        type="number"
                        label="Cópias"
                        supportingText="Entre o número de cópias disponíveis do livro"
                        minValue={1}
                        value={bookData.copies}
                        onChange={handleInputChange}
                        required
                    />
                    <TextArea
                        name="description"
                        label="Descrição"
                        supportingText="Entre uma breve descrição para o livro"
                        value={bookData.description}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="location"
                        type="text"
                        label="Localização"
                        supportingText="Entre a localização do livro no acervo"
                        value={bookData.location}
                        onChange={handleInputChange}
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
                        <button
                            className="click-ripple-effect-light"
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </DialogBox>
    )
}
