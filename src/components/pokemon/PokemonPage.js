import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import NavBar from "../ui/NavBar";
import LoadingImg from "./assets/loading.gif";

const PokemonPage = () => {
  let { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [stat, setStat] = useState([]);
  const [abilitie, setAbilities] = useState([]);
  const [type, setTypes] = useState([]);
  const [move, setMoves] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchDetailsPage = async () => {
      const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setIsLoading(false);
      //Set Pokemon data
      setPokemonDetails(response.data);
      const pokeData = response.data;

      //Set More Image
      setImage(
        <div className="image flex justify-center items-center bg-gray-400 border w-64 h-64 m-auto rounded-full shadow-xl max-w-md ">
          {" "}
          {response.data.sprites.other.dream_world.front_defaul === " " ? (
            <img
              className="w-full  h-full"
              src={response.data.sprites.front_default}
              alt={pokeData.name}
            />
          ) : (
            <img
              className="w-full h-full"
              src={response.data.sprites.other.dream_world.front_default}
              alt={pokeData.name}
            />
          )}{" "}
        </div>,
      );

      //Set Abilities
      setAbilities(
        pokeData.abilities.map((el) => (
          <p className="ability__name inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
            {el.ability.name}
          </p>
        )),
      );

      //Set Types
      setTypes(
        pokeData.types.map((el) => (
          <p className="type__name inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
            {el.type.name}
          </p>
        )),
      );

      //Set stat
      setStat(
        pokeData.stats.map((el) => (
          <p className="stat__name nline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
            {el.stat.name}{" "}
            <span className="stat__base-stat">{el.base_stat}</span>
          </p>
        )),
      );

      //Set Move
      setMoves(
        pokeData.moves.map((el) => (
          <p className="move__name nline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
            {el.move.name}
          </p>
        )),
      );

      console.log(response.data);
      console.log(abilitie);
    };
    fetchDetailsPage();
  }, []);

  // const [species, setSpecies] = useState([])

  // useEffect(() => {
  //   setIsLoading(true)
  //   const fetchDetailsvolution = async () => {
  //     const evolution = await axios(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  //     setIsLoading(false)
  //     setSpecies(evolution.data)

  //     console.log(evolution.data)

  //   }
  //   fetchDetailsvolution()

  // }, [])

  return isLoading ? (
    <div className="lodaing-container flex justify-center items-center h-full fixed w-full bg-white">
      <img src={LoadingImg} alt="LoadingImage" className="loading" />
    </div>
  ) : (
    <>
      <NavBar />

      <main className="poke container m-auto mb-10 bg-gray-200 p-4 shadow-xl border relative">
        <div className="flex justify-between items-center">
          <Link
            className="bg-red-400 duration-200 hover:bg-red-300 inline-block p-4 text-white rounded-full"
            to="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-cool-gray-800 dark:text-cool-gray-200 group-hover:text-purple-600 group-focus:text-purple-600 dark:group-hover:text-purple-50 dark:group-focus:text-purple-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </Link>

          <h3 className="text-md font-bold text-right uppercase mb-2">
            order number :{" "}
            <span className="bg-green-400 text-white py-4 px-3 h-2 rounded-full">
              {pokemonDetails.order}
            </span>
          </h3>
        </div>

        {image}

        <div className="poke__content text-center px-6 py-4 ">
          <h2 className="poke__name font-bold text-xl mb-2 uppercase">
            {pokemonDetails.name}
          </h2>

          <div className="poke__abilities px-6 pt-4 pb-2 ">
            <h3 className="text-md font-bold  uppercase mb-2"> ability</h3>
            {abilitie}
          </div>
          <div className="poke__types px-6 pt-4 pb-2 ">
            <h3 className="text-md font-bold  uppercase mb-2"> types</h3>
            {type}
          </div>

          <div className="poke__stats px-6 pt-4 pb-2 ">
            <h3 className="text-md font-bold  uppercase mb-2"> stats </h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
              {stat}
            </div>
          </div>

          <hr></hr>

          <div className="poke__moves px-6 pt-4 pb-2 ">
            <h3 className="text-md font-bold  uppercase mb-2"> moves </h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
              {move}
            </div>
          </div>
        </div>

        <div></div>
      </main>
    </>
  );
};

export default PokemonPage;
