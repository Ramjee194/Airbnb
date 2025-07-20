import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { useContext } from 'react';
import { AuthDataContext } from '../context/AuthContext'; // adjust path if needed
import { userDataContext } from '../context/UserContext';

const Signup = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(userDataContext)
    const { serverUrl } = useContext(AuthDataContext);
    const {loading,setLoading} =useContext(AuthDataContext)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const result = await axios.post(`${"https://airbnb-chpu.onrender.com"}/api/auth/signup`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
             setLoading(false)
            setUserData(result.data);

            console.log('Signup success:', result.data);
            navigate('/login'); // or navigate("/") — not both
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.message === 'user already exist') {
                    alert('An account with this email already exists. Please login.');
                    return;
                }
            }

            console.error('Unexpected signup error:', error.message);
            alert('Something went wrong. Try again.');
            setLoading(false)
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <FaArrowLeftLong
                    className="cursor-pointer text-red-600"
                    onClick={() => navigate("/")}
                />
                <h2 className="text-2xl font-bold text-center text-red-800">Welcome to Airbnb</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
                    disabled={loading}>
                        {loading ?"Loading...":"SignUp"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account? <a href="/login" className="text-red-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
