import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ isAuthenticated, setIsAuthenticated }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // THIS IS FOR SIGN UP NAV - IGNORE -
  const signupHandler = async () => {
    navigate('/signup');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    const respones = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  };

  if (!response.ok) {
    setError(user.error);
    return;
  }

  localStorage.setItem('user', JSON.stringify(user));
  console.log('login success, saved in local storage');
  setIsAuthenticated(true);
  navigate('/');

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <label>Email Address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      <button onClick={signupHandler}>No Account? Sign Up Here</button>
    </div>
  );
};

export default LoginPage;
