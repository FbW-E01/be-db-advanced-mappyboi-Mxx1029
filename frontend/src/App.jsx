import { useState } from "react";
import React from "react";
import L from "leaflet";
import dotenv from "dotenv";
import axios from 'axios';

import "leaflet/dist/leaflet.css";
import "./main.css";
import icon from "leaflet/dist/images/marker-icon.png";
import Map from './Map.jsx'

dotenv.config();

export default function App() {
  const [position, setPosition] = useState(null);
  const [desc, setDesc] = useState(null);
  const [reports, setReports] = useState([]);

  // Configure leaflet Marker icon - without this it is broken 💩
  // Wow this kind of sucks and was super hard to find!
  const DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: null  });
  L.Marker.prototype.options.icon = DefaultIcon;

  console.log("BACKEND RUNNING AT " + process.env.REACT_APP_BACKEND);

  async function report() { // async comes from Joel's solution
    // TODO: Send abandoned bicycle report to the backend
    const url = process.env.REACT_APP_BACKEND + 'notifications';
    
    const options = {
      // this seems not to work
      // headers: { "Content-Type": "application/json" },
      // method: "POST",
      // body: JSON.stringify({ position: position.lat + ", " + position.lng,
      //  description: desc })
      // using Joel's solution here:
      position: position.lat + ", " + position.lng,
      description: desc
    };

    const result = await axios.post(url, options);
    if (result.data && result.data.success) {
      alert(`Thank you for your contribution! We added to our database: \nThe position of the abandoned bike: ${position.lat + ", " + position.lng}. \nYour given description: ${desc}.`);
    } else {
      alert("Report failed", result)
    }
    // console.log(result)
  }

  async function getReports() {
    const url = process.env.REACT_APP_BACKEND + 'notifications';
      const resultRep = await axios.get(url);
      console.log(resultRep);
      if (resultRep.data) {
        setReports(JSON.stringify(resultRep.data))
      } else {
        console.log("getting reports failed!")
      }
  }

  return (
    <div className="form">
      <Map position={position} setPosition={setPosition} />
      <div className="form-fields">
        <h3>Report abandoned bicycle</h3>
        {position && <>GPS: {position.lat}, {position.lng}</>}
        <br />
        <textarea
          onChange={e=>setDesc(e.target.value)}
          placeholder="Write short description here"
        >{desc}</textarea>
        <button onClick={report}>Send report</button>
        <button onClick={getReports}>Get all reports</button>
        {/* <div>{JSON.stringify(reports)}</div> */}
        {/* <div>{reports.map(rep => {
          return(
            <p>{rep.position}; {rep.description}</p>
          )
        })}</div> */}
      </div>
    </div>
  );
}
