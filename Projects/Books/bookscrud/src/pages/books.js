import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEdit,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, getUser } from '../helpers/helpers';
import { getBooks, deleteBook } from '../fetch';


const Books = () => {
    const [booksData, setBooksData] = useState("");
    const isLoggedIn = getUser();
    const [isDeleting, setIsDeleting] = useState(false);
    const [id, setId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        //Fetch book data
        const fetchData = async () => {
            const books = await getBooks();
            setBooksData(books);
        };

        fetchData();
    }, []);

    const handleOpenModal = (id) => {
        setId(id);
        setIsDeleting(true);

    };
    const handleCloseModal = () => {
        setIsDeleting(false);
        setId(null);
    };

    const handleDelete = async () => {
        if (id) {
            const token = getToken();
            const res = await deleteBook(id, token);
            const books = booksData.filter((book) => book.id !== id);
            setBooksData(books);
            handleCloseModal();
        };
    };
    return (
        <div>
            <div>
                <Tabs
                    defaultActiveKey="Home"
                    id="fill-tab-example"
                    className="mb-3"
                    onSelect={(eventKey) => {
                        if (eventKey === "Quotes") navigate("/quotes");
                    }}
                >
                    <Tab eventKey="Home" title="Books">
                    </Tab>
                    <Tab eventKey="Quotes" title="Quotes">
                    </Tab>
                </Tabs>

            </div>

            <div className="table-responsive-sm">
                <div className="d-flex justify-content-end"> </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            {booksKeys.map((name, index) => (<th key={index} scope="col">{name}</th>))}
                            <th><Button as={Link} to="/addBook"><FontAwesomeIcon icon={faPlus} size="xs" title="Add" className="fa-solid mx-2" />Add Book</Button></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            booksData && booksData.map((book, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td >{book.title}</td>
                                    <td>{book.author}</td>
                                    <td >{book.publication_date}</td>
                                    <td>{book.publisher}</td>
                                    <td >{book.isbn}</td>
                                    <td>{book.pages}</td>
                                    <td >{book.genre}</td>
                                    <td>{book.date_added}</td>
                                    <td style={{ width: '10%' }}><Button variant="outline-primary" onClick={() => navigate("/editBook", { state: { id: book.id } })}><FontAwesomeIcon icon={faEdit} size="xs" title="Edit" className="fa-solid mx-2" />Edit</Button></td>

                                    {isLoggedIn ? (
                                        <td><Button onClick={() => handleOpenModal(book.id)} id="exampleModal" variant="outline-danger"><FontAwesomeIcon icon={faTrash} size="xs" title="Delete" className="fa-solid mx-2" />Delete</Button></td>
                                    ) : (
                                        <td><Button variant="outline-danger" as={Link} to="/signin"><FontAwesomeIcon icon={faTrash} size="xs" title="Delete" className="fa-solid mx-2" />Delete</Button></td>
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
                    tabIndex="-1"
                    role="dialog"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Book</h5>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this book?</p>
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

    );
};
export default Books;

const book =
    [
        {
            "title": "book",
            "author": "desc",
            "publication_date": "2021-11-01",
            "publisher": "ABZ",
            "isbn": "971827554412",
            "pages": 100,
            "genre": "Fiction",
            "date_added": "2021-11-01"
        },
        {
            "title": "bookbook",
            "publication_date": "2021-11-01",
            "author": "desc",
            "publisher": "ABZ",
            "isbn": "971827554412",
            "pages": 100,
            "genre": "Fiction",
            "date_added": "2021-11-01"
        }
    ];

const booksKeys = Object.keys(book[0]);