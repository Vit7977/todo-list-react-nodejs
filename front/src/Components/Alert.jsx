function Alert({ type = "error", message }) {
    const styles = {
        success: "bg-green-600 border-green-800",
        error: "bg-red-600 border-red-800",
    };

    return (
        <div
            className={`
                min-w-2xs
                p-3
                rounded-lg
                text-white
                border-2
                shadow-lg
                animate-[fadeIn_0.3s_ease-out]
                ${styles[type]}
            `}
        >
            {message}
        </div>
    );
}

export default Alert;