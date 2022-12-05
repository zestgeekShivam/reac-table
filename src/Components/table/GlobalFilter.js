import React from 'react';
import { Input } from '@chakra-ui/react';
import { useAsyncDebounce } from 'react-table'

const GlobalFilter = ({ filter, setFilter }) => {

    const [value, setValue] = React.useState(filter)

    const onchange = useAsyncDebounce((value) => {
        setFilter(value || undefined)
    }, 500)

    return (
        <div>
            <span> Search : <Input size={'sm'} marginTop='3' value={value || ''} onChange={e => {
                setValue(e.target.value)
                onchange(e.target.value)
            }} htmlSize={30} width='auto' />  </span>
        </div>
    )
}

export default GlobalFilter