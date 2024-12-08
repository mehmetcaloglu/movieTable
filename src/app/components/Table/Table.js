"use client"
import React from 'react'

import TableHeader from './Header/Header'
import TableSearchBar from './SearchBar/SearchBar'
import TableFilterModal from './FilterModal/FilterModal'
import TableBody from './Body/Body'
import TablePagination from './TablePagination/TablePagination'

const Table = () => {


    return (
        <div className='flex flex-col h-screen  sm:px-10 w-[100vw] max-w-[1500px] '>
            <TableSearchBar />
            <div className='flex-grow overflow-x-auto overflow-y-hidden'>
                <div className='min-w-[1300px] w-full  mx-auto'>
                    <table className='w-full rounded-t-2xl overflow-x-auto'>
                        <TableHeader />
                        <TableBody />
                    </table>
                </div>
            </div>
            <TablePagination
                className="h-16"
            />
        </div>
    )
}

export default Table
