import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";

function Home() {
    const location = useLocation();
    localStorage.setItem('lastaccess', location.pathname)

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
                    <p className="text-2xl font-bold text-white">12</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-zinc-400 text-sm">Concluídas</h2>
                    <p className="text-2xl font-bold text-green-500">8</p>
                </div>

                <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-zinc-400 text-sm">Pendentes</h2>
                    <p className="text-2xl font-bold text-yellow-500">4</p>
                </div>

            </div>

            <div className="px-8 mt-10 space-y-4 flex flex-col justify-center items-center gap-6">

                <h1 className="text-white text-2xl font-bold">LISTA DE TAREFAS</h1>

                
            </div>
        </div>
    );
}

export default Home;