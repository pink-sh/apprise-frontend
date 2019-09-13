import * as React from 'react';
import Select from "react-select";
import { Field, FieldProps } from './Field';


type Props = FieldProps & {

   mode?: "multiple" | "default" | undefined
   children:any
   placeholder?:string
   onChange: (values:any[]) => void
   options: any[]
}



export const VSelectBox = (props : Props) => {

    const {mode,children,onChange,options,className,placeholder,...rest} = props

    const isMulti = mode === 'multiple'

    const classNames = isMulti? "vselectbox vselectbox-multi" : "vselectbox vselectbox-single"

    return <Field className={className? `${className} ${classNames}`:`${classNames}` }{...rest}>
      
            <Select className="vselect" classNamePrefix="vselect" isMulti={isMulti} isClearable={!isMulti}
                        value={ children && ( isMulti? children.filter(o=>o).map(optionOf) : optionOf(children))  }
                        placeholder={placeholder}
                        hideSelectedOptions
                        onChange={ (all: any) => onChange( all && ( isMulti?  all.map( e=>e.value) : all.value )) }        // don't expose react-select inputs to app, for now. 
                        options={options && options.map(optionOf)}
                />

        </Field>;

}

const optionOf = (o:any) => o && ( o instanceof Object ? o : {label:o,value:o} )
