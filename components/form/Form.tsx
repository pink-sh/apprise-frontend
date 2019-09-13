import { Anchor, Form as AntForm } from 'antd';
import { FormProps } from 'antd/lib/form';
import { givenChildren } from 'apprise-frontend';
import { Validation } from 'apprise-frontend/utils';
import * as React from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import { FormState } from 'apprise-frontend/state';

type Props = FormProps & {
    state: FormState<any>,
    children: any
    offsetTop?: number 
    toc?:boolean
    sidebar?:boolean
}

export const FormContext = React.createContext<FormState<any>>(undefined!)

export const Form = ({state, children, toc, offsetTop=90, sidebar=true, ...rest} : Props) => {

    const {links, other=[]} = givenChildren(children).byTypes([["links",Anchor.Link]]);

    const defaultAnchor =  links && links.length>0 && links[0].props.href;


    return (
      
     <FormContext.Provider value={state}>
        <div className="page-form">
            { toc && 
                <div className="form-toc">
                    <Anchor offsetTop={offsetTop} getCurrentAnchor={()=>defaultAnchor}>
                        {links}
                    </Anchor>  
                </div> 
            }
            
            <AntForm {...rest}>
                    
                {other.map((o,i)=> <div key={i}  className="form-row">

                        <div className="row-field">
                            {o}
                        </div>
                    
                    {sidebar &&
                            <div className="row-side">
                            { o.props.validation &&  <Paragraph>
                                {o.props.validation.help}
                                </Paragraph>}
                            </div> 
                    }
                        


                </div>)
                
                
                }
                </AntForm>    

            
        </div>
    </FormContext.Provider>
    )
}

type RowProps = {
    validation?: Validation
    children?: any
}
export const FormRow = ({children}:RowProps) => {

    return <div className="form-group" >
            {children}
          </div>
}