import React, { useState } from "react";
// import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [file, setFile] = useState(null);    // use state hook use to track in a function component it return two values the current state and also a function that update the state 
  const [user, setUser] = useState({          // --------------------------⤴️
    username: "",                       // user input setup 
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();             // return the current navigation defaulting the current navigation progress we use this when user submission the form

  const handleChange = (e) => {   // it is an fun() that trigred on when userer submit the form after that you can acess the user input to change
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {              // it is an fun() it triggred when seller account is active or register by user 
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {   // this fun() work on that time when form submited by user 
    e.preventDefault();

    // const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        // img: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (     // making a form using html tags for registration 
    <div className="register">
      <form onSubmit={handleSubmit}>     
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="H John"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="India"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

