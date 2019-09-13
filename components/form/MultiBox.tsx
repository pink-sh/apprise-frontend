import { Button, Col, Dropdown, Icon, Input, Menu } from 'antd';
import { AutoSizeType } from 'antd/lib/input/TextArea';
import { givenBase } from 'apprise-frontend/frontend';
import { allLanguages, defaultLanguage, fullnameOf, Language } from 'apprise-frontend/intl';
import { BaseState, connect } from 'apprise-frontend/state';
import { all } from 'apprise-frontend/utils';
import * as React from 'react';
import { Field, FieldProps } from './Field';
import { FormContext } from './Form';
import { MultilangDto } from './multilang';

type Props = BaseState & FieldProps & {
    placeholder?:string
    onChange: (t:any) => void
    required?: Language[]
    languages?:  Language[]
    children: MultilangDto 
    autosize?: boolean | AutoSizeType | undefined
}



const $MultiBox =  (props:Props) => {

    const state = React.useContext(FormContext)

    const prepared = state.prepareProps(props)

    const {children={},onChange,hasFeedback=false,validation, placeholder, autosize, ...rest} = prepared;

    const {languages,required} = requiredFrom(props);
  
    const [choices,setChoices] = React.useState<Language[]>(()=>initialChoicesFrom(props,required))
   
    
    const other = languages.filter(l=>!choices.includes(l))


    const menu = <Menu onClick={c=>setChoices([...choices,c.key as Language])}>{ other.map(l=>
        <Menu.Item className="language-choice-item" key={l}>
            <Icon type="flag" /> {l}
        </Menu.Item>
    )} </Menu>

    const langPrefix = (l:Language) => <Col className="textbox-addonbefore-container" xs={1}><span className="textbox-addonbefore">{l}</span></Col>
    

    const textArea = (l:Language, showRemove:boolean=false) => {

        const textAreaProps = { key:l, autosize, 
                        className:"textbox-no-border-radius", 
                        placeholder:`Type a value in ${fullnameOf(l)}`,
                        onChange:e=> all(children[l]=e.target.value, onChange({...children}))
        } as any


        const valueprops = state && state.onReset ?  {value:children[l] } : {defaultValue:children[l]} 
  
        return (
            <Col style={{width: "100%"}}>
                <Input.TextArea {...textAreaProps} {...valueprops} />
                {showRemove &&
                    <span className="ant-input-suffix textbox-suffix-container">
                        <Button className="textbox-suffix-button" size="small" onClick={()=>all(children[l]=undefined, setChoices(choices.filter(lang => lang!==l)) ,onChange({...children}))}>
                            <Icon style={{color:"#9e9e9e"}} type="minus-circle"/>
                        </Button>
                    </span>
                }
            </Col>
        )
    }


    const inputField = (l:Language) => {

        const inputProps = { key:l , 
                             addonBefore: l , 
                             suffix: required.includes(l) ? null :
                                                    
                                <Button size="small" onClick={()=>all(children[l]=undefined, setChoices(choices.filter(lang => lang!==l)) ,
                                    onChange({...children}))}>
                                    <Icon type="minus-circle"/>
                                </Button>
                            ,
                        
                            placeholder:`Type a value in ${fullnameOf(l)}`,
                        
                            onChange:e=> all(children[l]=e.target.value, onChange({...children}))
                        
        }
                            

       const valueprops = state && state.onReset ?  {value:children[l] } : {defaultValue:children[l]} 

        return <Input {...inputProps} {...valueprops} />
    }

    return      <div>
                <Field className={ other.length>0 ? "multibox with-language-choice":"multibox"} hasFeedback={hasFeedback} validation={validation} {...rest} >
                    {choices.map( l =>
                       
                       autosize ? 
                            <Input.Group key={l} className="textarea" compact={true}>
                                {langPrefix(l)}
                                {required.includes(l) ? 
                                    textArea(l)
                                    :
                                    textArea(l, true)
                                }
                            </Input.Group>
                        :
                        inputField(l)
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
                </div>      

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



export const MultiBox = connect( $MultiBox)

