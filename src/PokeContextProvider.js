import React, { useEffect, useState, createContext } from "react";
import { gql } from "@apollo/client";
import { ToDos } from "./component/ToDos";

export const PokeContext = createContext();
const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;
const gqlVariables = {
  limit: 100,
  offset: 0,
};
const PokeContextProvider = (props) => {
//   const [data, setData] = useState(ToDos(GET_POKEMONS, gqlVariables));
  const data = ToDos(GET_POKEMONS, gqlVariables);
  return (
    <PokeContext.Provider value={{ data }}>
      {props.children}
    </PokeContext.Provider>
  );
};

export default PokeContextProvider;
