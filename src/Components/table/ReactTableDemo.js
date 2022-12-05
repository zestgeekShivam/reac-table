import React, { useMemo } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Select,
    Tooltip,
    Box,
    Heading
} from '@chakra-ui/react'
import { data1 } from '../../Data/data'
import { columns1 } from '../../Data/Columns'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'
import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'


const ReactTableDemo = () => {
    const [error, setError] = React.useState(false)
    const data = useMemo(() => data1, [])
    const columns = useMemo(() => columns1, [])

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const { globalFilter, pageIndex, pageSize } = state

    return (
        <TableContainer  >
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <Table {...getTableProps()} variant='striped' colorScheme='gray'  >
                <Thead>
                    {headerGroups.map(headerGroup => (
                        <Tr {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map(column => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                    {column.render("Header")}
                                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ''}
                                    <div> {column.canFilter ? column.render("Filter") : null} </div>
                                    {console.log(column)}
                                </Th>
                            ))}
                        </Tr>
                    ))}

                </Thead>
                {page.length < 1 ? <Heading> No data found in table </Heading> : <Tbody {...getTableBodyProps} >
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <Td {...cell.getCellProps()} >
                                            {cell.render("Cell")}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}

                </Tbody>}
            </Table>
            <Select width={'40'} value={pageSize} onChange={e => setPageSize(Number(e.target.value))} >
                {[10, 25, 50].map(pageNumber => (
                    <option key={pageNumber} value={pageNumber}> Show Rows {pageNumber} </option>
                ))}
            </Select>
            <Box display={'flex'} justifyContent='center' alignItems={'center'} >
                <Box width={'68vh'} display={'flex'} justifyContent={'space-around'}   >
                    <span> Page: <strong>  {pageIndex + 1} of {pageOptions.length} </strong></span>
                    <span>
                        <Tooltip label={!canPreviousPage ? "Can't Go Previous" : 'Goto First Page'}>
                            <Button border={'1px '} borderColor='black' isDisabled={!canPreviousPage} onClick={() => gotoPage(0)} size='sm'>
                                {'<<'}
                            </Button>
                        </Tooltip>
                    </span>
                    <Tooltip label={!canPreviousPage ? "Can't Go Previous" : 'Goto Previous Page'} >
                        <Button border={'1px '} borderColor='black' isDisabled={!canPreviousPage} onClick={() => previousPage()} size='sm'>
                            {'<'}
                        </Button>
                    </Tooltip>
                    {[1, 2, 3, 4, 5, 6, 7,].map((elem, i) => {
                        return <Button key={i} isDisabled={elem == 1 && !canPreviousPage} size={'sm'} border={'1px '} borderColor='black' onClick={() => gotoPage(Number(elem - 1))} > {elem} </Button>
                    })}
                    <Tooltip label={!canNextPage ? "Can't Go Next" : 'Goto Last Page'} >
                        <Button border={'1px '} borderColor='black' isDisabled={!canNextPage} onClick={() => nextPage()} size='sm'>
                            {'>'}
                        </Button>
                    </Tooltip>
                    <span>
                        <Tooltip label={!canNextPage ? "Can't Go Next" : 'Goto Last Page'} >
                            <Button border={'1px '} borderColor='black' isDisabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)} size='sm'>
                                {'>>'}
                            </Button>
                        </Tooltip>
                    </span>
                </Box>
            </Box>
        </TableContainer >
    )
}

export default ReactTableDemo