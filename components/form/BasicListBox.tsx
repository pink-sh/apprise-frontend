import { List } from "antd"
import * as React from "react"
import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { controlsFor, ListBoxProps, ListBoxState } from "./ListBox"
import arrayMove from "array-move"


export type BasicType<T> = {

    name: string

    render: (item:T) => React.ReactElement
}

export const BasicListBox =   <T extends any>   (props:ListBoxProps<T> & ListBoxState) => {

    const {items} = props

    const {render} = props.type as BasicType<T>


    const SortableItem = SortableElement( (item:T,index:number)  => 
    
        <div className="item" key={index}> 

            <div className="item-content">
                <div>{render(item)}</div>
            </div>

            {controlsFor(item,props)} 
        
        </div>
        
    )

    const SortableList = SortableContainer( ()=> <List dataSource={items} renderItem={(t:T,i:number) => <SortableItem {...t} index={i} /> } />) 
 
    return <SortableList helperClass="dragged" lockAxis="y" 
                         onSortEnd={ ({oldIndex, newIndex}) => props.onChange(arrayMove(items,oldIndex,newIndex)) } />

} 
