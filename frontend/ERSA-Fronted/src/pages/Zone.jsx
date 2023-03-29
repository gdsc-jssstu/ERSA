import React from 'react'
import seismic from '../assets/ref.jpg'

function Zone() {
  return (
    <div>
        <div className="info">
        <h1>Zone Identification</h1>
        <p>Please select your zone according to this map</p>
        </div>
        <div className="map">
        <img src={seismic} alt="Zone Map" />
        </div>
        <div className="zoneinput">
        <form action="http://127.0.0.1:5000/zone" method="post">
            <label for="zone">Zone:</label>
            <select id="zone" name="zone">
                <option value="0">Select</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
            </select>
            <input type="submit" value="Submit" />
        </form>
  
        </div>   
    </div>
  )
}

export default Zone