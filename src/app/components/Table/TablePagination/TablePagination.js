"use client"
import React, { useContext } from 'react'
import { TableContext } from '@/app/page'

const TablePagination = () => {
    const {
        currentPageNumber,
        setCurrentPageNumber,
        totalPages,
    } = useContext(TableContext)

    return (
        <div className="flex justify-center items-center gap-2 py-4">
            <button
                onClick={() => setCurrentPageNumber(prev => Math.max(prev - 1, 1))}
                disabled={currentPageNumber === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Previous
            </button>
            <span>Page {currentPageNumber} of {totalPages}</span>
            <button
                onClick={() => setCurrentPageNumber(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPageNumber === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    )
}

export default TablePagination
