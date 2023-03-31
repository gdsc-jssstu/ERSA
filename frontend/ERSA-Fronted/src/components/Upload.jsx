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
  // const [floor, setFloor] = useState({
  //   floor1: 0,
  //   floor2: 0,
  //   floor3: 0,
  //   floor4: 0,
  // });
  // function handleFloor(e) {
  //   const value = Math.max(0, Math.min(100, Number(e.target.value)));
  //   setFloor({ ...floor, [e.target.name]: value });
  // }

  // function handleSubmit() {
  //   let floorVal = Object.entries(floor).map(([k, v]) => v);

  //   let floorval1 = {
  //     floors: floorVal,
  //   };
  //   console.log(floorval1);

  //   // send the JSON data to the server
  //   fetch("http://127.0.0.1:5000/soft-storey-floors", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(floorval1),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       // setReport(data);
  //       // navigate("/report", { state: { reportData: data } });
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with the fetch operation:", error);
  //     });
  //}
  return (
    <div className="softstory--main">
      <div className="softstory--container">
        <div className="desc">
          <div>Follow these steps to generate report</div>
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
            {/* <small>
              Before proceeding{" "}
              <a style={{ color: "white", textDecoration: "underline" }}>
                click here
              </a>
            </small> */}
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
          {/* <div className="upload--or">OR</div>
          <div className="upload--details">
            <div className="floor--details">
              <div className="floor--input">
                <div>Floor 1:</div>
                <input
                  className="input--form "
                  type="number"
                  step="0.1"
                  name="floor1"
                  placeholder={0}
                  onChange={handleFloor}
                />
              </div>
              <div className="floor--input">
                <div>Floor 2:</div>
                <input
                  className="input--form "
                  type="number"
                  step="0.1"
                  name="floor2"
                  placeholder={0}
                  onChange={handleFloor}
                />
              </div>
              <div className="floor--input">
                <div>Floor 3:</div>
                <input
                  className="input--form "
                  type="number"
                  step="0.1"
                  name="floor3"
                  placeholder={0}
                  onChange={handleFloor}
                />
              </div>
              <div className="floor--input">
                <div>Floor 4:</div>
                <input
                  className="input--form "
                  type="number"
                  step="0.1"
                  name="floor4"
                  placeholder={0}
                  onChange={handleFloor}
                />
              </div>
            </div>
          </div> */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "Center",
            marginBottom: "10px",
          }}
        >
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
