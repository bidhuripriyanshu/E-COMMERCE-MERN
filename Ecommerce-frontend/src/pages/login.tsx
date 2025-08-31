import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Header from '../components/header';

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <Header />
      <div className="login-page">
        <main className="login-card">
          <h1 className="login-heading">Sign In</h1>

          <div className="login-field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="login-field">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button className="google-login-btn">
            <FcGoogle size={22} /> <span>Sign in with Google</span>
          </button>
        </main>
      </div>
    </>
  );
};

export default Login;   