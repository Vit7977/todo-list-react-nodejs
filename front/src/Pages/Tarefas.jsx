import axios from "axios";
import NavBar from "../Components/NavBar";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Tarefas() {

    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const [categorias, setCategorias] = useState([]);
    const [tarefas, setTarefas] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaTarefa, setCategoriaTarefa] = useState("");

    useEffect(() => {
        const getCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:9090/api/categoria");

                setCategorias(response.data.data);

            } catch (error) {
                console.log(error.response?.data?.msg || "Erro ao pegar categorias!");
            }
        };

        getCategorias();
    }, []);

    const getTarefas = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/tarefa/usuario/${userId}`);

            setTarefas(response.data.data);

        } catch (error) {
            console.log(error.response?.data?.msg || "Erro ao pegar tarefas!");
        }
    };

    useEffect(() => {
        getTarefas();
    }, []);

    const [alert, setAlert] = useState({
        show: false,
        type: "error",
        message: ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:9090/api/tarefa", {
                titulo,
                descricao,
                categoria: categoriaTarefa,
                usuario: userId
            });

            setAlert({
                show: true,
                type: "success",
                message: "Tarefa criada com sucesso!"
            });

            await getTarefas();

            setTimeout(() => {
                setAlert(prev => ({ ...prev, show: false }));
            }, 3000);

            setTitulo("");
            setDescricao("");
            setCategoriaTarefa("");


        } catch (error) {
            setAlert({
                show: true,
                type: "error",
                message: error.response?.data?.msg || "Erro ao criar tarefa!"
            });

            setTimeout(() => {
                setAlert(prev => ({ ...prev, show: false }));
            }, 3000);
        }
    };



    return (
        <>
            <NavBar />

            <div className="min-h-screen bg-linear-to-r from-zinc-900 to-zinc-800 px-8 py-10">

                {alert.show && (
                    <div className="fixed top-5 right-5 z-50 min-w-2xs shadow-lg animate-slide-in">
                        <Alert type={alert.type} message={alert.message} />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    <div className="bg-zinc-900 p-8 rounded-3xl shadow-2xl">

                        <h1 className="text-2xl font-bold text-white mb-6">
                            Criar Tarefa
                        </h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-300 font-medium">
                                    Título
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    type="text"
                                    placeholder="Título..."
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-300 font-medium">
                                    Descrição
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 h-32 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                                    placeholder="Descrição..."
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-zinc-300 font-medium">
                                    Categoria
                                </label>

                                <select
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer appearance-none"
                                    value={categoriaTarefa}
                                    onChange={(e) => setCategoriaTarefa(e.target.value)}
                                    required
                                >
                                    <option value="" className="bg-zinc-800">
                                        Escolha uma categoria
                                    </option>
                                    {
                                        categorias.map(categoria => {
                                            return (
                                                <option key={categoria.id} value={categoria.id} className="bg-zinc-800">
                                                    {categoria.nome}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <button
                                className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
                            >
                                Criar Tarefa
                            </button>

                        </form>
                    </div>

                    <div className="lg:col-span-2 bg-zinc-900 p-8 rounded-3xl shadow-2xl">

                        <h1 className="text-2xl font-bold text-white mb-6">
                            Suas Tarefas
                        </h1>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">

                                <thead>
                                    <tr className="text-zinc-400 border-b border-zinc-700">
                                        <th className="py-3">Título</th>
                                        <th className="py-3">Descrição</th>
                                        <th className="py-3">Categoria</th>
                                        <th className="py-3">Prioridade</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        tarefas.map(tarefa => {
                                            return (
                                                <tr className="border-b border-zinc-800">
                                                    <td className="py-3 text-white">{tarefa.titulo}</td>
                                                    <td className="py-3 text-zinc-400">
                                                        {tarefa.descricao}
                                                    </td>
                                                    <td className="py-3 text-indigo-400">
                                                        {tarefa.categoriaNome}
                                                    </td>
                                                    <td className="py-3 text-emerald-400">
                                                        {tarefa.prioridade}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>

                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Tarefas;