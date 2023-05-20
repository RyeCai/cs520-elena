import React, { useState } from "react";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import wretch from "wretch";

function fetchGeoCoords(query) {
  const url = new URL("https://geocode.maps.co/search");
  url.searchParams.set("q", query);

  return wretch(url.toString())
    .get()
    .json(json => {
      if (Array.isArray(json)) {
        return json.map(entry => {
          const nameParts = entry.display_name.split(", ");

          const displayParts = nameParts.splice(0, Math.min(nameParts.length, 4));

          return { name: displayParts.join(", "), location: [entry.lat, entry.lon] };
        });
      } else {
        throw new Error("Bad results.");
      }
    });
}

function SearchResultsModal({ searchResults, onSubmit }) {
  const [resultIndex, setResultIndex] = useState("0");
  const [isOpen, setIsOpen] = useState(true);

  function handleLocationRadioChange(e) {
    setResultIndex(e.target.value);
  }

  function handleLocationSubmit(e) {
    e.preventDefault();

    onSubmit(parseInt(resultIndex));
  }

  function handleOnClose() {
    setIsOpen(false);
    onSubmit(-1);
  }

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
        }}
      >
        <Paper sx={{ padding: "10px" }}>
          <form onSubmit={handleLocationSubmit}>
            <FormControl>
              <FormLabel>Location Options</FormLabel>
              <RadioGroup value={resultIndex} onChange={handleLocationRadioChange}>
                {searchResults.map((result, i) => (
                  <FormControlLabel key={i} value={String(i)} label={result.name} control={<Radio />} />
                ))}
              </RadioGroup>
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                Select Location
              </Button>
            </FormControl>
          </form>
        </Paper>
      </div>
    </Modal>
  );
}

export default function LocationSelection({ name, color }) {
  const [text, setText] = useState("");
  const [selection, setSelection] = useState(undefined);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const disableInput = Boolean(selection) || Boolean(isSearching);
  const disableSearch = text.length <= 0 || disableInput;

  async function handleSearch() {
    setIsSearching(true);

    let results;
    try {
      results = await fetchGeoCoords(text);
    } catch {
      // TODO
      setIsSearching(false);
      return;
    }

    if (results.length > 1) {
      setSearchResults(results);
    } else {
      if (results.length === 1) setSelection(results[0]);

      setIsSearching(false);
    }
  }

  function handleSearchSelection(index) {
    setIsSearching(false);

    if (index >= 0) {
      const selection = searchResults[index];
      setSelection(selection);
    }
  }

  function handleReset() {
    setText("");
    setSelection(undefined);
  }

  return (
    <>
      <TextField
        sx={{ paddingBottom: "20px" }}
        fullWidth
        label={`${name} Location`}
        value={selection ? selection.name : text}
        disabled={disableInput}
        onChange={e => setText(e.target.value)}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button fullWidth color={color} variant="contained" disabled={disableSearch} onClick={() => handleSearch()}>
            Search
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth color={color} variant="outlined" disabled={!selection} onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
      {isSearching && <SearchResultsModal searchResults={searchResults} onSubmit={handleSearchSelection} />}
    </>
  );
}
