const { ForbiddenError } = require("apollo-server");
const fetch = require("node-fetch");
const {
  registerUser,
  logOutUser,
  getAllUser,
} = require("../../query/userQuery");
const resolvers = {
  Query: {
    getCountries: (parent, args, { user }) => {
      if (!user) throw new ForbiddenError("Not Authenticated as User");
      return fetch(`http://restcountries.com/v3.1/name/${args.name}`)
        .then((res) => res.json())
        .then((countriesJson) => {
          // this api : monthly usage limit has been reached
          // return fetch(`http://data.fixer.io/api/latest?access_key=65a46a3c3c9c4a87ab07b6a72500b80d`)
          //     .then(res => res.json())
          //     .then(ratesJson => {...}
          const ratesJson = require("../../query/rate.json");
          let rates = ratesJson.rates;
          let countries = countriesJson.map((country) => ({
            fullName: country.name.official,
            population: country.population,
            currencies: Object.keys(country.currencies).map((item) => ({
              currency: item,
              name: country.currencies[item].name,
              exchangeRate: rates[item]
                ? (rates[item] / rates["SEK"]).toFixed(2)
                : 0,
            })),
          }));
          return countries;
        });
    },
    signUp: (parent, args, { user }) => {
      if (user) throw new Error("You can't SignUp, because you're login!");
      registerUser(args);
    },
    getAllUsers: async () => getAllUser(),
    signOut: async (parent, args, { user }) => logOutUser(user),
  },
};
module.exports = resolvers;
