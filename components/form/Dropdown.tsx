import { Dropdown as AntDropDown, Icon, Menu } from 'antd';
import { Button } from 'antd/lib/radio';
import * as React from 'react';
import { Field, FieldProps } from './Field';


export type Item = {  key: any,  label: string }

type Props = FieldProps & {

    placeholder?: string,
    placement?: "bottomRight" | "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | undefined
    items: Item[],
    icon?: string,
    onChange: (value:any) => void
    children:any

}

export const Dropdown = (props : Props) => {

    const {placement="bottomRight", placeholder="Select one...", children, items, icon="down", onChange, ...rest} = props
    
    const valueIn = (id) => {
        // eslint-disable-next-line
        const match = items.find(item =>item.key==id); 
        return (match && match.label) || undefined
    }
    
    const entries =    <Menu > {items.map( (item) => 
                             <Menu.Item key={item.key} onClick={e=>onChange(e.key)} >{item.label}</Menu.Item>)}
                        </Menu>
    

    return (
        <Field {...rest}>
            <AntDropDown placement={placement} overlay={entries}>
                <Button>
                    {valueIn(children) || placeholder} <Icon type={icon} />
                </Button>
            </AntDropDown>
        </Field>
    )

}