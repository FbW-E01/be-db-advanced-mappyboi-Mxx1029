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
    
    const newReport = {
      position: position.lat + ", " + position.lng,
      description: desc
    };
        // this all is only needed if you fetch()
        // const init = {
            // headers: { "Content-Type": "application/json" },
            // method: "POST",
            // body: JSON.stringify(newReport)
        // }
        // fetch(url, init)
            // .then(response => response.json())
            // .then(result => alert('Thank you...'))
            // .catch(err => console.log("Error ", err))

    // const result = await axios.post(url, newReport)
    // if (result.data && result.data.success) {
    // } else {
    //     alert("Report failed", result.data)
    // }
    // shorter version:
    await axios.post(url, newReport)
        .then(result => {
            console.log(result.data);
            alert(`Thank you for your contribution! We added to our database: \nThe position of the abandoned bike: ${position.lat + ", " + position.lng}. \nYour given description: ${desc}.`);
            // setPosition(null);
            // setDesc("");
        })
        .catch(e => alert("Report failed", e))
  }

    async function getReports() {
        const url = process.env.REACT_APP_BACKEND + 'notifications';
        await axios.get(url)
            .then(result => {
                console.log(result.data);
                setReports(result.data);
            })
            .catch(e => console.log("getting reports failed!", e))
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
        <div>{reports.map(rep => {
          return(
            <p key={rep._id}>{rep.position}; {rep.description}</p>
          )
        })}</div>
      </div>
    </div>
  );
}
