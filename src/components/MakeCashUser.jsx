import { motion } from "framer-motion";
import BackButton from "./BackButton.jsx"

const  DailyUserCashInfoCard = () => {
  const adminNumber = "7489089302"; // Replace with your admin number

  return (
    <div className="fixed w-full h-screen left-0 top-0 z-100 bg-white text-gray-800 p-6 flex flex-col items-center overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl text-center"
      >
        <BackButton />

        <h1 className="text-3xl font-bold mb-4 text-blue-700">Cash Daily User Service</h1>
        <p className="text-lg leading-relaxed mb-4">
          Aap hamare <span className="font-semibold text-blue-600">18 Ltr ke Bani Water Camper</span> ki daily
          service lena chahte hain? Hamari cash customer service bahut simple aur
          fast process ke through hoti hai.
        </p>

        <p className="text-lg leading-relaxed mb-4">
          Ek camper ka price sirf <span className="font-bold text-green-600">₹20</span> rakha gaya hai. Service
          start karne ke liye bas admin se ek baar baat karni hoti hai, jisme aap
          ka address confirm kiya jata hai aur service ke rules bataye jate hain.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl shadow mb-4">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Kaise Bane Cash Daily User?</h2>
          <ul className="text-left list-disc list-inside leading-relaxed">
            <li>Admin aapka DailyUser account create karega.</li>
            <li>Aapko ek <span className="font-semibold">Username</span> aur <span className="font-semibold">Password</span> diya jayega.</li>
            <li>In login details ki madad se aap humare app me apni service ka data dekh sakte hain.</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-2xl shadow mb-4">
          <h2 className="text-xl font-semibold mb-2 text-green-700">App Me Aap Kya Dekh Sakte Hain?</h2>
          <ul className="text-left list-disc list-inside leading-relaxed">
            <li>Daily Camper In/Out Record</li>
            <li>Aapke Payment Details</li>
            <li>Aapke Service ka Full History</li>
            <li>Admin ke dwara ki gayi sabhi entries</li>
          </ul>
        </div>

        <p className="text-lg leading-relaxed mb-6 font-medium text-gray-700">
          Hamari service bilkul transparent hai — har ek entry aap app me kabhi bhi
          dekh sakte hain.
        </p>

        <a
          href={`tel:${adminNumber}`}
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition-all"
        >
          Admin Se Baat Kare
        </a>
      </motion.div>
    </div>
  );
}


export default DailyUserCashInfoCard