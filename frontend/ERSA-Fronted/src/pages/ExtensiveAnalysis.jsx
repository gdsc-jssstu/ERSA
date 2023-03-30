import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import seismic from '../assets/ref.jpg'
import './extensive.css'
import DATA from '../data/data.js'
import Navbar from '../components/Navbar';

function ExtensiveAnalysis() {
        /*Getting states and districts*/ 
        const [states, setStates] = useState([]);
        const [selectedState, setSelectedState] = useState('');
        const [districts, setDistricts] = useState([]);
        const [selectedDistrict, setSelectedDistrict] = useState('');
      
        useEffect(() => {
          axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then(response => {
              setStates(response.data.states);
            })
            .catch(error => {
              console.log(error);
            });
        }, []);
      
        const handleStateSelection = (event) => {
          setSelectedState(event.target.value);
          axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${event.target.value}`)
            .then(response => {
              setDistricts(response.data.districts);
            })
            .catch(error => {
              console.log(error);
            });
        };

        /* Generating report */
        const [report, setReport] = useState({});

        /* Handle district soil type  */
        const [soil, setSoil] = useState("");

        // const handleSoilType = (districtName) =>{
        //   for (let i = 0; i < DATA.length; i++) {
        //     const district = DATA[i][districtName];
        //     if (district) {
        //       setSoil(district[0].soilType);
        //     }
        //   }
        // }

        // const handleSoilType = (event) => {
        //   const districtName = event.target.value;
        //   for (let i = 0; i < DATA.length; i++) {
        //     const district = DATA[i][districtName];
        //     if (district) {
        //       setSoil(district[0].soilType);
        //     }
        //   }
        // };
        const handleSoilType = (event) => {
          console.log("handleSoilType called with districtName:", event.target.value);
          const districtName = event.target.value;
          for (let i = 0; i < DATA.length; i++) {
            const district = DATA[i][districtName];
            if (district) {
              console.log("found district:", district);
              setSoil(district[0].soilType);
              break;
            }
          }
          console.log("soil state updated to:", soil);
        };
                

        /* Converting Formdata to JSON */
        function handleSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target); // get the form data
            const jsonData = {}; // creating an empty object to store the JSON data
          
            // loop through the form data and add each field to the JSON object
            for (const [key, value] of formData.entries()) {
              jsonData[key] = value;
            }

          
            // send the JSON data to the server
            fetch('http://127.0.0.1:5000/zone-report', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsonData)
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
                setReport(data);
                console.log(report);
                
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
          }


  return (
    <div>
        <Navbar />
        <div className="head">
        <h1>Extensive Analysis</h1>
        <p>Please try to provide accurate data as much as possible!</p>
        </div>
     
        <div className="Extensive-info">
                <form onSubmit={handleSubmit} > 

                    <div className="zone">
                        <h1>Zone Identification</h1>
                        <p>Please select your zone according to this map</p>
                        <div className="map">
                            <img src={seismic} alt="Zone Map" />
                        </div>
                        <label for="zone">Zone:</label>
                        <select id="zone" name="zone">
                            <option value="0">Select</option>
                            <option value="2">II</option>
                            <option value="3">III</option>
                            <option value="4">IV</option>
                            <option value="5">V</option>
                        </select>
                    </div>

                    <div className="importance-factor">
                        <h1>Type of the building</h1>
                        <p>Please select the type of your building</p>
                        <label for="importance-factor">Type:</label>
                        <select id="importance-factor" name="importance">
                            <option value="0">Select</option>
                            <option value="1.0">Residential Building</option>
                            <option value="1.5">Commercial/Government/Hospital/School</option>
                        </select>     
                    </div>

                    <div className="soiltype">
                        <h1>State and District selection to get soil type</h1>
                        <p>Please select your state and district</p>
                    <label htmlFor="states">Select a State:</label>
                            <select name="states" id="states" value={selectedState} onChange={handleStateSelection}>
                                    <option value="">--Select State--</option>
                                    {states.map((state) => (
                                    <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                                    ))}
                            </select>
                            <div>
                            {districts.length > 0 && (
                                  <div>
                                    <ul>
                                      <label >Select a District:</label>
                                      <select name="soil" id="districts" value={soil} onChange={handleSoilType}>
                                        <option value="">--Select District--</option>
                                        {districts.map((district) => (
                                          <option key={district.district_id} value={district.district_name}>{district.district_name}</option>
                                        ))}
                                      </select>
                                    </ul>
                                  </div>
                              )}
                        </div>
{/* 
                            {districts.length > 0 &&
                                <div>
                                <ul>
                                <label htmlFor="districts">Select a District:</label>
                                <select name="soil" id="districts">
                                <option value="">--Select District--</option>
                                    {districts.map((district) => (
                                    <option key={district.district_id} value="soft">{district.district_name}</option>
                                    ))}
                                </select>
                                </ul>
                                </div>
                            } */}
                    </div>

                    <div className="building-height">
                        <h1>Building Height</h1>
                        <p>Please input the height of your building in metres</p>
                        <label for="building-height">Height:</label>
                        <input type="number" id="building-height" name="height" step="0.01" min="0"  max="10" />
                    </div>

                    <div className="dimension">
                        <h1>Dimension</h1>
                        <p>Please enter dimensions of your building  [ *only if your building is masonry and not RCC, if it is RCC skip this step*]</p>
                        <label for="dimension">Dimension:</label>
                        <input type="number" id="dimension" name="d" step="0.01" min="0"  max="10" />
                    </div>

                    <input type="submit" value="Submit" />
                    <p>[After filling out all the values, click on Submit to generate conclusion]</p>

                </form>   
        </div> 
        {report.zone && report.message && report.Ah &&
              <div className="report">
              <h1>Conclusion</h1>
              <p>Ah Value : {report.Ah}</p>
              <p>Zone : {report.zone}</p>
              <p>Message : {report.message}</p>
          </div>

        }  
        
    </div>
  )
}

export default ExtensiveAnalysis