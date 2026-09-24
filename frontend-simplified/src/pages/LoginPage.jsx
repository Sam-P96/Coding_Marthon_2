import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ isAuthenticated, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // THIS IS FOR SIGN UP NAV - IGNORE -
  const signupHandler = async () => {
    navigate("/signup");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
  const user = await response.json();
  if (!response.ok) {
    setError(user.error);
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  console.log("login success, saved in local storage");
  setIsAuthenticated(true);
  navigate("/");
  };
  return (
    <div className="create max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="w-full py-2 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Login</button>
      </form>
      <button onClick={signupHandler} className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 hover:underline">No Account? Sign Up Here</button>
    </div>
  );
};

export default LoginPage;