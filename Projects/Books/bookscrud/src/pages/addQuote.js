import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from '../helpers/helpers';
import { useState } from 'react';
import { addQoute } from '../fetch';

const AddQuote = () => {
    const [inputs, setInputs] = useState({});
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const quote =
        {
            quote: inputs.quote,
            author: inputs.author,
            book: inputs.book,
        };
        //Get token and send request
        const token = getToken();
        const response = await addQoute(quote, token);

        if (response) {
            navigate("/");
        } else {
            setIsError(true);
        }
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form id="form" className="p-4 border rounded shadow-sm w-75" onSubmit={handleSubmit}>
                <h3 className="mb-4 text-center">Add a Quote</h3>
                <div className="mb-3">
                    <label for="formGroupAddQuoteInput">Quote</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddQuoteInput"
                        placeholder="Quote"
                        required
                        name="quote"
                        value={inputs.quote || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="formGroupAddQuoteInput2">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddQuoteInput2"
                        placeholder="Author"
                        name="author"
                        value={inputs.author || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="formGroupAddQuoteInput3">Book</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddQuoteInput3"
                        placeholder="Book"
                        name="book"
                        value={inputs.book || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>{isError ? "Wrong input, try again" : null}</div>
                <Button type="submit" className="btn btn-primary m-2">Submit</Button>
                <Button as={Link} className="btn btn-secondary" to="/quotes">Cancel</Button>
            </Form>
        </div>
    );
};
export default AddQuote;