import { Select } from 'antd';
import { OptionProps, SelectProps } from 'antd/lib/select';
import * as React from 'react';
import { Field, FieldProps } from './Field';

type Props = FieldProps & SelectProps & {

    children:any
    showSearch?:boolean
}

export const SelectBox = (props : Props) => {

    const {children,className, value, mode,showSearch=true,filterOption=defaultFilterOption(children),
                     ...rest} = props
    
    const isMulti = mode==="multiple"

    return <Field className={className? `${className} selectbox`:"selectbox" }{...rest}>
                <Select  {...rest} value={value || undefined} //protects from nulls
                                    mode={mode} 
                                    showSearch={showSearch} 
                                    allowClear={!isMulti}
                                    showArrow={false}
                                    filterOption={filterOption}>

                    { unselected(children,value,isMulti) }

                </Select>
            </Field>;

}

const unselected = (options,selected,isMulti) => 

     options && options.filter( (o:any) => !selected || (isMulti ? !((selected as any).includes(o.props.children)) : selected!== o.props.children )) 


const defaultFilterOption = (children:any)=>(input: string, option: React.ReactElement<OptionProps>) =>

    (option.props.children! as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
