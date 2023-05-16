import React from "react";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import InputContainer from "./components/InputContainer.jsx"
import L from "../node_modules/leaflet/dist/leaflet.js"; // // Creating map options
import axios from "../node_modules/axios/dist/axios.js";

const center = [42.3906, -72.5283];
const zoom = 16;

function Map() {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

function App() {
  const [mapResult, setmapResult] = useState();
  const [searchBox, setSearchText] = useState({
    minLon: -72.545899,
    minLat: 42.350808,
    maxLon: -72.5,
    maxLat: 42.361899,
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

  // Define the Overpass API query currently set to amherst 
  const minLon = -72.545899;
  const minLat = 42.350808;
  const maxLon = -72.5;
  const maxLat = 42.361899;

  // Define the Overpass API query with the bounding box
  const overpassQuery = `
  [out:json];
  way(${minLat},${minLon},${maxLat},${maxLon});
  out geom;
`;
  // Create a function to fetch ways using the Overpass API
  async function fetchWays() {
    try {
      // Make the request to the Overpass API
      const response = await axios.get(
        "https://overpass-api.de/api/interpreter",
        {
          params: {
            data: overpassQuery,
          },
        }
      );

      // Extract the ways from the response data
      const ways = response.data.elements.filter(
        (element) => element.type === "way"
      );

      // Process the ways as needed
      return ways;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Call the fetchWays function to retrieve the ways
  // returns a list of OSM ways which are composed of lat/long points that define the road
  let ways;
  if (mapResult != undefined) {
    const getWays = async () => {
      ways = await fetchWays();
      console.log(ways);
    };
    getWays();
  }

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
      var map = new L.map("map", mapOptions);
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
    e;
    setSearchText(tempText);
  };

  return (
    <>
      <InputContainer />
      <Map />
    </>
  );
}

export default App;
