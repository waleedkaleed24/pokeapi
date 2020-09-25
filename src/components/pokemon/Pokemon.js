import React from 'react'
import { Link } from "react-router-dom";
import LoadingImg from './assets/loading.gif'
import '../pokemon/style.css'
import NavBar from '../ui/NavBar'

const Pokemon = ({ pokemon, isLoading }) => {



  return isLoading ? <div className="lodaing-container"><img src={LoadingImg} alt="LoadingImage" className="loading" /></div> :
  <>
  <NavBar />
    <section className="container grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4  m-auto mt-14">
      {
        pokemon.map(pokemonItem => (
          <div className=" px-3 sm:px-0 text-center" key={pokemonItem.name} >
              <Link to={`/pokemon/${pokemonItem.name}`} className="flex justify-between items-center p-4  bg-gray-200 duration-200 hover:bg-red-300 hover:text-white">
                <span className="font-semibold mr-2 ">{pokemonItem.name}</span>  <svg  className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
</svg>
                </Link>
          </div>




        ))
      }

    </section>
    </>

}

export default Pokemon
