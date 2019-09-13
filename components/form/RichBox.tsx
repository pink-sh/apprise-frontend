import { success, Validation } from 'apprise-frontend/utils';
import * as React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import { Field, FieldProps } from './Field';
import { FormContext } from './Form';


type Props = FieldProps & {
    children: string | undefined
    onChange: (value:any) => void
}

export const RichBox = (props:Props) => {

    const state = React.useContext(FormContext)

    const prepared = state.prepareProps(props)

    const {children, onChange, validation=success(), ...rest} = prepared

    const validationCssClass = validField(validation) ? undefined : "quill-invalid"

    const value = children || ''    // empty string required to avoid a kinda of loop in Quill
   
    const valueprops = state && state.onReset ?  {value} : {defaultValue:value} 
    
    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['link'],
          ['clean']
        ],
    }
   
    return (
        <Field validation={validation} {...rest}>
            <ReactQuill 
                {...valueprops}
                className={validationCssClass === undefined ? "quill-in" : validationCssClass}
                modules={modules}
                onChange={ (content, delta, source, editor) =>  onChange( editor.getText().trim().length===0  ? undefined : content)} 
                />
        </Field>
    )
}

const validField = (v:Validation) => {
    switch (v.status) {
        case "error": return false
        case "warning": return false
        default: return true
    }
}