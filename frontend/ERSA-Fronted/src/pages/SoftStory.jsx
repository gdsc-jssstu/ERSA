import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';


function SoftStory() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) =>{
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('picture', selectedFile)
    const response = await fetch('http://127.0.0.1:5000/soft-story', {
      method: 'POST',
      body: formData
    })
  }

  return (
    <div>
        <h1>
            Soft Story Page of ERSA Frontend 🤠
        </h1>
        <Link to="/">Home</Link>
        <form onSubmit={handleSubmit}>
            <label>
              Select a picture:
              <input type="file" onChange={handleFileSelect} />
            </label>
            <button type="submit">Upload</button>
        </form>
    </div>
  )
}

export default SoftStory