import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";
import Loader from "../components/Loader";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);

      // Fetch movie details
      const data = await fetchMovieDetails(id);
      setMovie(data);

      // Fetch movie videos for trailer
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
      );
      setVideos(res.data.results);

      setLoading(false);
    };

    getMovie();
  }, [id]);

  if (loading) return <Loader />;

  if (!movie)
    return (
      <p className="p-4 text-center text-white text-lg">Movie not found.</p>
    );

  // Find YouTube trailer
  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-block mb-6 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
      >
         Back
      </Link>

      {/* Movie Card */}
      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Poster */}
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-80 h-auto object-cover rounded-l-2xl"
          />
          <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full shadow-lg">
            ⭐ {movie.vote_average}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 p-6 text-white flex flex-col justify-start">
          <h1 className="text-4xl font-extrabold mb-4">{movie.title}</h1>
          <p className="mb-4 text-gray-300">{movie.overview}</p>
          <div className="text-gray-300 space-y-1">
            <p>
              <span className="font-semibold text-white">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            {movie.runtime && (
              <p>
                <span className="font-semibold text-white">Runtime:</span>{" "}
                {movie.runtime} min
              </p>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <p>
                <span className="font-semibold text-white">Genres:</span>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Trailer */}
     {/* {trailer && (
        <div className="mt-6 max-w-5xl mx-auto rounded-5xl ">
          <h1 className="text-white font-bold text-xl mb-2">Trailer</h1>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
            title="YouTube trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-3xl shadow-lg"
          ></iframe>
        </div>
      )}*/}
      <div className="mt-6 max-w-5xl mx-auto rounded-5xl">
  <h1 className="text-white font-bold text-xl mb-2">Trailer</h1>

  {trailer ? (
    <iframe
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
      title="YouTube trailer"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="rounded-3xl shadow-lg"
    ></iframe>
  ) : (
    <p className="text-gray-300 text-center py-20 bg-gray-800 rounded-3xl shadow-lg">
      Trailer not available 🎬
    </p>
  )}
</div>

    </div>
  );
};

export default MovieDetails;
