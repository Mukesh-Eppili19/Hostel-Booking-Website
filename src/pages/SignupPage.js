import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignupPage.css';
import axios from "axios";

function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        registrationNumber: '',
        mobileNumber: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signup', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                alert('Registered successfully ')
                setMessage('Registered successfully');
                navigate('/login');
            } else {
                setErrors(response.data.errors || [response.data.message]);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors(['An error occurred. Please try again later.']);
        }
    };

    return (
        <div className="container">
            <div className="signup-page">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                    <input type="number" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} />
                    <input type="number" name="registrationNumber" placeholder="Registration Number" value={formData.registrationNumber} onChange={handleChange} />
                    <input type="number" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                    <div>
                        <label>Gender</label>
                        <div className="radio-option">
                            <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="radio-option">
                            <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p>{message}</p>}
                {errors.length > 0 && errors.map((error, index) => (
                    <p key={index}>{error.msg || error}</p>
                ))}
                <div className="text-center py-2 text-gray-500">
                    Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
