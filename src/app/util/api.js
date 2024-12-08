import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OMDB_BASE_URL;

export const fetchData = async ({ keyword = "Pokemon", page = 1, type = null, year = null }) => {
    const paramsObject = {
        apikey: API_KEY,
        s: keyword,
        page: page
    };

    if (type) paramsObject.type = type;
    if (year) paramsObject.y = year;

    try {
        const response = await axios.get(BASE_URL, {
            params: paramsObject
        });

        if (response.data && response.data.Response === "True") {
            // Her film için detay bilgilerini al
            const moviesWithDetails = await Promise.all(
                response.data.Search.map(async (movie) => {
                    const detailResponse = await axios.get(BASE_URL, {
                        params: {
                            apikey: API_KEY,
                            i: movie.imdbID
                        }
                    });
                    return detailResponse.data;
                })
            );

            return {
                data: moviesWithDetails,
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
