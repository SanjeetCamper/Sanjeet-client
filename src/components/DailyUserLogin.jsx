import React from "react";
import styles from '../styles/DailyUserLogin.module.css'

const DailyUserLogin = () => {
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="" />
        </div>
        <h1>Daily User Login</h1>
        <p className={styles.subtitle}>Welcome back! Please login to continue</p>

        <form>
          <div className={styles.formGroup}>
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>

        <div className={styles.divider}>Not a Daily User?</div>

        <div className={styles.adminInfo}>
          <p>
            <strong>📌 Note:</strong> Username and password can only be obtained
            from the admin. No signup option available.
          </p>
        </div>

        <button className={styles.createUserBtn}>Request Daily User Access</button>

        <p className={styles.footerText}>© 2025 Sanjeet Water Supplier. All rights reserved.</p>
      </div>
    </div>
  );
};

export default DailyUserLogin;
