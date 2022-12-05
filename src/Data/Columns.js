import { format } from "date-fns"

export const columns1 = [
    {
        Header: ' First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        accessor: 'last_name',
        disableFilters: true
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
        Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyy') }
    },
    {
        Header: 'Age',
        accessor: 'age'
    },
    {
        Header: 'Country',
        accessor: 'country'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },
]
