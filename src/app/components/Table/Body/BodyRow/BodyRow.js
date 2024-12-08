"use client"
import React, { useContext } from 'react'
import BodyRowCell from './BodyRowCell/BodyRowCell'
import { useRouter } from 'next/navigation'
import { TableContext } from '@/app/page'

const BodyRow = ({ item }) => {
    const router = useRouter()
    const { columns } = useContext(TableContext)

    const totalColumns = columns.length;
    const baseWidth = 100 / (totalColumns + 0.5); // 0.5 extra for the first column

    return (
        <tr 
            className="hover:bg-gray-100 cursor-pointer transition-colors flex w-full"
            onClick={() => router.push(`/movie/${item.imdbID}`)}
        >
            {columns.map((column, index) => (
                <BodyRowCell
                    key={index}
                    index={index}
                    item={item}
                    column={column}
                    style={{ width: `${index === 0 ? baseWidth * 1.5 : baseWidth}%` }}
                />
            ))}
        </tr>
    )
}

export default BodyRow
