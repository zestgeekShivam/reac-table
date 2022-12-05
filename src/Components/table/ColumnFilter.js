import React from 'react'
import { Input } from '@chakra-ui/react'

const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
        <div>
            <span>  <Input value={filterValue || ''} onChange={e => setFilter(e.target.value)} htmlSize={10} width='auto' size={'xs'} />  </span>
        </div>
    )
}

export default ColumnFilter