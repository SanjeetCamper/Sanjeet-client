const Toast = ({ message, type }) => {
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div className="fixed max-w-md w-[50%] top-7 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`px-4 py-3 rounded-xl text-sm text-white text-center shadow-lg animate-slideUp ${styles[type]}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
