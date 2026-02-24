import { Link } from "react-router-dom";

function NavBar() {
    const logout = () => {
        localStorage.clear();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (
        <nav className="w-full bg-zinc-950 shadow-xl px-8 py-4 flex items-center justify-between">

            <h1 className="text-xl font-bold text-white tracking-wide">
                TODO LIST 2000
            </h1>

            <div className="flex gap-16">

                <Link to="/home"
                    className="
                    text-zinc-300 font-medium relative transition duration-300
                    hover:text-white
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-0.5 after:bg-indigo-500 
                    after:transition-all after:duration-300
                    hover:after:w-full
                ">
                    Home
                </Link>

                <Link to="/tarefas"
                    className="
                    text-zinc-300 font-medium relative transition duration-300
                    hover:text-white
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-0.5 after:bg-indigo-500 
                    after:transition-all after:duration-300
                    hover:after:w-full
                ">
                    Tarefas
                </Link>

                <Link to="/perfil"
                    className="
                    text-zinc-300 font-medium relative transition duration-300
                    hover:text-white
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-0.5 after:bg-indigo-500 
                    after:transition-all after:duration-300
                    hover:after:w-full
                ">
                    Perfil
                </Link>

                <button
                    onClick={logout}
                    className="
                    text-red-400 font-medium relative transition duration-300
                    hover:text-red-500
                    after:content-[''] after:absolute after:left-0 after:-bottom-1 
                    after:w-0 after:h-0.5 after:bg-red-500 
                    after:transition-all after:duration-300
                    hover:after:w-full
                ">
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default NavBar;