import React, { useState, useEffect } from "react";
import "./App.css";
import numeral from "numeral";
import Sticky from "react-sticky-el";
import { sortData, prettyPrintStat } from "./util";
import { Card, CardContent } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
//components
import Header from "./components/header/Header";
import InfoBox from "./components/infoBox/InfoBox";
import Map from "./components/map/Map";
import LineGraph from "./components/LineGraph";
import BarGraph from "./components/BarGraph";
import Table from "./components/table/Table";
import Footer from "./components/footer/Footer";

function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryName, setCountryName] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({
    lat: 19.4194806,
    lng: 21.3089653,
  });
  const [mapZoom, setMapZoom] = useState(2);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    console.log("code: ", countryCode);
    console.log("url: ", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        if (countryCode !== "worldwide") {
          setCountryName(data.country);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(5);
        } else {
          setCountryName("worldwide");
          setMapCenter({
            lat: 19.4194806,
            lng: 21.3089653,
          });
          setMapZoom(2);
        }
      });
  };
  return (
    <div>
      <div className="app">
        <div className="app__left">
          <Header
            country={country}
            countries={countries}
            onCountryChange={onCountryChange}
          />
          <Sticky stickyStyle={{ zIndex: 9999 }}>
            <div className="app__stats">
              <InfoBox
                onClick={(e) => setCasesType("cases")}
                title="New Cases"
                isBlue
                active={casesType === "cases"}
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={numeral(countryInfo.cases).format("0.0a")}
                style={{ zIndex: 9999999999999999999 }}
              />
              <InfoBox
                onClick={(e) => setCasesType("recovered")}
                title="Recovered"
                isGreen
                active={casesType === "recovered"}
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={numeral(countryInfo.recovered).format("0.0a")}
              />
              <InfoBox
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                isRed
                active={casesType === "deaths"}
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={numeral(countryInfo.deaths).format("0.0a")}
              />
            </div>
          </Sticky>
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3 style={{ paddingTop: 20 }}>
                Past 30 days {casesType} (
                {countryName.charAt(0).toUpperCase() + countryName.slice(1)})
              </h3>
              <LineGraph casesType={casesType} country={country} />
              <h3 style={{ paddingTop: 20 }}>
                Totals (
                {countryName.charAt(0).toUpperCase() + countryName.slice(1)})
              </h3>
              <BarGraph countryInfo={countryInfo} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default App;
