import React, { useRef, useState } from "react";
import "./Upload.css";
import axios from "axios";

import uploadIcon from "../../public/uploadIcon.svg";
import { Navigate, useNavigate } from "react-router-dom";
export default function Upload() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleClick = (e) => {
    fileInput.current.click();
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picture", selectedFile);
    axios
      .post("http://127.0.0.1:5000/soft-story", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/report", { state: { value: res.data.bool } });
        // alert(res.data.bool);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="softstory--main">
      <div className="softstory--container">
        <div className="desc">
          <div>Follow these steps to generate report:</div>
          <div>
            Upload a picture of the structure. The picture should be clear and
            should contain all the floors.
          </div>
        </div>
        <div className="upload--container" onClick={handleClick}>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInput}
            onChange={handleFileSelect}
          />
          <div className="upload--img">
            <img src={uploadIcon} alt="Upload Image of the structure" />
            <p>{selectedFile ? "Edit" : "Upload"} picture.</p>
            {selectedFile && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                File selected:<div>{selectedFile["name"]}</div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "Center",
            marginBottom: "10px",
          }}
        >
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}
