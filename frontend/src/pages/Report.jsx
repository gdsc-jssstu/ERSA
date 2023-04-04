import React from "react";
import "../../public/css/Report.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Report() {
  const location = useLocation();
  const data = location.state.value;
  return (
    <>
      <Navbar />
      <div className="report--main">
        <div className="report--title">
          {console.log(data)}
          Your structure is {data ? "a soft story" : "not a soft story"}
        </div>
        <div className="report--desc">
          {data
            ? "According to our analysis, your building is a soft story. This means that your building could be structurally susceptible to damage. Fret not, for there are retrofitting measures which can be taken to strengthen your building and prevent any damage. Take our extensive analysis to find out more."
            : "According to our analysis, your building is not a soft story. This means that your building is structurally sound and stable. However, this does not completely mitigate the risk of earthquakes on your building, as the zone you reside in may be susceptible to earthquakes. Find out more using our extensive analysis."}
        </div>

        <Link className="report--links" to="/extensive-analysis">
          Find Extensive analysis of your building
        </Link>
      </div>
    </>
  );
}
