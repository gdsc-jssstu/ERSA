import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div className="nav--main">
      <div className="nav--sub">
        <div style={{ fontWeight: "bold", fontSize: "xx-large" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            ERSA
          </Link>
        </div>
      </div>
    </div>
  );
}
