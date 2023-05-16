import { useState, useEffect } from "react";
import './App.css'
import L from  '../node_modules/leaflet/dist/leaflet.js'   // // Creating map options

function App() {
    const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
    const [mapResult, setmapResult] = useState();
    const [searchText, setSearchText] = useState("England");
      
useEffect(() => {
    async function getMaps() {
    const params = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
              };
     const queryString = new URLSearchParams(params).toString();
              const requestOptions = {
                method: "GET",
                redirect: "follow",
              };
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  setmapResult(JSON.parse(result)[0].boundingbox);
                  if(map != undefined){ 
                    map.remove();
                    }
                })
                .catch((err) => console.log("err: ", err));
              }
              getMaps();
          return;
  }, []);

  console.log(mapResult)
  let mapCenter = [17.385044, 78.486671];
  if(mapResult != undefined){
    let m1 = parseFloat(mapResult[0]) + parseFloat(mapResult[1])
    let m2 = parseFloat(mapResult[2]) + parseFloat(mapResult[3])
    mapCenter[1] = m2 / 2
    mapCenter[0] = m1 / 2
  }
  var mapOptions = {
      center: mapCenter,
      zoom: 10
    }
    // // Creating a map object
    
    if(map != undefined){
      map.remove();
    }
    
    var map = new L.map('map', mapOptions);
    // // Creating a Layer object
    var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    // // Adding layer to the map
    map.addLayer(layer);
    
const [MinMax, setMinMax] = useState("Minimize")

const onOptionChange = e => {
    setMinMax(e.target.value);
    map.remove();
  }


  return (
    <>
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
