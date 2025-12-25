import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const fetchPopularMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: "en-US", page: 1 },
    })
    return res.data.results
  } catch (err) {
    console.error(err)
    return []
  }
}

export const fetchMovieDetails = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY, language: "en-US" },
    })
    return res.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const searchMovies = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, language: "en-US", query },
    })
    return res.data.results
  } catch (err) {
    console.error(err)
    return []
  }
}
