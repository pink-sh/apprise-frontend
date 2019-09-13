import { Button, Icon, Tag } from "antd";
import { deepequals, ReportMethods, ValidationReport } from "apprise-frontend/utils";
import * as React from "react";
import { BasicListBox, BasicType } from "./BasicListBox";
import { Field, FieldProps } from "./Field";
import { TableListBox, TableType } from "./TableListBox";



export type ItemDetail<T> = {

    id?: (item:T) => any    

    makeNew: ()=>T

    validate: (item:T) => ValidationReport & ReportMethods
    
    edit: (state:ItemState<T>) => React.ReactElement
    
   
    
}

export type ItemStatus = "mod" | "new" | undefined

export type ListBoxProps<T> =  FieldProps & {

    layout? : 'horizontal' | 'vertical'
    standalone?: boolean
    height?: number

    type: BasicType<T> | TableType<T> | { name:"custom"}

    items: T[]
    original: T[]
    detail: ItemDetail<T>
    onChange: (data:T[]) => void
   
    children?: any

}

export type ItemState<T> = {
 
    currentItem: T
    initialItem: T
    
    saveItem: (item: T ) => void
}




export const ListBox = <T extends any> ( props: ListBoxProps<T> ) => {


    const { children, type, detail, onChange, items, layout="horizontal", standalone=false, height:heightprop, ...rest } = props;

    const height = heightprop || (standalone ? undefined : 250)

    const fieldRef = React.createRef<HTMLDivElement>()

    // tracks element under editing
    
    const state = useListBoxState(props);

    const {selected, selectNew} = state

    //  main content
    const box = (

        <div ref={fieldRef} className={`listbox ${layout} ${type.name}`} style={{maxHeight:height}} >

                
                <div className="bar">
                    <div className="controls">
                        { layout=== "vertical" ? 
                            <Button onClick={selectNew} type="primary">Add one<Icon theme="filled" type="plus-circle" /></Button>
                            :
                            <Button onClick={selectNew}><Icon theme="filled" type="plus-circle" /></Button>
                        }
                    </div>
                </div>

            

            <div className="items">{itemsFrom(props,state)}</div>

            { selected &&  detail.edit({
                                        saveItem:state.save,
                                        currentItem:state.current(),
                                        initialItem :state.initial() }) 
                    }

         </div>
    
        )

    // content in a field, or standalone
    return standalone? box : <Field {...rest}> {box}</Field>
}


export const itemsFrom = <T extends any>  (props:ListBoxProps<T>, state:ListBoxState) => {
    
    const {type,items,children} = props;
    
    if (!items || items.length===0)
        return <div className="empty">......</div> 

    switch (type.name) {

        case "basic": return <BasicListBox {...props} {...state} />
        case "table": return <TableListBox {...props} {...state} />

        default: return children
    
    }

}




// helpers

export const controlsFor = <T extends any> (item:T, state :ListBoxState) => {

        const { select,remove,status,detail :{validate} } = state

        const itemStatus = status(item);
        const report = validate(item)

        return  <div className="item-controls">                <div className="badges">
                    {report.errors() >0 && <Tag className="invalid">err!</Tag>}
                    {itemStatus && <Tag className={itemStatus}>{itemStatus}</Tag>}                
                </div>
                <Button onClick={() => select(item)}><Icon type="edit"/></Button>
                <Button onClick={() => remove(item) } ><Icon type="delete"/></Button>
         </div>



}


export const useListBoxState = <T extends any> (props:ListBoxProps<T>) =>{

    const { items, original, onChange, detail } = props

    const {id=(t:T) => t["id"],makeNew} = detail

    const [selected,setSelected] = React.useState<string | undefined>(undefined)

    const current = () => items.find(p=>id(p)===selected) || makeNew()
    const initial = () => original.find(p=>id(p)===selected) || current();

    const newmark = "__new__"
    const select = (selected:T) => setSelected(id(selected))
    const selectNew = () => setSelected(newmark)
    const firstEdit = selected === newmark
    
    const save = (saved: T )=>{    // undefined means abort

        // abort if new item hasn't been actually touched
        onChange( firstEdit ? [saved,...items] : items.map(item=>id(item)===selected? saved:item))
        setSelected(undefined)
    }

    const remove = (deleted:T) => onChange( items.filter( item=>id(item)!==id(deleted)))
    
    const isModified = (item:T) => original.some(o=> id(o)===id(item) && (!deepequals(o,item)))
    
    const isNew = (item:T) => original.find(o=>id(o)===id(item)) === undefined

    const status = (item:T) : ItemStatus => isNew(item) ? "new" : isModified(item) ? "mod" : undefined 


    return {  selected, current, initial, select, selectNew, detail, idOf:id, isModified, isNew, status, remove, save }
}

export type ListBoxState = ReturnType<typeof useListBoxState>
