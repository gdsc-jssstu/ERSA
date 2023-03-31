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
          <h1 className="hero__title">Lorem ipsum dolor ?</h1>
          <p className="hero__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            condimentum, nisl ut ultricies lacinia, nunc nisl aliquam nisl, ut
          </p>
          <Link to="/soft-story" style={{ textDecoration: "none" }}>
            <button className="hero__btn">Analayse Now</button>
          </Link>
          </div>
          <div className="image">
            <img src={bgImg} alt="bgImg" />
          </div>
          <Particles
            id="tsparticles"
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
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 70,
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
                        speed: 2,
                        straight: true,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
      </div>
  );
}


{/*
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


*/}