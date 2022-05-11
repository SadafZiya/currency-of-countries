function CountryList(props) {
  let { setCountryList, countryList } = props;

  const exchangeCurrency = (e, exchangeRate) => {
    let { id, value } = e.target;
    let idSplited = id.split("-");
    let findCountry = countryList.find(
      (country) => country.fullName == idSplited[0]
    );
    let findCurrency = findCountry.currencies.find(
      (currency) => currency.currency == idSplited[1]
    );
    findCurrency.calculateRate = (value * exchangeRate).toFixed(2);
    setCountryList([...countryList]);
  };
  return (
    <table id={"countries"}>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Population</th>
          <th>
            <tr>
              <th style={{ width: 120 }}>Currency Name</th>
              <th style={{ width: 117 }}>Exchange Rate</th>
              <th style={{ width: 102 }}>SEK Amount</th>
              <th>Converted Amount To Local Currency</th>
            </tr>
          </th>
        </tr>
      </thead>
      <tbody>
        {countryList.map((country, index) => {
          return (
            <tr key={index}>
              <td>{country.fullName}</td>
              <td>{country.population.toLocaleString()}</td>
              <td>
                {country.currencies.map((currency, indexCurrency) => (
                  <tr key={indexCurrency}>
                    <td style={{ width: 120 }}>{currency.name}</td>
                    <td style={{ width: 117 }}>{currency.exchangeRate}</td>
                    <td style={{ width: 102 }}>
                      <input
                        style={{ width: 50 }}
                        id={country.fullName + "-" + currency.currency}
                        onChange={(e) =>
                          exchangeCurrency(e, currency.exchangeRate)
                        }
                      />{" "}
                      SEK
                    </td>
                    <td>{currency.calculateRate + " " + currency.currency}</td>
                  </tr>
                ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CountryList;
