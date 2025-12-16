// import React from "react";
// import styles from '../styles/DailyUserLogin.module.css'

// const DailyUserLogin = () => {
//   return (
//     <div>
//       <div className={styles.loginContainer}>
//         <div className={styles.logo}>
//           <img src="/logo.png" alt="" />
//         </div>
//         <h1 className={styles.h1h1}>Daily User Login</h1>
//         <p className={styles.subtitle}>Welcome back! Please login to continue</p>

//         <form>
//           <div className={styles.formGroup}>
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button type="submit" className={styles.loginBtn}>
//             Login
//           </button>
//         </form>

//         <div className={styles.divider}>Not a Daily User?</div>

//         <div className={styles.adminInfo}>
//           <p>
//             <strong>📌 Note:</strong> Username and password can only be obtained
//             from the admin or memberShip-plan. No signup option available.
//           </p>
//         </div>

//         <button className={styles.createUserBtn}>Request Daily User Access</button>

//         <p className={styles.footerText}>© 2025 Sanjeet Water Supplier. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default DailyUserLogin;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const DailyUserLogin = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-10 pb-20">

      <h1 className="text-xl font-bold mb-6">Daily User Login</h1>

      {/* Membership User */}
      <button
        onClick={() => navigate("/dailyuser/membership-check")}
        className="w-full py-3 bg-blue-500 text-white rounded-xl mb-4"
      >
        Membership User
      </button>

      {/* Cash User */}
      <button
        onClick={() => navigate("/dailyuser/cash-login")}
        className="w-full py-3 bg-gray-800 text-white rounded-xl"
      >
        Cash User Login
      </button>

    </div>
  );
};

export default DailyUserLogin;
