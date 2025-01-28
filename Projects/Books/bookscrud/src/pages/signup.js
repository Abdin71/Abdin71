import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";
import { useState } from 'react';
import { loginUser } from '../fetch';




const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await loginUser({
            username,
            password
        });
        if (user) {
            navigate("/signin");
        } else {
            console.error('Sign up failed.');
            setIsError(true);
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form className="p-4 border rounded shadow-sm w-50" onSubmit={handleSubmit}>
                <h3 className="mb-4 text-center">Sign up</h3>
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
                        onChange={(e) => setUsername(e.target.value)}
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
                    {isError ? "Something went, try again" : null}
                </div>
                <Button type="submit" class="btn btn-primary">Submit</Button>
            </Form>
        </div>
    );
};
export default SignUp;