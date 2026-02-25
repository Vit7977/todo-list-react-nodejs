import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa'

function CardTarefa({ titulo, concluido, prioridade, categoria, onComplete, onDelete }) {

    const prioridadeConfig = {
        BAIXA: {
            bg: "bg-green-500/20",
            text: "text-green-400",
            border: "border-green-500"
        },
        MEDIA: {
            bg: "bg-yellow-500/20",
            text: "text-yellow-400",
            border: "border-yellow-500"
        },
        ALTA: {
            bg: "bg-red-500/20",
            text: "text-red-400",
            border: "border-red-500"
        }
    };

    const prioridadeStyle = prioridadeConfig[prioridade] || {
        bg: "bg-zinc-700/30",
        text: "text-zinc-400",
        border: "border-zinc-600"
    };

    return (
        <div className={`
            relative
            min-w-96
            bg-linear-to-br from-zinc-900 to-zinc-800
            border ${prioridadeStyle.border}
            rounded-2xl
            p-6
            shadow-xl
            hover:scale-[1.02]
            hover:shadow-2xl
            transition-all
            duration-300
            flex
            flex-col
            gap-5
        `}>

            <div className={`
                absolute left-0 top-0 h-full w-1
                rounded-l-2xl
                ${prioridadeStyle.border.replace("border", "bg")}
            `} />

            <div className="flex justify-between items-start">

                <div className="flex flex-col gap-1">
                    <h2 className={`
                        text-xl font-semibold tracking-wide
                        ${concluido
                            ? "text-zinc-500"
                            : "text-white"}
                    `}>
                        {titulo}
                    </h2>

                    <span className="text-xs text-indigo-400 uppercase tracking-wider">
                        {categoria}
                    </span>
                </div>

                <span className={`
                    px-3 py-1 text-xs rounded-full font-semibold
                    ${prioridadeStyle.bg}
                    ${prioridadeStyle.text}
                `}>
                    {prioridade}
                </span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-zinc-800">

                <div className="flex items-center gap-2">

                    <div className={`
                        w-2.5 h-2.5 rounded-full
                        ${concluido ? "bg-green-400" : "bg-yellow-400"}
                    `} />

                    <span className={`
                        text-sm font-medium
                        ${concluido
                            ? "text-green-400"
                            : "text-yellow-400"}
                    `}>
                        {concluido ? "Concluída" : "Pendente"}
                    </span>

                </div>

                <div className="flex gap-3 text-zinc-500 text-sm">
                    <button
                        onClick={onComplete}
                        className={`
                            p-2 rounded-lg
                            bg-zinc-800
                            ${concluido ? "text-zinc-600" : "text-green-500 hover:bg-green-600 hover:text-white"}
                            transition
                            duration-200`}
                    >
                        <FaCheck size={14} />
                    </button>

                    <button
                        className={`
                            p-2 rounded-lg
                            bg-zinc-800
                            transition
                            duration-200
                            ${concluido ? "text-zinc-600" : "text-indigo-400 hover:bg-indigo-600 hover:text-white"}
                            `
                        }
                    >
                        <FaEdit size={14} />
                    </button>

                    <button
                        onClick={onDelete}
                        className="
                            p-2 rounded-lg
                            bg-zinc-800
                            text-red-400
                            hover:bg-red-600
                            hover:text-white
                            transition
                            duration-200"
                    >
                        <FaTrash size={14} />
                    </button>

                </div>

            </div>
        </div>
    );
}

export default CardTarefa;