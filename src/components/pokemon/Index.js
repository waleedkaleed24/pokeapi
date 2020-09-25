import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import Pagination from "../ui/Pagination/index";

const Index = () => {
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset=500&limit=500");
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    setIsLoading(true);
    let cancel;
    const fetchPokemonData = async () => {
      const response = await axios(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      setIsLoading(false);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);

      // this is a loop to throw of all name
      setPokemon(response.data.results.map((pokemon) => pokemon));
    };
    fetchPokemonData();

    return () => cancel();
  }, [currentPageUrl]);

  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }



  return (
    <>
      <Pokemon isLoading={isLoading} pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
};

export default Index;
