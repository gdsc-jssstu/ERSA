import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";

function SoftStory() {

  return (
    <>
      <Navbar />
      <Upload />
    </>
  );
}

export default SoftStory;
