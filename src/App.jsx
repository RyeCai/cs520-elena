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
    
const [topping, setTopping] = useState("Medium")




  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
       This is a test my guy!
      <div>
        <input type="radio" value="Maximize" name = "minMax" /> Maximize
        <input type="radio" value="Minimize" name = "minMax" /> Minimize
      </div>
    </>
  )
}

export default App
