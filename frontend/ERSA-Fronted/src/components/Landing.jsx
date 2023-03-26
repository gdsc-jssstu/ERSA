import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
export default function Landing() {
  return (
    <div className="landing--main">
      <div className="bgImg">
        <div className="description">
          <div className="desc--container">
            <div className="header">How Good is your building ?</div>
            <div className="desc">
              <div>
                We mean how good your building in terms of survivability during
                Earthquake! Survivability isn't a luxury - it's a necessity.
              </div>
              <div>
                You can't predict earthquakes, but you can prepare for them.
              </div>
              <div>
                Protect your investment and your people with our
                state-of-the-art earthquake resilience analysis software
              </div>
            </div>
            <Link to="/soft-story" style={{ textDecoration: "none" }}>
              <div className="button">Analayse Now</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
