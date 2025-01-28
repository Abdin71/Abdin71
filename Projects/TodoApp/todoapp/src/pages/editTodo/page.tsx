import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from '../../helpers/helpers';
import { useState } from 'react';
import { editTodo } from '../../fetch';
import { useLocation } from "react-router-dom";
import { Todo } from "../todo/page";

const EditTodo = () => {
    const dateAdded = new Date().toLocaleDateString();
    const [inputs, setInputs] = useState<Todo>({
        id: "",
        title: "",
        date: "",
        tag: "",
        status: "",
        priority: "",
        created_at: "",
        updated_at: ""
    });
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));

    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo =
        {
            id: "",
            title: inputs.title,
            date: inputs.date,
            tag: inputs.tag,
            status: inputs.status,
            priority: inputs.priority,
            date_added: dateAdded
        };
        const token = getToken();
        const response = await editTodo(todo, token);
        if (response) {
            navigate("/");
        } else {
            setIsError(true);
        }
    };

    return (


        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form id="form" className="p-4 border rounded shadow-sm w-75" onSubmit={handleSubmit}>
                <h3 className="mb-4 text-center">Edit Todo</h3>
                <div className="mb-3">
                    <label htmlFor="formGroupAddTodoInput">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddTodoInput"
                        placeholder="Title"
                        required
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupAddTodoInput2">Deadline</label>
                    <input
                        type="date"
                        className="form-control"
                        id="formGroupAddTodoInput2"
                        placeholder="Deadline Date"
                        required
                        name="date"
                        value={inputs.date || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupAddTodoInput3">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddTodoInput3"
                        placeholder="Tag"
                        name="tag"
                        value={inputs.tag || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupAddTodoInput4">Status</label>
                    <select id="formGroupAddTodoInput4" name="status" value={inputs.status || ""} onChange={handleChange}>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupAddTodoInput5">Priority</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupAddTodoInput5"
                        placeholder="Priority"
                        name="priority"
                        value={inputs.priority || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="hidden"
                        className="form-control"
                        id="formGroupAddTodoInput6"
                        value={dateAdded} />
                </div>
                <div>{isError ? "Something went wrong, try again" : null}</div>

                <Button type="submit" className="btn btn-primary m-2">Submit</Button>
                <Link to="/">
                    <Button type="button" className="btn btn-secondary">
                        Cancel
                    </Button>
                </Link>
            </Form>
        </div>

    );

};
export default EditTodo;