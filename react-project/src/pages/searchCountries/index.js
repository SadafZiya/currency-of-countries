import React, { useEffect, useState, useMemo } from "react";
import { getToken } from "../../utils/localStorages";
import { useNavigate } from "react-router-dom";
import { fetchCountryList } from "../../services/serviceInfo";
import CountryList from "../../components/countries/countryList";
import "../../design/countries/index.css";
import { Input } from "antd";
import Header from "../../components/header";

function SearchCountries() {
  const [searchText, setSearchText] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) navigate("/401");
  });
  useMemo(async () => {
    if (searchText == null) return;
    let fetchDataResult = await fetchCountryList(searchText);
    if (fetchDataResult?.success)
      setCountryList(
        fetchDataResult?.data.map((country) => ({
          ...country,
          currencies: country.currencies.map((currency) => ({
            ...currency,
            calculateRate: 0,
          })),
        }))
      );
  }, [searchText]);

  return (
    <div className="main-div-search-page">
      <Header />
      <Input
        id="searchInput"
        placeholder={"search country name"}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />

      <CountryList setCountryList={setCountryList} countryList={countryList} />
    </div>
  );
}

export default SearchCountries;
