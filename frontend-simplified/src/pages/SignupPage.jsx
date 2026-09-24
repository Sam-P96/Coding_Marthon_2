import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = ({ placeholder }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone_number: phoneNumber,
        gender: gender,
        date_of_birth: dateOfBirth,
        //mock data
        address: {
          street: "204",
          city: "Helsinki",
          zipCode: "21321"
        }
      }),


    });

    if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User signed up successfully!", user);
        // setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Signup failed", response);
      }

    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="create max-w-md mx-auto mt-16 mb-16 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
      <form onSubmit={submitHandler} className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="text-sm font-medium text-gray-700">Email address:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="text-sm font-medium text-gray-700">Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="text-sm font-medium text-gray-700">Gender:</label>
        {/* FIX THIS, MAKE IT HAVE OPTION MALE, FEMALE, OTHER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="text-sm font-medium text-gray-700">Date of Birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label className="text-sm font-medium text-gray-700">Membership Status:</label>
        <input
          type="text"
          value={membershipStatus}
          onChange={(e) => setMembershipStatus(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="w-full py-2 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Sign up</button>
      </form>
    </div>
  );
};

export default SignupPage;