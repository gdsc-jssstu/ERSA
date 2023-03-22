import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
       <h1>Home Page of ERSA Frontend 🐧</h1>
        <Link to="/soft-story">Soft Story</Link> 
    </div>
  )
}

export default Home