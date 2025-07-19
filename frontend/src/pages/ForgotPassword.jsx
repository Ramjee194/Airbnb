import React, { useState, useContext } from 'react';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const { serverURl } = useContext(userDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURl}/api/auth/forgot-password`, { email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-rose-600">Forgot Password</h2>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button type="submit" className="bg-rose-500 text-white w-full p-2 rounded">
          Send Reset Link
        </button>
        {msg && <p className="mt-4 text-center text-sm text-gray-600">{msg}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
