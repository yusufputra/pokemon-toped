import { useQuery } from "@apollo/client";
export const ToDos = (GET_QUERY, gqlvariables) => {
  const { loading, error, data } = useQuery(GET_QUERY, {
    variables: gqlvariables,
  });

  if (loading) console.log("Loading...");
  if (error) console.log(`Error! ${error.message}`);

  return data == undefined
    ? {
        pokemons: { results: [] },
        pokemon: { name: null, abilities: [], types: [], moves: [] },
      }
    : data;
};
