"use client"
import React, { useContext } from 'react'
import { TableContext } from '@/app/page'

const TableSearchBar = () => {
  const { 
    searchKeyword, 
    setSearchKeyword, 
    type, 
    setType,
    year,
    setYear
  } = useContext(TableContext)

  return (
    <div className="h-16 flex items-center gap-4 my-4">
      {/* Search Input */}
      <div className="relative w-full max-w-[300px]">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full p-3 pl-10 rounded-full border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-md"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <img src="/icons/searchicon.svg" alt="search" className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      </div>

      {/* Type Filter */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>

      {/* Year Filter */}
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
        min="1900"
        max={new Date().getFullYear()}
      />
    </div>
  )
}

export default TableSearchBar
