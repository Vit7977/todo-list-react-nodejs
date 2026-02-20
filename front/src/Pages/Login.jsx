import axios from 'axios';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const [showPass, setShowPass] = useState(false);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9090/api/usuario/login', { email, senha })

            const {token} = response.data;

            localStorage.setItem('token', token);

            console.log("Login realizado com sucesso!");
            alert("Login realizado com sucesso!");

        } catch (error) {
            console.error(error.message);

            alert("Erro de login!")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-zinc-900 to-zinc-800">
            <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    LOGIN
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <input
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        type="email"
                        placeholder="Digite seu email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition pr-12"
                            type={showPass ? "text" : "password"}
                            placeholder="Digite sua senha"
                            minLength={6}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg"
                        type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;