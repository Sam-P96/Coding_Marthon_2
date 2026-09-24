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

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
        phone_number: phoneNumber,
        gender,
        date_of_birth: dateOfBirth,
        membership_status: membershipStatus,
      }),
    });
    if (!response.ok) {
      setError(user.error);
      return;
    }
    // localStorage.setItem("user", JSON.stringify(user));
    // console.log("sign up success")
    // setIsAuthenticated(true);
    // navigate
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email address:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>Gender:</label>
        {/* FIX THIS, MAKE IT HAVE OPTION MALE, FEMALE, OTHER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 */}
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label>Membership Status:</label>
        <input
          type="text"
          value={membershipStatus}
          onChange={(e) => setMembershipStatus(e.target.value)}
        />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default SignupPage;
