import React, { useState } from 'react';
import { TextField, Box, Typography, Autocomplete, Card, CardContent, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useNavigate } from "react-router-dom";

const provider = new OpenStreetMapProvider({
  params: {
    'accept-language': 'fr', // render results in fr
    'extratags': 0,
    'limit': 3,
  },
});

export const ItinaryForm = () => {
  // City input
  const [selectedCityOption, setSelectedCityOption] = useState([]);
  const [citySearchBoxValue, setCitySearchBoxValue] = useState('');
  const [options, setOptions] = useState([])
  const [typingTimeout, setTypingTimeout] = useState(0)

  // Name input
  const [tripName, setTripName] = useState("")

  // Description input
  const [tripNbDays, setTripNbDays] = useState("")

  // Description input
  const [tripDescription, setTripDescription] = useState("")

  const navigate = useNavigate();

  const submitForm = () => {

    if (selectedCityOption && tripName && tripNbDays) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: tripName,
          Description: tripDescription,
          NbDays: tripNbDays,
          CityName: selectedCityOption.label,
          CityLatitude: JSON.parse(selectedCityOption.value).y,
          CityLongitude: JSON.parse(selectedCityOption.value).x,
        })
      };
      fetch('https://localhost:44396/api/Trip', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          navigate("/itinary-designer");
        });
    }
  }

  return (
    <>
      <Box sx={{
        backgroundColor: "#E8E8E8",
        margin: "auto",
        marginTop: 10,
        width: "450px",
        height: "100%",
      }}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{
                marginTop: 1,
                marginBottom: 4,
                textAlign: "center",
              }}>
              <b>Create your own Trip</b>
            </Typography>
            <Autocomplete
              id="city-input"
              name="city"
              label="City"
              noOptionsText={'Type the name of the city you want to discover'}
              required
              fullWidth
              value={selectedCityOption}
              onChange={(event, value) => {
                if (value) {
                  setSelectedCityOption(value);
                }
              }}
              inputValue={citySearchBoxValue}
              onInputChange={async (event, newInputValue) => {
                console.log("TYPED", newInputValue)
                if (typingTimeout) {
                  clearTimeout(typingTimeout);
                }
                setTypingTimeout(setTimeout(async function () {
                  let cities = await provider.search({ query: newInputValue })
                  console.log(cities);
                  setOptions(cities.map((city) => ({
                    value: JSON.stringify(city),
                    label: city.label
                  })));
                }, 1000));
                setCitySearchBoxValue(newInputValue);
              }}
              options={options}
              getOptionLabel={(option) => option.label || ""}
              renderInput={(params) => <TextField required {...params} label="City" />}
              sx={{
                marginBottom: 4,
              }}
            />
            <TextField
              id="tripName-input"
              name="tripName"
              label="Name"
              type="text"
              autoComplete='off'
              value={tripName}
              onChange={(event) => {
                setTripName(event.target.value);
              }}
              error
              helperText="Incorrect entry."
              required
              fullWidth
              sx={{
                marginBottom: 4,
              }}
            />
            <FormControl
              required
              fullWidth
              sx={{
                marginBottom: 4,
              }}
            >
              <InputLabel id="demo-simple-select-label">Number of days</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tripNbDays}
                label="Number of days"
                onChange={(event) => {
                  setTripNbDays(event.target.value);
                }}

              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <TextField
              multiline
              rows={5}
              id="tripDescription-input"
              name="tripDescription"
              label="Description"
              type="text"
              autoComplete='off'
              value={tripDescription}
              onChange={(event) => {
                setTripDescription(event.target.value);
              }}
              fullWidth
              sx={{
                marginBottom: 4,
              }}
            />
            <Box sx={{ flexGrow: 1 }}></Box>
            <Button
              variant="contained"
              onClick={submitForm}
              sx={{
                marginBottom: "15px !important",
                color: '#9fafce',
                backgroundColor: "#10377a",
                width: "100%",
                margin: "0 auto",
                '&:hover': {
                  backgroundColor: "#10377a", color: '#ffffff'
                }
              }}>
              Envoyer
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default ItinaryForm;