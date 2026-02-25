import { useState, useEffect } from "react";
import axios from "axios";
import CardTarefa from "../Components/CardTarefa";
import NavBar from "../Components/NavBar";

function Home() {

    const [tarefas, setTarefas] = useState([])

    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluido).length;
    const pendentes = tarefas.filter(t => !t.concluido).length;

    const userId = localStorage.getItem('userId');

    const getTarefas = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/tarefa/usuario/${userId}`);

            setTarefas(response.data.data);

        } catch (error) {
            console.log(error.response?.data?.msg || "Erro ao pegar tarefas!");
        }
    };

    const completeTask = async (taskId) => {
        try {
            await axios.patch(`http://localhost:9090/api/tarefa/complete/${taskId}`);

            await getTarefas();
        } catch (error) {
            console.log(error.response?.data?.msg || "Erro ao completar a tarefa!");
        }
    }

    useEffect(() => {
        getTarefas();
    }, []);

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:9090/api/tarefa/${taskId}`);

            await getTarefas();
        } catch (error) {
            console.log(error.response?.data?.msg || "Erro ao deletar a tarefa!");
        }
    }

    const username = localStorage.getItem('loggedUsername');

    return (
        <div className="min-h-screen bg-linear-to-r from-zinc-900 to-zinc-800">
            <NavBar />
            <div className="px-8 py-6">
                <h1 className="text-3xl font-bold text-white">
                    Olá, {username} 👋
                </h1>
                <p className="text-zinc-400 mt-2">
                    Organize suas tarefas e aumente sua produtividade.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mt-6">

                <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-zinc-400 text-sm">Total</h2>
                    <p className="text-2xl font-bold text-white">{total}</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-zinc-400 text-sm">Concluídas</h2>
                    <p className="text-2xl font-bold text-green-500">{concluidas}</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-zinc-400 text-sm">Pendentes</h2>
                    <p className="text-2xl font-bold text-yellow-500">{pendentes}</p>
                </div>

            </div>

            <div className="px-8 mt-10 space-y-4 flex flex-col justify-center items-center gap-4">

                <h1 className="text-white text-2xl font-bold">LISTA DE TAREFAS</h1>
                {
                    tarefas.map(tarefa => (
                        <CardTarefa
                            key={tarefa.id}
                            titulo={tarefa.titulo}
                            concluido={tarefa.concluido}
                            prioridade={tarefa.prioridade}
                            categoria={tarefa.categoriaNome}
                            onComplete={() => completeTask(tarefa.id)}
                            onDelete={() => handleDelete(tarefa.id)}
                        />
                    ))
                }

            </div>
        </div>
    );
}

export default Home;