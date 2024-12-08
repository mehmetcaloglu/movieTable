"use client"
import React from 'react'

const BodyRowCell = ({ item, column, style, index }) => {
    const value = column.accessorFn(item)

    if (column.type === "image") {
        return (
            <td className="p-2 flex items-center justify-center" style={style}>
                {value !== "N/A" ? (
                    <img
                        src={value}
                        alt="poster"
                        className="w-16 h-24 object-cover rounded"
                    />
                ) : (
                    <div className="w-16 h-24 bg-gray-200 rounded flex items-center justify-center">
                        No Image
                    </div>
                )}
            </td>
        )
    }

    return (
        <td className={`p-2 flex items-center ${index === 0 ? '' : 'justify-center'}`} style={style}>
            <span className="truncate">{value}</span>
        </td>
    )
}

export default BodyRowCell
