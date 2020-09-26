import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from "react-router-dom"
import NavBar from '../ui/NavBar'
import LoadingImg from './assets/loading.gif'


const PokemonPage = () => {
  let { id } = useParams()
  const currentPageUrl = (`https://pokeapi.co/api/v2/pokemon/${id}`);
  const [pokemonDetails, setPokemonDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState([])
  const [stat, setStat] = useState([])
  const [abilitie, setAbilities] = useState([])
  const [type, setTypes] = useState([])
  const [move, setMoves] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const fetchDetailsPage = async () => {
      const response = await axios(currentPageUrl)
      setIsLoading(false)
      //Set Pokemon data
      setPokemonDetails(response.data)
      const pokeData = response.data

      //Set More Image
      setImage((pokeData.sprites.other.dream_world.front_default === null) ? <img className="w-full  h-full" src={pokeData.sprites.front_default} alt={pokeData.name} /> : <img className="w-full h-full" src={pokeData.sprites.other.dream_world.front_default} alt={pokeData.name} />)

      //Set Abilities
      setAbilities(pokeData.abilities.map((el,i) => <p className="ability__name inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" key={i}>{el.ability.name}</p>))

      //Set Types
      setTypes(pokeData.types.map((el,i) => <p className="type__name inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" key={i}> {el.type.name}</p>))

      //Set stat 
      setStat(pokeData.stats.map((el,i) => <p className="stat__name nline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" key={i}> {el.stat.name} <span className="stat__base-stat">{el.base_stat}</span></p>))

      //Set Move 
      setMoves(pokeData.moves.map((el,i) => <p className="move__name nline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2" key={i}> {el.move.name}</p>))
    }

    fetchDetailsPage()
  }, [currentPageUrl])

  
  //Get the pokemon evolution 

  const [level_1, setLevel_1] = useState('')
  const [level_2, setLevel_2] = useState('')
  const [level_3, setLevel_3] = useState('')
  
    useEffect(() => {
      setIsLoading(true)
      const fetchEvolution = async () => {
        await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${pokemonDetails.id}`).then(res => {                            
          setLevel_1(<p className="move__name nline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"> {res.data.chain.evolves_to[0].evolves_to[0].species.name}</p> )
          setLevel_2(<p className="move__name nline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"> {res.data.chain.evolves_to[0].species.name}</p> )
          setLevel_3(<p className="move__name nline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"> {res.data.chain.species.name}</p> )        
        }).catch(function (err) {
          if (err.stats !== 200) {
            axios.isCancel(err)
          }else {
            console.error('Evolution 404 ! not found')
          }
        })
        setIsLoading(false)
      }
      fetchEvolution()
    }, [pokemonDetails.id])
    
  
  return (
    isLoading ? <div className="lodaing-container flex justify-center items-center h-full fixed w-full bg-white">
      <img src={LoadingImg} alt="LoadingImage" className="loading" />
    </div> :
        <>
            <NavBar />

          <main className="poke container m-auto mb-10 bg-gray-200 p-4 shadow-xl border relative">
                <div className="flex justify-between items-center">
                  <Link className="bg-red-400 duration-200 hover:bg-red-300 inline-block p-4 text-white rounded-full" to="/" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-cool-gray-800 dark:text-cool-gray-200 group-hover:text-purple-600 group-focus:text-purple-600 dark:group-hover:text-purple-50 dark:group-focus:text-purple-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                  </Link>
                <h3 className="text-md font-bold text-right uppercase mb-2">order number : <span># {pokemonDetails.order}</span></h3>
                </div>
                <div className="image flex justify-center items-center bg-gray-400 border w-64 h-64 m-auto rounded-full shadow-xl max-w-md ">{image}</div>

                <div className="poke__content text-center px-6 py-4 "> 
                  <h2 className="poke__name font-bold text-xl my-4 uppercase" >{pokemonDetails.name}</h2>
                </div>

                <div className="poke__abilities px-6 pt-4 pb-2 ">
                  <h3 className="text-md font-bold  uppercase my-4"> ability</h3>
                    {abilitie}
                </div>

                <div className="poke__types px-6 pt-4 pb-2 ">
                  <h3 className="text-md font-bold  uppercase my-4"> types</h3>
                  {type}
                </div>

              <div className="poke__stats px-6 pt-4 pb-2 ">
                <h3 className="text-md font-bold  uppercase my-4 "> stats </h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4"> {stat} </div>
              </div>

              <div className="poke__evolves-to px-6 pt-4 pb-2 ">
                <h3 className="text-md font-bold  uppercase my-4"> {level_1 ||level_2 || level_3 === ' ' ? 'evolves to'  : ' '} </h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
                      {level_1 ? level_1  : ' ' }
                      {level_2 ? level_2  : ' ' }
                      {level_3 ? level_3  : ' ' }
                  </div>
              </div>

              <div className="poke__moves px-6 pt-4 pb-2 ">
                  <h3 className="text-md font-bold  uppercase mb-2"> moves </h3>
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
                        {move}
                      </div>
              </div>
        </main>
      </>
  )
}

export default PokemonPage