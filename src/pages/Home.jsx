import React, { useEffect, useState } from "react";
import { fetchPopularMovies, searchMovies } from "../services/api";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchPopularMovies();
      setMovies(data);
      setLoading(false);
    };
    getMovies();
  }, []);

  // ✅ Handle search
  const handleSearch = async (query) => {
    const cleanedQuery = query.trim().toLowerCase();
    if (!cleanedQuery) return;

    setLoading(true);

    const data = await searchMovies(cleanedQuery);

    // Exact match
    const exactMatch = data.find(
      (movie) => movie.title.toLowerCase() === cleanedQuery
    );

    if (exactMatch) {
      setMovies([exactMatch]);
    } else {
      setMovies([]); // No movies found
    }

    setLoading(false);
  };

  // ✅ Reset to popular movies
  const handleBack = async () => {
    setLoading(true);
    const data = await fetchPopularMovies();
    setMovies(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar onSearch={handleSearch} />

      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center p-6">
          <p className="text-white text-lg mb-4">No movies found.</p>
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;