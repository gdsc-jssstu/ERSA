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
    </div>
  );
}

export default Home;
