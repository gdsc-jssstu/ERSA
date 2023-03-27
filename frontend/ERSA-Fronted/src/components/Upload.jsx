import React from "react";
import "./Upload.css";
import uploadIcon from "../../public/uploadIcon.svg";
export default function Upload() {
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
          <div className="upload--details"></div>
        </div>
      </div>
    </div>
  );
}
