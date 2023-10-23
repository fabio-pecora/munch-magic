import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleRegister(email, password, username) {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            console.log(data);
            console.log(username);
            if (data) {
                const { data, error } = await supabase
                    .from('user')
                    .insert([
                      { username: username, email: email},
                    ])
                    .select();
                    console.log(data);
                if (error) throw error;
                navigate("/login");
            }
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="register-container flex flex-col items-center justify-center h-screen bg-gray-200">
        <h2 className="mb-4 text-2xl font-bold text-gray-700">Register</h2>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        />
        <button onClick={() => handleRegister(email, password, username)} disabled={loading} className="mb-4 p-2 w-64 text-white bg-blue-500 rounded hover:bg-blue-400">
            {loading ? "Loading..." : "Register"}
        </button>
    </div>
    )
}