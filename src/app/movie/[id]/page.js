"use client"
import { useEffect, useState, use } from 'react'
import { fetchMovieDetails } from '@/app/util/api'
import { useRouter } from 'next/navigation'

export default function MovieDetail({ params }) {
    const router = useRouter()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const movieId = use(params).id

    useEffect(() => {
        if (!movieId) return;

        fetchMovieDetails(movieId)
            .then(data => {
                if (data) {
                    setMovie(data)
                } else {
                    setError("Film bulunamadı")
                }
                setLoading(false)
            })
            .catch(err => {
                setError("Film detayları getirilirken bir hata oluştu")
                setLoading(false)
            })
    }, [movieId])

    if (loading) return <div className="flex justify-center items-center h-screen">Yükleniyor...</div>
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    if (!movie) return null

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => router.back()}
                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Listeye Dön
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Poster */}
                <div className="w-full md:w-1/3">
                    {movie.Poster !== "N/A" ? (
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full rounded-lg shadow-lg"
                        />
                    ) : (
                        <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
                            Poster Bulunamadı
                        </div>
                    )}
                </div>

                {/* Detaylar */}
                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <DetailItem label="Yıl" value={movie.Year} />
                        <DetailItem label="Yayın Tarihi" value={movie.Released} />
                        <DetailItem label="Süre" value={movie.Runtime} />
                        <DetailItem label="Tür" value={movie.Genre} />
                        <DetailItem label="Yönetmen" value={movie.Director} />
                        <DetailItem label="Senarist" value={movie.Writer} />
                        <DetailItem label="Oyuncular" value={movie.Actors} />
                        <DetailItem label="Dil" value={movie.Language} />
                        <DetailItem label="Ülke" value={movie.Country} />
                        <DetailItem label="IMDb Puanı" value={movie.imdbRating} />
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Konu</h2>
                        <p className="text-gray-700">{movie.Plot}</p>
                    </div>

                    {movie.Awards !== "N/A" && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Ödüller</h2>
                            <p className="text-gray-700">{movie.Awards}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const DetailItem = ({ label, value }) => {
    if (!value || value === "N/A") return null;

    return (
        <div className="pb-2">
            <span className="font-semibold">{label}: </span>
            <span className="text-gray-700">{value}</span>
        </div>
    )
} 