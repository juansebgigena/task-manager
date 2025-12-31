import { useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const RegisterPage = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { error, signup, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup({
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Crear Account</h2>

        {error && <div className="error-badge">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              ref={usernameRef}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <button type="submit" className="btn-auth">Sign up</button>
        </form>

        <p className="auth-footer">
          Do you already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;