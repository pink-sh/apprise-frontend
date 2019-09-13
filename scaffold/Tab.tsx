import { Badge, Icon, Tabs } from "antd";
import * as React from "react";


export type TabProps = {
    id:string
    name:string 
    icon: string   
    badge?: boolean
    default?: boolean
}


export const Tab = ({id,name, badge,icon}: TabProps ) =>  { 

  const tabname = <span><Icon type={icon}/>{name}</span>  
  const fullname = badge ? <Badge dot offset={[3,2]}>{tabname}</Badge> : tabname

  return <Tabs.TabPane key={id} tab={fullname} />
  
}
