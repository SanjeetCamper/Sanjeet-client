const Toast = ({ message, type }) => {
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-[#21c4cc]",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div className="fixed max-w-md w-[100%] top-0 left-1/2 -translate-x-1/2 z-100">
      <div
        className={`px-4 py-3 text-sm text-white text-center shadow-lg animate-slideUp ${styles[type]}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
