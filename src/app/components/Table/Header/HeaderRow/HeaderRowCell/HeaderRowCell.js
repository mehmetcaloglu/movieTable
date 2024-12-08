"use client"
import React, { useContext } from 'react'
import { TableContext } from '@/app/page'
import { FaSortUp, FaSortDown } from 'react-icons/fa'


const HeaderRowCell = ({ value, index, style, column }) => {
    const { sortFunction, sortOrder, sortedColumn } = useContext(TableContext)


    const renderSortIcon = () => {
        if (column.header === sortedColumn) {
            return sortOrder === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />
        }
        return null
    }
    return (
        <th
            className={`h-[40px] p-1 bg-[#aab7d2] flex items-center justify-center hover:cursor-pointer`}
            onClick={() => sortFunction(column.header)}
            style={style}
        >
            <p className="truncate text-center text-white">
                {column.header}
            </p>
            <div className='relative right-0 bottom-0'>
                {renderSortIcon()}
            </div>
        </th>
    )
}

export default HeaderRowCell
