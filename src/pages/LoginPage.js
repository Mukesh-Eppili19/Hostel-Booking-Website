import React from "react";
import { Link, Navigate } from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";
import './LoginPage.css'; // Import the CSS file containing the styles

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post("/login", {email,password});
            setUser(data);
            alert("Login successful");
            setRedirect(true);
            }
            catch (error) {
                console.error('Error:', error);
                alert("Login failed");

        } 
    };

    if (redirect) {
        return <Navigate to={"/home"} />;
    }

    return (
        <div className="container">
                <div className="login-page">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                <div className="extralinks">
                    <Link to="/signup">New User?Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
