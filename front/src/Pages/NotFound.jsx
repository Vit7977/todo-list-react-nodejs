import { Link, useLocation } from "react-router-dom";

function NotFound() {
    const location = useLocation();
    localStorage.setItem('lastaccess', location.pathname)

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-zinc-900 to-zinc-800">

            <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">

                <h1 className="text-6xl font-extrabold text-indigo-500 mb-4">
                    404
                </h1>

                <h2 className="text-2xl font-bold text-white mb-3">
                    Página não encontrada
                </h2>

                <p className="text-zinc-400 mb-8">
                    A página que você está tentando acessar não existe ou foi removida.
                </p>

                <Link
                    to="/home"
                    className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg"
                >
                    Voltar para Home
                </Link>

            </div>
        </div>
    );
}

export default NotFound;