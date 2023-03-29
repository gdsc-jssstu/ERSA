import React, { useState } from "react";
import "./Upload.css";
import uploadIcon from "../../public/uploadIcon.svg";
export default function Upload() {
  const [floor, setFloor] = useState({
    floor1: 0,
    floor2: 0,
    floor3: 0,
    floor4: 0,
  });
  function handleFloor(e) {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setFloor({ ...floor, [e.target.name]: value });
  }

  function handleSubmit() {
    let floorVal = Object.entries(floor).map(([k, v]) => v);
    console.log(floorVal);
  }
  return (
    <div className="softstory--main">
      <div className="softstory--container">
        <div className="desc">
          <div>Follow these steps to generate report</div>
          <div>Step 1:</div>
          <div>
            General description about soft-storey buildings and asking them to
            upload either image of their buildings or the heights of each
            floors(recommended)
          </div>
        </div>
        <div className="upload--container">
          <div className="upload--img">
            <img src={uploadIcon} alt="Upload Image of the structure" />
            <p>Upload complete picture.</p>
            <small>
              Before proceeding{" "}
              <a style={{ color: "white", textDecoration: "underline" }}>
                click here
              </a>
            </small>
          </div>
          <div className="upload--or">OR</div>
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
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
