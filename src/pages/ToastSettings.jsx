import { useToastSettings } from "../context/ToastSettingsContext";
import BackButton from "../components/BackButton";

const ToastSettings = () => {
  const {
    soundEnabled,
    vibrationEnabled,
    setSoundEnabled,
    setVibrationEnabled,
  } = useToastSettings();

  return (
    <div className="mx-auto max-w-md py-24 min-h-screen bg-white px-4 space-y-2">
      <BackButton />

      <h1 className="text-xs font-semibold text-gray-500 mb-4">TOAST NOTIFICATIONS</h1>

      <div className="flex justify-between items-center border border-gray-200 p-3 rounded-lg">
        <span className="text-sm text-gray-500">Toast Sound</span>
        <input
          type="checkbox"
          checked={soundEnabled}
          onChange={() => setSoundEnabled(!soundEnabled)}
        />
      </div>

      <div className="flex justify-between items-center border border-gray-200 p-3 rounded-lg">
        <span className="text-sm text-gray-500">Toast Vibration</span>
        <input
          type="checkbox"
          checked={vibrationEnabled}
          onChange={() => setVibrationEnabled(!vibrationEnabled)}
        />
      </div>
    </div>
  );
};

export default ToastSettings;
