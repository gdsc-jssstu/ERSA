import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import bgImg from "../assets/testback-1.png";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


export default function Landing() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
      await console.log(container);
    }, []);

  return (
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">What is ERSA?</h1>
          <p className="hero__desc">
          ERSA stands for Earthquake Resilient Structure Analysis.<br/><br/>
          Lately, we have been seeing news of earthquakes and their devastation. Wouldn't it be helpful
for everyone if they could have an understanding of the structural integrity of their buildings
and possible ways to retrofit them? This is what ERSA aims to achieve          </p>
          <Link to="/soft-story" style={{ textDecoration: "none" }}>
            <button className="hero__btn">Analyse Now</button>
          </Link>
          </div>
          <div className="image">
            <img src={bgImg} alt="bgImg" />
          </div>
          <Particles
            id="tsparticles"
            style={{top:'80px',zIndex:1}}
            init={particlesInit}
            loaded={particlesLoaded}
            options={{

                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.2,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 40,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: true,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 500,
                        },
                        value: 50,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
                detectRetina: true,
            }}
        />
      </div>
  );
}