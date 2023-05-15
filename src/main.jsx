import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import L from  '../node_modules/leaflet/dist/leaflet.js'   // // Creating map options
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
    


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    This is a test my guy!
  </React.StrictMode>,
  
)
