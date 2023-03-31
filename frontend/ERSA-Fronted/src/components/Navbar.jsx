import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div className="nav--main">
      <div className="nav--sub">
        <div style={{ fontWeight: "bold", fontSize: "xx-large" }}>
          <Link to="/" style={{color:"white",letterSpacing:3,textShadow:'2px 4px 5px rgba(68,10,93,0.6)', textDecoration: "none" }}>
            ERSA
          </Link>
        </div>
      </div>
    </div>
  );
}
