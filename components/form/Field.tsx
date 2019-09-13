import { Form } from "antd";
import { FormItemProps } from "antd/lib/form/FormItem";
import Paragraph from "antd/lib/typography/Paragraph";
import { success, Validation } from "apprise-frontend/utils/validation";
import * as React from "react";
import "./styles.scss";




export type FieldProps =  FormItemProps & {
  
  
    validation?: Validation
}

export type Props = FieldProps & {
    children: any
}

export const Field = ( props  :Props) =>  {

    const {validation=success(), children, ...rest}  = props;

   return <Form.Item help={
             <Paragraph type={typeFor(validation)} ellipsis={{ rows: 1 }}>{validation.msg}</Paragraph>}
                                                   colon={false} validateStatus={validation.status} {...rest}  >
            {children}
    </Form.Item>

    }

const typeFor = (v:Validation) => {

    switch(v.status) {
        case "error": return "danger"
        case "warning": return "warning"
        default: return
    }

}