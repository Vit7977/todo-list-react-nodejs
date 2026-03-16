import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "./Alert.jsx";

function UpdateTaskForm({ taskId, closeModal, refreshTasks }) {

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const [listaCategoria, setListaCategoria] = useState([]);

    const [alert, setAlert] = useState({
        show: false,
        type: "",
        message: ""
    });

    const getCategorias = async () => {
        try {
            const result = await axios.get(`http://localhost:9090/api/categoria`);
            setListaCategoria(result.data.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const getTask = async () => {
        try {
            const result = await axios.get(`http://localhost:9090/api/tarefa/${taskId}`);

            setTitulo(result.data.data.titulo);
            setDescricao(result.data.data.descricao);
            setPrioridade(result.data.data.prioridade);
            setCategoria(result.data.data.categoria);

        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (taskId) {
            getTask();
            getCategorias();
        }
    }, [taskId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await axios.put(`http://localhost:9090/api/tarefa/${taskId}`, {
                titulo,
                descricao,
                prioridade,
                categoria
            });

            setAlert({
                show: true,
                type: "success",
                message: "Tarefa atualizada com sucesso!"
            });

            await refreshTasks(); 
            closeModal(); 

        } catch (error) {

            const msg =
                error.response?.data?.msg || "Erro ao atualizar tarefa";

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

                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Título..."
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700"
                        required
                    />

                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição..."
                        className="w-full px-4 py-3 h-32 rounded-xl bg-zinc-800 text-white border border-zinc-700"
                    />

                    <select
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700"
                        required
                    >
                        <option value="">Escolha a prioridade</option>
                        <option value="BAIXA">BAIXA</option>
                        <option value="MEDIA">MEDIA</option>
                        <option value="ALTA">ALTA</option>
                    </select>

                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700"
                        required
                    >
                        <option value="">Escolha uma categoria</option>

                        {listaCategoria.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.nome}
                            </option>
                        ))}
                    </select>

                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
                        type="submit"
                    >
                        Atualizar
                    </button>

                </form>
            </div>
        </div>
    );
}

export default UpdateTaskForm;