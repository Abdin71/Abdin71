import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router";
import { useState } from 'react';
import { setToken, setUser } from '../helpers/helpers';
import { loginUser } from '../fetch';

const SignIn = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await loginUser({
            username, // Set variables are that prev defined 
            password
        });

        if (token) {
            setToken(token);
            setUser(true);
            navigate("/");
        } else {
            console.error('Login failed.');
            setIsError(true);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form className="p-4 border rounded shadow-sm w-50" onSubmit={handleSubmit}>
                <h3 className="mb-4 text-center">Login</h3>
                <div className="mb-3">
                    <label for="UsernameInput">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="UsernameInput"
                        aria-describedby="UsernameInput"
                        placeholder="Enter username"
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="PasswordInput">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="PasswordInput"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isError ? "Wrong username or password, try again" : null}
                </div>
                <p id="formText" className="form-text text-muted"><Link to={""}>Forgot password?</Link></p>
                <Button type="submit" className="btn btn-primary m-2">Submit</Button>
                <div>
                    <p id="SignUpText" className="form-text text-muted"><Link to={"/signup"}>Create new account!</Link></p>
                </div>
            </Form>
        </div>

    );
};
export default SignIn;