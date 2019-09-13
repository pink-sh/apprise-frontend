import { Input } from "antd";
import { AutoSizeType } from "antd/lib/input/TextArea";
import * as React from "react";
import { Field, FieldProps } from "./Field";
import { FormContext } from "./Form";


type Props = FieldProps & {
    placeholder?:string
    onChange: (value:any) => void
    children: string | undefined 
    autosize?: boolean | AutoSizeType | undefined
    hidden?: boolean
}


export const TextBox = (props:Props) => {

    const state = React.useContext(FormContext)

    const prepared = state.prepareProps(props)

    const {children,hidden,autosize,placeholder,onChange, ...rest} = prepared

    const  controlprops : any = {autosize,placeholder, onChange: (e:any) => onChange(e.target.value) };

    const valueProps = state.onReset ? {value:children} : {defaultValue:children}

    return  <Field className="textbox" {...rest}  >{

        hidden ? 

            <Input.Password {...controlprops} {...valueProps} />
        :
  
        autosize ?

            <Input.TextArea {...controlprops} {...valueProps}  />
        :        
            <Input {...controlprops} {...valueProps}  />

   }
    </Field>
}