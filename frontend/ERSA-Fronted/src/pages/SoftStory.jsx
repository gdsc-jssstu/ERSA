import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';


function SoftStory() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) =>{
    setSelectedFile(event.target.files[0]);
    //console.log(selectedFile);
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    const formData = new FormData();
    //console.log(selectedFile);
    formData.append('picture', selectedFile)
    // const response = await fetch('http://127.0.0.1:5000/soft-story', {
    //   method: 'POST',
    //   mode:'cors',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: formData
    // }).then((res)=>console.log(res)).catch((err)=>console.log(err))
    axios.post("http://127.0.0.1:5000/soft-story",
    formData,
    {
      headers: {
      'Content-Type': 'multipart/form-data',
    },}
    )
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }

  // useEffect(()=>{
  //   const res = async () => {
  //     await axios.get("http://127.0.0.1:5000/dummy").then((res)=>console.log(res)).catch((err)=>console.log(err))
  //   }
  //   res();
  // },[])

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