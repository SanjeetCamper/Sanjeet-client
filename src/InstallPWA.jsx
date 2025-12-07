import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true); // 👈 new user ko button दिखाओ
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (!show || !deferredPrompt) return null;

  const handleInstall = async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    if (outcome === "accepted") {
      setShow(false); // install हो गया, फिर मत दिखाओ
    } else {
      // user ने cancel किया, चाहो तो हल्का सा UI change कर सकते हो
      // फिलहाल बस hide कर देते हैं:
      setShow(false);
    }
  };

  return (
    <div
      style={{
        width: "90%",
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "12px 16px",
        borderRadius: "999px",
        background: "#ecfeff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
        display: "flex",
        gap: "8px",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <span style={{ fontSize: 14 }}>📲 Install this app?</span>
      <button
        onClick={handleInstall}
        style={{
          border: "none",
          outline: "none",
          cursor: "pointer",
          padding: "6px 12px",
          borderRadius: "999px",
          background: "#06b6d4",
          color: "white",
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        Install
      </button>
    </div>
  );
}
