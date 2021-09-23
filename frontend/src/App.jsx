import { useState } from "react";
import React from "react";
import L from "leaflet";
import dotenv from "dotenv";

import "leaflet/dist/leaflet.css";
import "./main.css";
import icon from "leaflet/dist/images/marker-icon.png";
import Map from './Map.jsx'

dotenv.config();

export default function App() {
  const [position, setPosition] = useState(null);
  const [desc, setDesc] = useState(null);

  // Configure leaflet Marker icon - without this it is broken 💩
  // Wow this kind of sucks and was super hard to find!
  const DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: null  });
  L.Marker.prototype.options.icon = DefaultIcon;

  console.log("BACKEND RUNNING AT", process.env.REACT_APP_BACKEND);

  function report() {
    // TODO: Send abandoned bicycle report to the backend
    const url = 'http://localhost:8080/notifications';
    // ${process.env.REACT_APP_BACKEND}
  
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ position, desc })
    };
    fetch(url, options);

    alert(`Thank you for your contribution! We added to our database: \nThe position of the abandoned bike: ${position}. \nYour given description: ${desc}.`);

    console.log(position.lat);
    console.log(position.lng);
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
      </div>
    </div>
  );
}
