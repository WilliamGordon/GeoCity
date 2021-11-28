import React, { useState } from 'react';
import { TextField, Box, Typography, Autocomplete, Card, CardContent, Button } from '@mui/material';
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
  const [itinaryName, setItinaryName] = useState("")
  
  // Description input
  const [itinaryDescription, setItinaryDescription] = useState("")

  const navigate = useNavigate();

  const submitForm = () => {
    
    if (selectedCityOption && itinaryName && itinaryDescription) {
      let formData = {
        itinaryCitName: selectedCityOption.label,
        itinaryCityPosition: [JSON.parse(selectedCityOption.value).y, JSON.parse(selectedCityOption.value).x],
        itinaryName: itinaryName,
        itinaryDescription: itinaryDescription,
      }
      navigate("/itinary-designer");
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
              <b>Create your own itinary</b>
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
              renderInput={(params) => <TextField {...params} label="City" />}
              sx={{
                marginBottom: 4,
              }}
            />
            <TextField
              id="itinaryName-input"
              name="itinaryName"
              label="Name"
              type="text"
              autoComplete='off'
              value={itinaryName}
              onChange={(event) => {
                setItinaryName(event.target.value);
              }}
              required
              fullWidth
              sx={{
                marginBottom: 4,
              }}
            />
            <TextField
              multiline
              rows={5}
              id="itinaryDescription-input"
              name="itinaryDescription"
              label="Description"
              type="text"
              autoComplete='off'
              value={itinaryDescription}
              onChange={(event) => {
                setItinaryDescription(event.target.value);
              }}
              required
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