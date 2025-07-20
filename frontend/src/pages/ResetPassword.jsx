import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://airbnb-chpu.onrender.com/api/auth/reset-password/${token}`, { password });
      setSuccess(true);
    } catch (err) {
      setError("Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        {success ? (
          <p className="text-green-600">Password updated! You can now log in.</p>
        ) : (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 mb-4 rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
              Reset Password
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </>
        )}
      </form>
    </div>
  );
}

export default ResetPassword;
