import Title from "antd/lib/typography/Title";
import { ActionButton, ActionButtonGroup } from "apprise-frontend";
import { givenChildren } from "apprise-frontend/utils";
import * as React from "react";


type Props = {

    title?: string;
    children?: any;
    height?:number;
}

export const PageHeader = ({ title, height, children }: Props) => {
   
    const { btns, other } = givenChildren(children).byTypes([["btns", ActionButton]]);
    
    const style = height ? {height} : {}

    return  <div className="page-topbar-header" style={style}>
              
                {title && <Title>{title}</Title>}
        
                {btns &&
                    <div className="action-group">
                        <ActionButtonGroup>{btns}</ActionButtonGroup>
                    </div>}
                {other}
            
            </div>;
    
};
