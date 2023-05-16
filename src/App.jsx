import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import L from  '../node_modules/leaflet/dist/leaflet.js'   // // Creating map options

function App() {
  const [count, setCount] = useState(0)
    var mapOptions = {
      center: [17.385044, 78.486671],
      zoom: 10
    }
    // // Creating a map object
    var map = new L.map('map', mapOptions);
    // console.log(map);
    // // Creating a Layer object
    var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // // Adding layer to the map
    map.addLayer(layer);
    // const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
    // let searchText = "England"
    // const params = {
    //             q: searchText,
    //             format: "json",
    //             addressdetails: 1,
    //             polygon_geojson: 0,
    //           };
    //  const queryString = new URLSearchParams(params).toString();
    //           const requestOptions = {
    //             method: "GET",
    //             redirect: "follow",
    //           };
    //           fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
    //             .then((response) => response.text())
    //             .then((result) => {
    //               console.log(JSON.parse(result));
    //             })
    //             .catch((err) => console.log("err: ", err));
    
const [MinMax, setMinMax] = useState("Minimize")

const onOptionChange = e => {
    setMinMax(e.target.value);
    map.remove();
  }


  return (
    <>
       This is a test my guy!
      <input
        type="radio"
        name="topping"
        value="Minimize"
        id="minimize"
        checked={MinMax === "Minimize"}
        onChange={onOptionChange}
      />
      <label htmlFor="minimize">Minimize</label>

      <input
        type="radio"
        name="topping"
        value="Maximize"
        id="maximize"
        checked={MinMax === "Maximize"}
        onChange={onOptionChange}
      />
      <label htmlFor="maximize">Maximize</label>
      <p>
        Currently: <strong>{MinMax}</strong>
      </p>
    </>
  )
}

export default App
