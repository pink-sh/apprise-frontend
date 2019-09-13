
import { Button, Dropdown, Icon, Menu, Badge } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { childrenIn } from "apprise-frontend/utils/children";



export type PageAction = {

  name?: string
  icon?: string | JSX.Element
  type?: "primary" | "danger"
  enabled?:boolean
  disabled?:boolean
  size?: "small" | "large"
  onClick?: (...any) => any
  linkTo?: string
  badge?:boolean

  children? : any

}

//  an iconized button that tri"clicks to" a function or a route.
//  a primary marker allows styles to distinguish it from other action triggers, in a way that depends on context.
//  (eg. in the sidebar through spacing, in the topbar through colouring).

export const ActionButton = (action:PageAction) => {

  const {name,children,type,size,badge,enabled=true,disabled,icon,onClick,linkTo} = action;

  const iconchoice = icon && typeof icon === 'string' ? <Icon type={icon} /> : icon 

  const content =  <Button style={{"margin":"0 5px"}} type={type} size={size} disabled={disabled || !enabled} onClick={onClick}>
                      { children || 
                               <>
                               { name }&nbsp;
                               { badge ? <Badge style={{fontSize:10}} offset={[3,-3]} dot>{iconchoice}</Badge> : iconchoice}
                                </> 
                      }
                  </Button>
       
  return linkTo ? <Link to={linkTo}>{content}</Link> : content
    
  
}

export const ActionButtons = (props:{children:any}) => {

  const actions  = childrenIn(props).type(ActionButton).mapProps() as PageAction[]

  if (!actions || actions.length===0)  return null

  const Item = ({name,icon,onClick}:PageAction) =>
  <div className="action-menu-item"  onClick={onClick}>
      <span className="item-name">{name}</span>
      {typeof icon === 'string' ? <Icon type={icon} /> : icon } 
  </div>
  
  const disabled = actions.filter(a=>!a.disabled).length === 0;
  const small = actions.filter(a=>a.size==="small").length>0

  const menu = <Menu> {
            actions.map((a, key)=>  <Menu.Item key={key} disabled={a.disabled || !a.enabled}> {
                                         a.linkTo ?  <Link to={a.linkTo}><Item {...a}/></Link> : <Item {...a}/>
                                    }</Menu.Item>
              )}
              </Menu>

  return <Dropdown  disabled={disabled} overlay={menu}>
            <Button icon="down" size={small? "small":undefined} />
        </Dropdown>

}


export const ActionButtonGroup = (props:{children:any}) => {

  const {primary, other}= childrenIn(props).byProps([["primary",props => props.type=== "primary" ]]);

  return <div className="action-group">
              {primary && primary[0] }
              <ActionButtons>{other}</ActionButtons>
        </div>

}




