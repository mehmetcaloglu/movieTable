import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchData = async ({ keyword = "Pokemon", page = 1, type = null, year = null }) => {
    var paramsObject = {
        apikey: API_KEY,
        s: keyword,
        page: page
    }

    // Opsiyonel parametreler
    if (type) paramsObject.type = type; // movie, series, episode
    if (year) paramsObject.y = year;

    try {
        const response = await axios.get(BASE_URL, {
            params: paramsObject
        });

        if (response.data && response.data.Response === "True") {
            return {
                data: response.data.Search,
                totalResults: parseInt(response.data.totalResults),
                page: {
                    totalPages: Math.ceil(parseInt(response.data.totalResults) / 10)
                }
            };
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const fetchMovieDetails = async (imdbID) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                i: imdbID,
                plot: 'full'
            }
        });

        if (response.data && response.data.Response === "True") {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};
