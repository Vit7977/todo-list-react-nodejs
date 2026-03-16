import { FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateUserForm from "../Components/UpdateUserForm";

function Perfil() {
    const [openModal, setOpenModal] = useState(false);

    const [user, setUser] = useState({ nome: "", email: "", createdAt: "" })
    const id = localStorage.getItem('userId');

    const getUser = async () => {
        try {
            const result = await axios.get(
                `http://localhost:9090/api/usuario/${id}`
            );

            setUser({
                nome: result.data.data.nome,
                email: result.data.data.email,
                createdAt: result.data.data.created_at
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const formattedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
        : "Não informado";

    const logout = () => {
        localStorage.clear();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (
        <div className="min-h-screen bg-linear-to-r from-zinc-900 to-zinc-800">
            <NavBar />

            <div className="px-6 md:px-12 py-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                    <FaUser className="text-indigo-500" />
                    Meu Perfil
                </h1>
                <p className="text-zinc-400 mt-2">
                    Gerencie suas informações pessoais.
                </p>
            </div>

            <div className="flex justify-center px-4 pb-16">
                <div className="w-full max-w-4xl bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden">

                    <div className="bg-linear-to-r from-indigo-600 to-indigo-500 h-32 relative">
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                            <div className="w-28 h-28 rounded-full bg-zinc-900 border-4 border-indigo-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                                {user.nome ? user.nome?.charAt(0).toUpperCase() : "U"}
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 px-8 pb-10">

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white">
                                {user.nome}
                            </h2>
                            <p className="text-zinc-400 text-sm mt-1">
                                Usuário ativo
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                            <div className="bg-zinc-800 p-5 rounded-2xl flex items-center gap-4 hover:bg-zinc-700 transition">
                                <FaUser className="text-indigo-400 text-xl" />
                                <div>
                                    <p className="text-zinc-400 text-sm">Usuário</p>
                                    <p className="text-white font-semibold">{user.nome}</p>
                                </div>
                            </div>

                            <div className="bg-zinc-800 p-5 rounded-2xl flex items-center gap-4 hover:bg-zinc-700 transition">
                                <FaEnvelope className="text-indigo-400 text-xl" />
                                <div>
                                    <p className="text-zinc-400 text-sm">Email</p>
                                    <p className="text-white font-semibold">{user.email}</p>
                                </div>
                            </div>

                            <div className="bg-zinc-800 p-5 rounded-2xl flex items-center gap-4 hover:bg-zinc-700 transition">
                                <FaCalendarAlt className="text-indigo-400 text-xl" />
                                <div>
                                    <p className="text-zinc-400 text-sm">Membro desde</p>
                                    <p className="text-white font-semibold">{formattedDate}</p>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">
                            <button onClick={()=> setOpenModal(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                                Editar Perfil
                            </button>

                            {openModal && <UpdateUserForm closeModal={() => setOpenModal(false)} />}

                            <button onClick={logout} className="bg-red-600 hover:bg-red-700 transition duration-300 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                                Sair
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Perfil;