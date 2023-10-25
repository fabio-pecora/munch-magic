import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        const getSession = async () => {
            const session = await supabase.auth.getSession();
            setSession(session.data.session);
        };
        getSession();
    }, []);

    const handleLogout = () => {
        setSession(null);
        supabase.auth.signOut();
    }

    async function handleLogin(email, password) {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            setSession(data.session);
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
            window.location.href = "/";
        }

        
    }

    return (
        <div className="login-container">
        {session && (
            <div>
                <h1>You're logged in!</h1>
                <p>{session.user.email}</p>
                <button onClick={handleLogout}>Log out</button>
                <button>
                <Link to="/">Go home</Link>
                </button>
    
            </div>
        )}
        <h2>Login</h2>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleLogin(email, password)} disabled={loading}>
            {loading ? "Loading..." : "Login"}
        </button>
    </div>
    )
}