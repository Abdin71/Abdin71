import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEdit,
    faTrash,
    faArchive
} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, getUser } from '../../helpers/helpers';
import { getTodo, deleteTodo, editTodo } from '../../fetch';

export type Todo = {
    id: string,
    title: string,
    date: string,
    tag: string,
    status: string,
    priority: string,
    created_at: string,
    updated_at: string
}

const Todo = () => {
    const [todoData, setTodoData] = useState<Todo[]>(todos);
    const isLoggedIn = getUser();
    const [isDeleting, setIsDeleting] = useState(false);
    const [id, setId] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        //Fetch todo data
        const fetchData = async () => {
            const todo = await getTodo();
            //setTodoData(todo);
        };

        fetchData();
    }, []);

    const handleOpenModal = (id: string) => {
        setId(id);
        setIsDeleting(true);

    };
    const handleCloseModal = () => {
        setIsDeleting(false);
        setId("");
    };

    const handleDelete = async () => {
        if (id) {
            const token = getToken();
            const res = await deleteTodo(id, token);
            const todo = todoData.filter((todo) => todo.id !== id);
            setTodoData(todo);
            handleCloseModal();
        };
    };
    function handleArchive(id: string) {
        if (id !== "" && isChecked === true) {
            const token = getToken();
            const todo = todoData.find((todo) => todo.id === id);
            const completedTodo = { ...todo, status: "Completed" };
            const res = editTodo(completedTodo, token);
            const todos = todoData.filter((todo) => todo.id !== id);
            setTodoData(todos);
        }
    }

    function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(event.target.checked);
    }
    return (
        <div>
            <Tabs
                defaultActiveKey="/"
                id="centered-tabs"
                className="nav-fill mt-4 mb-4 container d-flex justify-content-center align-items-center w-50"
                variant="pills"

            >
                <Tab eventKey="/" title="Todo">
                    <div className="tab-content mx-auto w-75">
                        <div className="d-flex bd-highlight mb-3">
                            <div className="p-2 bd-highlight"><h3>Tasks</h3></div>
                            <div className="ms-auto p-2 bd-highlight">
                                <Link to="/addTodo">
                                    <Button type="button" className="btn btn-secondary">
                                        <FontAwesomeIcon icon={faPlus} size="xs" title="Add" className="fa-solid mx-2" />Add Item
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="table-responsive-sm">
                            <div className="d-flex justify-content-end"> </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {todoKeys.map((name, index) => (<th key={index} scope="col">{name}</th>))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        todoData && todoData.map((todo, index) => (
                                            <tr key={index}>
                                                <th scope="row"></th>
                                                <td><input className="form-check-input" type="checkbox" checked={isChecked} onChange={handleChecked} /></td>
                                                <td >{todo.title}</td>
                                                <td>{todo.date}</td>
                                                <td >{todo.tag}</td>
                                                <td>{todo.priority}</td>
                                                <td style={{ width: '5%' }}><Button variant="outline-primary" onClick={() => navigate("/editTodo", { state: { id: todo.id } })}><FontAwesomeIcon icon={faEdit} size="xs" title="Edit" className="fa-solid mx-2" /></Button></td>

                                                {isLoggedIn ? (
                                                    <>
                                                        <td style={{ width: '5%' }}><Button onClick={() => handleOpenModal(todo.id)} variant="outline-danger"><FontAwesomeIcon icon={faTrash} size="xs" title="Delete" className="fa-solid mx-2" /></Button></td>
                                                        <td style={{ width: '5%' }}><Button onClick={() => handleArchive(todo.id)} variant="outline-warning"><FontAwesomeIcon icon={faArchive} size="xs" title="Archive" className="fa-solid mx-2" /></Button></td>
                                                    </>
                                                ) : (

                                                    <td style={{ width: '5%' }}>
                                                        <Link to="/signin">
                                                            <Button type="button" variant="outline-danger" className="btn btn-secondary">
                                                                <FontAwesomeIcon icon={faTrash} size="xs" title="Delete" className="fa-solid mx-2" />
                                                            </Button>
                                                        </Link>
                                                    </td>
                                                )
                                                }
                                            </tr>

                                        )
                                        )
                                    }
                                </tbody>


                            </table>

                        </div>
                        {isDeleting && (
                            <div
                                className="modal fade show"
                                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                                tabIndex={-1}
                                role="dialog"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Delete Todo</h5>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete this Todo?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleDelete}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={handleCloseModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Tab>

                <Tab eventKey="completed" title="Completed">
                    <div className="tab-content mx-auto w-75">
                        <div className="d-flex bd-highlight mb-3">
                            <div className="p-2 bd-highlight"><h3>Tasks</h3></div>
                        </div>

                        <div className="table-responsive-sm">
                            <div className="d-flex justify-content-end"> </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {todoKeys.map((name, index) => (<th key={index} scope="col">{name}</th>))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        todoData && todoData.map((todo, index) => (
                                            <tr key={index}>
                                                <th scope="row"><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></th>
                                                <td >{todo.title}</td>
                                                <td>{todo.date}</td>
                                                <td >{todo.tag}</td>
                                                <td>{todo.priority}</td>
                                                <td style={{ width: '5%' }}><Button variant="outline-primary" onClick={() => navigate("/editTodo", { state: { id: todo.id } })}><FontAwesomeIcon icon={faEdit} size="xs" title="Edit" className="fa-solid mx-2" /></Button></td>

                                                {isLoggedIn ? (
                                                    <td style={{ width: '5%' }}><Button onClick={() => handleOpenModal(todo.id)} id="exampleModal" variant="outline-danger"><FontAwesomeIcon icon={faTrash} size="xs" title="Delete" className="fa-solid mx-2" /></Button></td>
                                                ) : (
                                                    <td style={{ width: '5%' }}>
                                                        <Link to="/signin">
                                                            <Button type="button" variant="outline-danger" className="btn btn-secondary">
                                                                <FontAwesomeIcon icon={faTrash} size="xs" title="Delete" className="fa-solid mx-2" />
                                                            </Button>
                                                        </Link>
                                                    </td>
                                                )
                                                }
                                            </tr>

                                        )
                                        )
                                    }
                                </tbody>


                            </table>

                        </div>
                        {isDeleting && (
                            <div
                                className="modal fade show"
                                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                                tabIndex={-1}
                                role="dialog"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Delete Todo</h5>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete this todo?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleDelete}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={handleCloseModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Tab>
                <Tab eventKey="overdue" title="Overdue">
                    <div className="tab-content mx-auto w-75">
                        <div className="d-flex bd-highlight mb-3">
                            <div className="p-2 bd-highlight"><h3>Tasks</h3></div>
                        </div>

                        <div className="table-responsive-sm">
                            <div className="d-flex justify-content-end"> </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {todoKeys.map((name, index) => (<th key={index} scope="col">{name}</th>))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        todoData && todoData.map((todo, index) => (
                                            <tr key={index}>
                                                <th scope="row"><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></th>
                                                <td >{todo.title}</td>
                                                <td>{todo.date}</td>
                                                <td >{todo.tag}</td>
                                                <td>{todo.priority}</td>
                                                <td style={{ width: '5%' }}><Button variant="outline-primary" onClick={() => navigate("/editTodo", { state: { id: todo.id } })}><FontAwesomeIcon icon={faEdit} size="xs" title="Edit" className="fa-solid mx-2" /></Button></td>

                                                {isLoggedIn ? (
                                                    <>
                                                        <td style={{ width: '5%' }}><Button onClick={() => handleOpenModal(todo.id)} id="exampleModal" variant="outline-danger"><FontAwesomeIcon icon={faTrash} size="xs" title="Delete" className="fa-solid mx-2" /></Button></td>
                                                        <td style={{ width: '5%' }}><Button onClick={() => handleArchive(todo.id)} variant="outline-warning"><FontAwesomeIcon icon={faArchive} size="xs" title="Archive" className="fa-solid mx-2" /></Button></td>
                                                    </>
                                                ) : (
                                                    <td style={{ width: '5%' }}>
                                                        <Link to="/signin">
                                                            <Button type="button" variant="outline-danger" className="btn btn-secondary">
                                                                <FontAwesomeIcon icon={faTrash} size="xs" title="Delete" className="fa-solid mx-2" />
                                                            </Button>
                                                        </Link>
                                                    </td>
                                                )
                                                }
                                            </tr>

                                        )
                                        )
                                    }
                                </tbody>


                            </table>

                        </div>
                        {isDeleting && (
                            <div
                                className="modal fade show"
                                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                                tabIndex={-1}
                                role="dialog"
                            >
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Delete Todo</h5>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete this todo?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleDelete}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={handleCloseModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </div>



    );
};
export default Todo;

const todos = [{
    "id": "123",
    "title": "Make a project proposal ",
    "date": "2025-02-01",
    "tag": "Coding projects",
    "status": "Completed",
    "priority": "Medium",
    "created_at": "2025-02-01",
    "updated_at": "2025-02-01"

},
{
    "id": "124",
    "title": "Send draft of project proposal",
    "date": "2025-02-01",
    "tag": "Coding projects",
    "status": "Completed",
    "priority": "Medium",
    "created_at": "2025-02-01",
    "updated_at": "2025-02-01"

}];

const todoKeys = ["Status", "Title", "Date", "Tag", "Priority",]