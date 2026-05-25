import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    async function handleSubmit(e) {
        try {
            e.preventDefault();
            for (let field in data) {
                if (!data[field]) {
                    toast.error(`${field} is required`);
                    return;
                }
            }
            const response = await api.post("/auth/login",
                data,
                { headers: { "Content-Type": "application/json" } });

            if (response.data?.success) {
                toast.success("Login Successfully");
            }
            else {
                console.log(response);
                toast.error(response.data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Internal Server Error");
        }

    }
    return (
        <div className="login-page">

            <div className="login-container">

                {/* LEFT SIDE */}
                <div className="login-left">

                    <div className="login-overlay"></div>

                    <div className="login-left-content">
                        <h2>
                            Learn Smarter with AI
                        </h2>

                        <p>
                            Join thousands of students and
                            teachers using EduVerse to improve
                            learning outcomes.
                        </p>

                        <div className="quote-card">

                            <p>
                                “This platform completely changed
                                how we track student progress.”
                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="login-right">

                    <div className="login-form-container">

                        <h1>
                            Welcome Back 👋
                        </h1>

                        <p>
                            Login to continue to LearnOS
                        </p>

                        <form className="login-form" onSubmit={handleSubmit}>

                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                            />

                            <button type="submit">
                                Login
                            </button>

                        </form>

                        <div className="register-link">
                            Don’t have an account?
                            <Link to="/register">
                                Register
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;