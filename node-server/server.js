const {ApolloServer, gql} = require("apollo-server-express");
const express = require("express");
const fetch = require("node-fetch");

const typeDefs = gql`
  type Query {
    getCountries(name: String): [Country]
  }

  type Country {
    fullName: String
    population: Int
    currencies: [Currencies]
  } 

  type Currencies {
    currency: String
    name: String
    exchangeRate:Float
  }
   
`;

const resolvers = {
        Query: {
            getCountries: (parent, args) => {
                return fetch(`https://restcountries.com/v3.1/name/${args.name}`)
                    .then(res => res.json())
                    .then(countriesJson => {
                            return fetch(`http://data.fixer.io/api/latest?access_key=65a46a3c3c9c4a87ab07b6a72500b80d`)
                                .then(res => res.json())
                                .then(ratesJson => {
                                    let rates = ratesJson.rates
                                    console.log(rates['IRR'] / rates['SEK'])
                                    let countries = countriesJson.map(country => ({
                                        fullName: country.name.official,
                                        population: country.population,
                                        currencies: Object.keys(country.currencies).map(item => ({
                                            currency: item,
                                            name: country.currencies[item].name,
                                            exchangeRate: rates[item] ? (rates[item] / rates['SEK']).toFixed(2) : 0
                                        }))
                                    }))
                                    return countries
                                })
                        }
                    )
            },
        }
    }
;

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});

app.listen({port: 4000}, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
