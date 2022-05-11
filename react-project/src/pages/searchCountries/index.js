import {useEffect, useState} from "react";
import {getToken} from "../../utils/localStorages";
import {useNavigate} from "react-router-dom";
// import "./App.css";

function SearchCountries() {
    const [searchText, setSearchText] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        if (!getToken()) navigate('/401')
    })
    const getCountryList = () => {
        console.log(searchText)
        let data = {
            query: `            
              query getCountriesByName($searchText : String){
               getCountries(name:$searchText){
                       fullName
                        population
                        currencies{
                          currency
                          name
                        }
              }
            }            
            `,
            variables: {
                'searchText': searchText
            }
        };
        fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(jsonRes => console.log(jsonRes));
    };
    return (
        <div className="App">
            <input
                type={"text"}
                value={searchText}
                onChange={(e) => {
                    console.log(e.target.value)
                    setSearchText(e.target.value)
                }}
            />
            <button type={"button"} onClick={getCountryList}>search</button>

        </div>
    );
}

export default SearchCountries;
