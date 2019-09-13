import * as React from 'react'
import Search from 'antd/lib/input/Search';

type Props = {
    value: string,
    onChange: (v:string)=>void
}


export const SearchField = ({value, onChange}:Props) => {

    const handleChange = e => {
        return onChange(e.target.value)
    }

    return <Search
    value={value}
    onChange={handleChange}
    placeholder="input search text"
    style={{ width: 200 }}
  />
}