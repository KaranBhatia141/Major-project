import React, { useEffect, useState } from "react"; // react hooks
import { Link, useLocation, useNavigate } from "react-router-dom"; //  react router dom hooks  
import newRequest from "../../utils/newRequest";  // api calling path to connent backend
import "./Navbar.scss";

export default function Navbar() {
  const [active, setActive] = useState(false);   // useState hook we are using to track the change in state
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();     //return the current location this can be use as sie effect

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {       // use effect is allow to perfom side effect updating the dom 
    window.addEventListener("scroll", isActive);   //window.scrolly return only scrolly property of the window
    return () => {
      window.removeEventListener("scroll", isActive);  // its remove event which perviously registered
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));  // it is an static method parses a json string

  const navigate = useNavigate();  // use to navigate current navigation is in progress

  const handleLogout = async () => {     //  api calling for log out 
    try {
      await newRequest.post("/auth/logout");  // sending logout request to backend
      localStorage.setItem("currentUser", null); // its work as to clear current user id 
      navigate("/");  // navigate to link
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  freelanceHuB</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span> Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                   <Link className="link" to="/board">
                     LeaderBoard
                   </Link>
                 <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

;