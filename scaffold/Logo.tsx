import * as React from 'react'


import { Icon } from 'antd';

type LogoProps = {
    title: string,
    icon: string|JSX.Element
}

export const Logo = ({title, icon}:LogoProps) => (
    <div className="logo">
        {typeof icon === 'string' ? <Icon type={icon}/> : icon}
        <div className="title">{title}</div>
    </div>

)