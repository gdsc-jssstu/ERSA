import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";

function SoftStory() {
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileSelect = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleSubmit = (event) =>{
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('picture', selectedFile)
  //     axios.post("http://127.0.0.1:5000/soft-story",
  //       formData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     )
  //     .then((res)=>alert(res.data.message))
  //     .catch((err)=>alert(err))
  // }

  return (
    <>
      <Navbar />
      <Upload />
      {/* <h1>Soft Story Page of ERSA Frontend 🤠</h1>
      <Link to="/">Home</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Select a picture:
          <input type="file" onChange={handleFileSelect} />
        </label>
        <button type="submit">Upload</button>
      </form> */}
    </>
  );
}

export default SoftStory;
