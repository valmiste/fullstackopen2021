import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country, setCountryFilter }) => {
  return (
    <li>
      {" "}
      {country.name.common}
      {" "}
      <button type="submit"
        onClick={() => setCountryFilter(country.name.common)}
      >show</button>
    </li>
  );
};

const CountryDetailedInfo = ({ country }) => {
  const languagesList = Object.values(country.languages);
  return (
    <div>
      {" "}
      <h2> {country.name.common} </h2>
      <p>
        Capital: <strong>{country.capital}</strong>
        <br />
        Population: <strong>{country.population}</strong>
      </p>
      <h3>Languages</h3>
        <div>
          {languagesList.map( language => (
            <li key={language}> {language} </li> 
          ))}
        </div>
      <h3>Flag</h3>
      <img src={country.flags.png} alt={country.name.common + ' flag'}/>
    </div>
  );
};

const Countries = ({countriesToShow, setCountryFilter}) => {
  return (
    <>
      {countriesToShow.map((country) => (
        <Country
          key={country.name.common}
          country={country}
          setCountryFilter={setCountryFilter}
        />
      ))}
    </>
  );
};

const Filter = (props) => {
  return (
    <p>
      <label>
        Find countries containing text {" "}
        <input
          type="text"
          value={props.countryFilter}
          onChange={(event) => props.setCountryFilter(event.target.value)}
        />
      </label>
    </p>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    const handleCountriesData = (response) => {
      setCountries(response.data);
    };

    const promiseFromCountries = axios.get(
      "https://restcountries.com/v3.1/all"
    );
    promiseFromCountries.then(handleCountriesData);
  }, []);

  // Create filtered list with case insensitive matching.
  const countriesToShow = countries.filter((country) => {
    if (countryFilter.length === 0) return true;

    const countryNameLowerCase = country.name.common.toLowerCase();
    if (countryNameLowerCase.indexOf(countryFilter.toLowerCase()) > -1) {
      return true;
    }
    return false;
  });

  let amountOfCountriesToShow = countriesToShow.length;
  let isSuitableAmountOfCountriesForListing = false;
  if (amountOfCountriesToShow > 1 && amountOfCountriesToShow < 10) {
    isSuitableAmountOfCountriesForListing = true;
  } else {
    isSuitableAmountOfCountriesForListing = false;
  }

  let isSuitableAmountOfCountriesForDetailedInfo = false;
  if (amountOfCountriesToShow === 1) {
    isSuitableAmountOfCountriesForDetailedInfo = true;
  }

  return (
    <div>
      <h2>Country Info</h2>

      <Filter
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter}
      />
      {isSuitableAmountOfCountriesForListing ? (
        <Countries
          countriesToShow={countriesToShow}
          setCountryFilter={setCountryFilter}
        />
      ) : (
        ""
      )}

      {isSuitableAmountOfCountriesForDetailedInfo ? (
        <CountryDetailedInfo country={countriesToShow[0]} />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
