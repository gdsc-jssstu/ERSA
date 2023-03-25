import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';


function SoftStory() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) =>{
    setSelectedFile(event.target.files[0]);
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('picture', selectedFile)
      axios.post("http://127.0.0.1:5000/soft-story",
        formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res)=>console.log(res))
      .catch((err)=>alert(err))
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