import { useState } from "react";
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import Alert from '../Components/Alert';

function Cadastrar() {
    const [showPass, setShowPass] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [alert, setAlert] = useState({
        show: false,
        type: "error",
        message: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:9090/api/usuario', { nome, email, senha })

            setAlert({
                show: true,
                type: "success",
                message: data.msg || "Usuário cadastrado com sucesso!"
            });

            setNome("");
            setEmail("");
            setSenha("");

            setTimeout(() => {
                navigate('/login');
            }, 1000);

        } catch (error) {
            const msg =
                error.response?.data?.msg || "Erro ao cadastrar!";

            setAlert({
                show: true,
                type: "error",
                message: msg
            });

            setTimeout(() => {
                setAlert(prev => ({ ...prev, show: false }));
            }, 3000);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-zinc-900 to-zinc-800">

            {alert.show && (
                <div className="fixed top-5 right-5 z-50 min-w-2xs shadow-lg animate-slide-in">
                    <Alert type={alert.type} message={alert.message} />
                </div>
            )}

            <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    USUÁRIO
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm text-zinc-300 font-medium"
                        >
                            Nome
                        </label>
                        <input
                            id="nome"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            type="text"
                            placeholder="Digite seu nome"
                            minLength={3}
                            onChange={(e)=>setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm text-zinc-300 font-medium"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            type="email"
                            placeholder="Digite seu email"
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm text-zinc-300 font-medium"
                        >
                            Senha
                        </label>

                        <div className="relative">
                            <input
                                id="senha"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition pr-12"
                                type={showPass ? "text" : "password"}
                                placeholder="Digite sua senha"
                                minLength={6}
                                onChange={(e)=>setSenha(e.target.value)}
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
                    </div>

                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg"
                        type="submit">
                        Cadastrar
                    </button>

                    <p className="text-center text-zinc-400 text-sm">
                        Já tem uma conta?{" "}
                        <Link
                            to="/login"
                            className="relative text-indigo-500 font-medium transition duration-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-0.5 after:bg-indigo-500 
                    after:transition-all after:duration-300
                    hover:after:w-full"
                        >
                            Faça login aqui!
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Cadastrar;