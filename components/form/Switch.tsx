import { Switch as AntSwitch } from 'antd';
import * as React from 'react';
import { Field, FieldProps } from './Field';
import { SwitchProps } from 'antd/lib/switch';

type Props = FieldProps & SwitchProps & {
    children: boolean
}

export const Switch = ({children,...rest}:Props) => 

    <Field className="switch" {...rest}>
        <AntSwitch {...rest} checked={children}></AntSwitch>
    </Field>
