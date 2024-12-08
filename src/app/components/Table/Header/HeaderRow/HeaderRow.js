import React from 'react'
import HeaderRowCell from './HeaderRowCell/HeaderRowCell'
import { useContext } from 'react'
import { TableContext } from '@/app/page'

const HeaderRow = () => {
    const { columns } = useContext(TableContext)
    console.log("columns from header row: ", columns)

    debugger

    const totalColumns = columns.length;
    const baseWidth = 100 / (totalColumns + 0.5); // 0.5 extra for the first column

    return (
        <tr className='flex rounded-t-2xl w-full'>
            {columns.map((column, index) => (
                <HeaderRowCell
                    key={index}
                    index={index}
                    column={column}
                    style={{ width: `${index === 0 ? baseWidth * 1.5 : baseWidth}%` }}
                />
            ))}
        </tr>
    )
}

export default HeaderRow
