import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Alert from "../Components/Alert";

function UpdateUserForm({closeModal}) {

    const [showPass, setShowPass] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [user, setUser] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const [alert, setAlert] = useState({
        show: false,
        type: "error",
        message: ""
    });

    const id = localStorage.getItem("userId");

    const getUser = async () => {
        try {

            const result = await axios.get(
                `http://localhost:9090/api/usuario/${id}`
            );

            setUser({
                nome: result.data.data.nome,
                email: result.data.data.email,
                senha: ""
            });


            setNome(result.data.data.nome);
            setEmail(result.data.data.email);
        } catch (error) {
            console.error(error.message)
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:9090/api/usuario/${id}`,
                { nome, email, senha }
            );

            setAlert({
                show: true,
                type: "success",
                message: "Usuário atualizado com sucesso!"
            });

            setTimeout(() => {
                setAlert(prev => ({ ...prev, show: false }));
            }, 3000);

        } catch (error) {

            const msg =
                error.response?.data?.msg || "Erro ao atualizar usuário";

            setAlert({
                show: true,
                type: "error",
                message: msg
            });

            setTimeout(() => {
                setAlert(prev => ({ ...prev, show: false }));
            }, 3000);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

    {alert.show && (
        <div className="fixed top-5 right-5 z-50 min-w-2xs shadow-lg animate-slide-in">
            <Alert type={alert.type} message={alert.message} />
        </div>
    )}

    <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-full max-w-md relative">

        {/* botão fechar */}
        <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl"
        >
            ✕
        </button>

        <h1 className="text-3xl font-bold text-white text-center mb-8">
            ATUALIZAR
        </h1>

        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
        >

            {/* NOME */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-300 font-medium">
                    Nome
                </label>

                <input
                    type="text"
                    value={nome}
                    placeholder="Digite seu novo nome"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                    onChange={(e)=>setNome(e.target.value)}
                    required
                />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-300 font-medium">
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    placeholder="Digite seu novo email"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />
            </div>

            {/* SENHA */}
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-300 font-medium">
                    Senha
                </label>

                <div className="relative">
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Digite nova senha"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 pr-12"
                        onChange={(e)=>setSenha(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg"
                type="submit"
            >
                Atualizar
            </button>

        </form>
    </div>
</div>
    );
}

export default UpdateUserForm;