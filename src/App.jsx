import { useState, useEffect } from "react";
import "./App.css";
import L from "../node_modules/leaflet/dist/leaflet.js"; // // Creating map options
function App() {
  const [mapResult, setmapResult] = useState();
  const [searchBox, setSearchText] = useState({
    minLon: 42.3644,
    minLat: -72.5531,
    maxLon: 42.373,
    maxLat: -72.536,
  });
  const [tempText, setTempText] = useState();
  const layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  useEffect(() => {
    async function getMaps() {
      console.log("mapping");
      const endpoint = "https://www.openstreetmap.org/api/0.6/map";
      const bbox = searchBox;

      // Build the API URL
      const apiUrl = `${endpoint}?bbox=${bbox.minLon},${bbox.minLat},${bbox.maxLon},${bbox.maxLat}`;

      // Make the API call using fetch
      await fetch(apiUrl)
        .then((response) => response.text())
        .then((data) => {
          // Process the response data
          setmapResult(data);
          // console.log(data);
          // Do something with the data
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getMaps();
    return;
  }, [searchBox]);
  console.log(mapResult);
    useEffect(() => {
      async function renderMap() {
        console.log("rendering");
        let mapCenter = [17.385044, 78.486671];
        if (mapResult != undefined) {
          let m1 = parseFloat(mapResult[0]) + parseFloat(mapResult[1]);
          let m2 = parseFloat(mapResult[2]) + parseFloat(mapResult[3]);
          mapCenter[1] = m2 / 2;
          mapCenter[0] = m1 / 2;
          mapCenter = [17.385044, 78.486671];
        }
        var mapOptions = {
          center: mapCenter,
          zoom: 10,
        };
        // // Creating a map object
        var map = (new L.map("map", mapOptions));
        // // Creating a Layer object
        // // Adding layer to the map
        map.addLayer(layer);
      }
      renderMap();
      return;
    }, []);


  const [MinMax, setMinMax] = useState("Minimize");

  const onOptionChange = (e) => {
    setMinMax(e.target.value);
  };
  const handleSearch = (e) => {
    setTempText(e.target.value);
  };

  const startSearch = (e) => {
    e
    setSearchText(tempText);
  };

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
      <input name="myInput" onChange={handleSearch} />
      <button name="search" title="Search" onClick={startSearch}></button>
      <br></br>
    </>
  );
}

export default App;
