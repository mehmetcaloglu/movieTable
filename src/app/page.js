"use client"
import Table from "./components/Table/Table";
import { useState, useEffect, useCallback, useRef, createContext } from 'react'
import { fetchData, fetchMovieDetails } from '@/app/util/api'

export const TableContext = createContext()
export default function TablePage() {
    const [searchKeyword, setSearchKeyword] = useState('Pokemon')
    const [data, setData] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const timeoutRef = useRef(null)
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortedColumn, setSortedColumn] = useState(null)
    const [type, setType] = useState('')
    const [year, setYear] = useState('')

    const immediateSearch = useCallback((keyword) => {
        setLoading(true);
        fetchData({
            keyword,
            page: currentPageNumber,
            type: type || null,
            year: year || null
        }).then(data => {
            if (data) {
                setErrorMessage(null);
                setData(data.data);
                setTotalPages(data.page.totalPages);
            } else {
                setData([]);
                setTotalPages(0);
                setErrorMessage("No movies found. Please try different search terms.");
            }
            setLoading(false);
        }).catch(error => {
            setErrorMessage("An error occurred while fetching data.");
            setLoading(false);
        });
    }, [currentPageNumber, type, year]);

    const debouncedSearch = useCallback(
        (keyword) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                immediateSearch(keyword);
            }, 600);
        },
        [immediateSearch]
    );

    useEffect(() => {
        immediateSearch(searchKeyword);
    }, []);

    useEffect(() => {
        if (searchKeyword !== "") {
            immediateSearch(searchKeyword);
        }
    }, [currentPageNumber, type, year, immediateSearch]);

    var columns = [
        {
            "header": "Movie Title",
            "accessorFn": (item) => item.Title,
            "type": "string"
        },
        {
            "header": "Year",
            "accessorFn": (item) => item.Year,
            "type": "string"
        },
        {
            "header": "Type",
            "accessorFn": (item) => item.Type,
            "type": "string"
        },
        {
            "header": "IMDB ID",
            "accessorFn": (item) => item.imdbID,
            "type": "string"
        },
        {
            "header": "Poster",
            "accessorFn": (item) => item.Poster,
            "type": "image"
        }
    ]

    const sortFunction = (value) => {
        console.log("sortFunction: ", value);
        const column = columns.find(column => column.header === value);

        let newSortOrder = 'asc';
        if (sortedColumn === value) {
            // Aynı sütuna tıklandığında sıralama yönünü değiştir
            newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }

        const sortedData = [...data].sort((a, b) => {
            const valueA = column.accessorFn(a);
            const valueB = column.accessorFn(b);

            if (column.type === "string") {
                return newSortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            } else if (column.type === "date") {
                const dateA = new Date(valueA);
                const dateB = new Date(valueB);
                return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }

        });

        setData(sortedData);
        setSortedColumn(value);
        setSortOrder(newSortOrder);
    };

    return (
        <TableContext.Provider
            value={{
                searchKeyword,
                setSearchKeyword,
                data,
                setData,
                errorMessage,
                setErrorMessage,
                currentPageNumber,
                setCurrentPageNumber,
                totalPages,
                setTotalPages,
                loading,
                setLoading,
                sortFunction,
                columns,
                sortOrder,
                sortedColumn,
                type,
                setType,
                year,
                setYear
            }}>
            <div className="relative h-screen">
                <Table />
            </div>
        </TableContext.Provider>
    );
}
