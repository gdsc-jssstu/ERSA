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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
          consectetur repellat laborum aliquid. Nobis fugiat ipsa provident quod
          magni aperiam vel sunt iusto dolorum, praesentium quam consequuntur
          quidem quaerat quos? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quidem at adipisci accusamus totam ducimus iusto
          aut. Laborum pariatur minus fugiat libero voluptas? Maiores quia nemo
          blanditiis doloremque quasi dignissimos non. `
        </div>

        <Link className="report--links" to="/extensive-analysis">
          Find Extensive analysis of your building
        </Link>
      </div>
    </>
  );
}
