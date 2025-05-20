import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";       // use this for backend request 
import { useNavigate } from "react-router-dom"; // this api provide navigation action with better compatibility

export default function Login() {
  const [username, setUsername] = useState("");    // useState hook() use to track user login and change in state also 
  const [password, setPassword] = useState("");    // useState use to attempt or track password change in state also
  const [error, setError] = useState(null);        // useState error  change in state also 

  const navigate = useNavigate();       // storing function in variable

  const handleSubmit = async (e) => {         // handleSubmit fun() for we can say promise to login user 
    e.preventDefault();    // its use when event does =not get explict  handled default actin should be handle
    try {
      const res = await newRequest.post("/auth/login", { username, password });  // the post HTTP method send data to te server  
      localStorage.setItem("currentUser", JSON.stringify(res.data));    // setItem method it use for storage interface we pass key value or update if it already exist 
      navigate("/")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>                       
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="H John"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}


