const Toast = ({ message, type }) => {
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-[#21c4cc]",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div className="fixed w-full flex justify-center top-0 left-0 z-100 p-4 pt-1">
      <div className="w-full md:md lg:w-md">
      <div
        className={`
          px-4 py-3 rounded shadow-lg text-sm text-white text-center
          animate-slideUp
          ${styles[type]}
        `}
      >
        {message}
      </div>
    </div>
    </div>
  );
};

export default Toast;