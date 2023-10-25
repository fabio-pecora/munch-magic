import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Register.css"

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
                window.location.href = "/";
            }
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="background min-h-screen min-w-max">
        <div className="register-container flex flex-col items-center justify-center h-screen bg-gray-200" style={{backgroundImage: "url(https://i.pinimg.com/736x/48/33/a1/4833a159996e2d0e982dfa3d6fbf7c0a.jpg)"}} >
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
    </div>
    )
}