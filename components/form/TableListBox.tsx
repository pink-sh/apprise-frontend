import { Table } from "antd"
import * as React from "react"
import { controlsFor, ListBoxProps, ListBoxState } from "./ListBox"


export type TableType<T> = {

    name: string

    columns : {

            key:string, 
            title?: string, 
            sort?: false | ( (a:T,b:T) => boolean )

    }[]
}

export const TableListBox = <T extends any> (props:ListBoxProps<T> & ListBoxState) => {

    
    const {items, type, idOf} = props
    const {columns} = type as TableType<T>
 

    const cols = columns.map( c=> { 

        const sort = c.sort===false || (c.sort instanceof Function ? c.sort : (a:T,b:T)=> a[c.key].localeCompare(b[c.key]) )

        return <Table.Column key={c.key} dataIndex={c.key} title={c.title || c.key } sorter={sort} />
        
    });


    const actioncol =   <Table.Column className="table-controls-column" key="actions"  render={ (_, t:T) => 

       <div className="flex-controls"> {controlsFor(t,props)} </div>
        
    } />
    
    return   <Table dataSource={items} pagination={false} rowKey={idOf}>
                
                {   [...cols, actioncol] }
               
            </Table>
        
    
        
    

}