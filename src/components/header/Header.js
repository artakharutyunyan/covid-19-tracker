import React from "react";
import "./Header.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Tooltip,
} from "@material-ui/core";
import Sticky from "react-sticky-el";
import useScreenSize from "use-screen-size";

function Header({ country, countries, onCountryChange }) {
  const size = useScreenSize();
  return (
    <div className="app__header">
      <h1>COVID-19 Tracker</h1>
      <Sticky
        stickyStyle={{
          zIndex: 999999,
          right: size.width <= 1000 && "30%",
          top: 10,
        }}
      >
        <FormControl className="app__dropdown">
          <Tooltip title="Select any country" placement="left">
            <Select
              style={{ height: 35 }}
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
        </FormControl>
      </Sticky>
    </div>
  );
}

export default Header;
