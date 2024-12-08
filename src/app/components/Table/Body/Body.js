import React, { useContext } from 'react'
import BodyRow from './BodyRow/BodyRow'
import { TableContext } from '@/app/page'

const TableBody = () => {
    const { data, loading, errorMessage } = useContext(TableContext)
    return (
        <tbody className='block w-full h-[calc(100vh-8rem)] overflow-y-auto'>
            {!loading ? (
                errorMessage ? (
                    <tr><td colSpan="100%" className="text-center text-2xl py-4">{errorMessage}</td></tr>
                ) : data.length === 0 ? (
                    <tr><td colSpan="100%" className="text-center text-2xl py-4">Write something to the search bar to see the results.</td></tr>
                ) : (
                    <>
                        {data.map((item, index) => (
                            <BodyRow key={index} item={item} />
                        ))}
                        <tr className='h-20'></tr>
                    </>
                )
            ) : (
                <tr><td colSpan="100%" className="text-center text-2xl py-4">Loading...</td></tr>
            )}
        </tbody>
    )
}

export default TableBody
