import React, { useState } from 'react';
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from './components/NavBar';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleRegister(email, password, username) {
        // ... existing code ...
    }

    return (
        <>
        <NavBar />
        <div className=" main">
        <section className='body'>
            <div className="signup-page">
                <div className="signup-container">
                    <h2>Register</h2>
                    <div className="underline"></div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mb-4 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-4 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-4 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                            />
                        </div>
                        <div className="submit-container">
                            <button
                                className={`submit ${loading ? "gray" : ""}`}
                                onClick={() => handleRegister(email, password, username)}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Register"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        
        </div>
        <Footer />
        </>
    )
}