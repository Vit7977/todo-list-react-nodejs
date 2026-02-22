function Alert({ type = "error", message }) {
    const styles = {
        success: "bg-green-600 border-green-800",
        error: "bg-red-600 border-red-800",
    };

    return (
        <div
            className={`min-w-1.5 p-3 rounded-lg text-white border-3 shadow-lg ${styles[type]}`}
        >
            {message}
        </div>
    );
}

export default Alert;