import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Landing from "../components/Landing";

function Home() {
  return (
    <div>
      <Navbar />
      <Landing />
      {/*{ <h1>Home Page of ERSA Frontend 🐧</h1>
      <Link to="/soft-story">Soft Story</Link>}*/}
    </div>
  );
}

export default Home;
