import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from '../helpers/helpers';
import { useState } from 'react';
import { editBook } from '../fetch';
import { useLocation } from "react-router-dom";

const EditBook = () => {
    const dateAdded = new Date().toLocaleDateString();
    const [inputs, setInputs] = useState({});
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const book =
        {
            //Set id from navigation
            id: location?.state?.id,
            title: inputs.title,
            author: inputs.author,
            publication_date: inputs.publication_date,
            publisher: inputs.publisher,
            isbn: inputs.isbn,
            pages: inputs.pages,
            genre: inputs.genre,
            date_added: dateAdded
        };
        const token = getToken();
        const response = await editBook(book, token);
        if (response) {
            navigate("/");
        } else {
            setIsError(true);
        }
    };

    return (


        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form id="form" className="p-4 border rounded shadow-sm w-75" onSubmit={handleSubmit}>
                <h3 class="mb-4 text-center">Edit Book</h3>
                <div className="mb-3">
                    <label for="formGroupAddBookInput">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddBookInput"
                        placeholder="Title"
                        required
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="formGroupAddBookInput2">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddBookInput2"
                        placeholder="Author"
                        name="author"
                        value={inputs.author || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="formGroupAddBookInput3">Publication Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="formGroupAddBookInput3"
                        placeholder="Publication Date"
                        required
                        name="publication_date"
                        value={inputs.publication_date || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="formGroupAddBookInput4">Publisher</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddBookInput4"
                        placeholder="Publisher"
                        name="publisher"
                        value={inputs.publisher || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="formGroupAddBookInput5">ISBN</label>
                    <input
                        type="number"
                        className="form-control"
                        id="formGroupAddBookInput5"
                        placeholder="ISBN"
                        name="isbn"
                        value={inputs.isbn || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="formGroupAddBookInput6">Pages</label>
                    <input
                        type="number"
                        className="form-control"
                        id="formGroupAddBookInput6"
                        placeholder="Pages"
                        name="pages"
                        value={inputs.pages || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="formGroupAddBookInput7">Genre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddBookInput7"
                        placeholder="Genre"
                        name="genre"
                        value={inputs.genre || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="hidden"
                        className="form-control"
                        id="formGroupAddBookInput8"
                        value={dateAdded} />
                </div>
                <div>{isError ? "Wrong input, try again" : null}</div>

                <Button type="submit" className="btn btn-primary m-2">Submit</Button>
                <Button as={Link} className="btn btn-secondary" to="/">Cancel</Button>
            </Form>
        </div>

    );

};
export default EditBook;