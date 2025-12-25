import React from "react"
import { Link } from "react-router-dom"

const MovieCard = ({ movie }) => (

  /*<div className="bg-white shadow-lg rounded-md overflow-hidden hover:scale-105 transition-transform">*/
   <div className="relative bg-gradient-to-b from-gray-400 via-gray-700 to-white rounded-2xl overflow-hidden border-2 border-gray-500 shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer">
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-64 object-cover"
    />
    <div className="p-2">
      <h2 className="font-bold text-lg">{movie.title}</h2>
      <p className="font-bold">⭐ {movie.vote_average }</p>
      <Link
        to={`/movie/${movie.id}`}
        className="text-gray-600 font-semibold mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  </div>
)


export default MovieCard


