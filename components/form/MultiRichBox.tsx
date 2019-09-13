import * as React from 'react'
import { FieldProps, FormContext, MultilangDto, givenBase, Validation, success, all } from 'apprise-frontend'
import { allLanguages, defaultLanguage, fullnameOf, Language } from 'apprise-frontend/intl';
import { Field } from './Field'
import { BaseState, connect } from 'apprise-frontend/state';
import ReactQuill from 'react-quill';
import { Input, Col, Button, Icon, Dropdown, Menu } from 'antd';

import '../styles.scss'

type Props = FieldProps & {
    children: MultilangDto
    onChange: (value:any) => void
    languages?:  Language[]
    required?: Language[]
    placeholder?:string
} & BaseState

const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ],
}

export const $MultiRichBox = (props : Props) => {

    const state = React.useContext(FormContext)
    const prepared = state.prepareProps(props)

    const {children, onChange, validation=success(), ...rest} = prepared

    const {languages,required} = requiredFrom(prepared);
  
    const [choices,setChoices] = React.useState<Language[]>(()=>initialChoicesFrom(prepared,required))

    const other = languages.filter(l=>!choices.includes(l))

    const validationCssClass = validField(validation) ? undefined : "quill-invalid"
    const valuesprops = {} 
    choices.forEach(l=> valuesprops[l]=state && state.onReset ?  { value:children[l]||'' } : {defaultValue:children[l]||''})
    
    const menu = <Menu onClick={c=>setChoices([...choices,c.key as Language])}>{ other.map(l=>
        <Menu.Item className="language-choice-item" key={l}>
            <Icon type="flag" /> {l}
        </Menu.Item>
    )} </Menu>

    const langPrefix = (l:Language) => <Col className="textbox-addonbefore-container" xs={1}><span className="textbox-addonbefore">{l}</span></Col>
    return (<>
        <Field {...rest} className={ other.length>0 ? "multibox with-language-choice":"multibox"} validation={validation}>
            {choices.map( (l,i) => 
                <Input.Group key={i} className="rte">
                    {langPrefix(l)}
                    <Col style={{width: "100%"}}>
                        <ReactQuill 
                            {...valuesprops[l]}
                            className={validationCssClass === undefined ? "quill-in" : validationCssClass}
                            modules={modules}
                            onChange={ (content, delta, source, editor) =>  { 
                                all(
                                    children[l] = editor.getText().trim().length===0  ? undefined : content,
                                    onChange(children[l])
                                )
                            } }
                        ></ReactQuill>
                        {required.includes(l) ? '' :
                        <span className="ant-input-suffix textbox-suffix-container">
                            <Button className="textbox-suffix-button" size="small" onClick={()=>all(children[l]=undefined, setChoices(choices.filter(lang => lang!==l)) ,onChange({...children}))}>
                                <Icon style={{color:"#9e9e9e"}} type="minus-circle"/>
                            </Button>
                        </span>
                        }
                    </Col>
                </Input.Group>
            )}
            <div className="language-choice" >
                        
                { other.length===0 ? null: 
                        
                    other.length===1 ? 
                        <Button   size="small" onClick={_=> setChoices([...choices,other[0]])} >
                            Add {fullnameOf(other[0])}
                        </Button>
                    :
                        <Dropdown.Button
                            size="small" icon={<Icon type="down" />}
                            placement="bottomRight"  
                            overlay={menu} >Add language</Dropdown.Button>
                }
            </div>
        </Field>
    </>)
}

const requiredFrom = (props:Props) => {

    const {languages:configLanguages=allLanguages ,required:requiredLanguages=[]} = givenBase(props).config.get().intl;

    const {languages=configLanguages,required=requiredLanguages} = props; 

    return {languages,required};

}
const initialChoicesFrom = (props:Props, required:Language[]) => {

    const {languages} = givenBase(props).config.get().intl;
    const {children=[]} = props

    const defined = (languages as Language[]).filter(l=> required.includes(l) || children[l] ) 

    const choices = defined.length>0 ? defined: [defaultLanguage]

    return choices;

}

const validField = (v:Validation) => {
    switch (v.status) {
        case "error": return false
        case "warning": return false
        default: return true
    }
}

export const MultiRichBox = connect( $MultiRichBox )
