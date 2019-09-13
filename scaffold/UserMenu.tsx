import { Avatar, Dropdown, Icon, Menu } from "antd";
import { BaseState, givenBase, ScaffoldModel } from "apprise-frontend";
import { connect } from "apprise-frontend/state";
import * as React from "react";
import { userprofileSlideout } from "./UserProfile";

type Props =  BaseState &  ScaffoldModel


export const UserMenu = connect( ( props:Props) => {

  const [visible,setVisible] = React.useState(false)

  return <Dropdown visible={visible} onVisibleChange={setVisible} overlay={<Entries {...props} onClick={()=>setVisible(false)} />}>
              <Avatar icon='user' />
          </Dropdown>

}, state=> state.logged)


const Entries = (props:Props & { onClick:any }) => {

  const {users,slideout} = givenBase(props);
  const logged = users.logged
 

  return <Menu onClick={props.onClick}>
            <Menu.Item className="user-menu-item" onClick={()=>slideout.openWith(userprofileSlideout)}>
                <Icon type="user"/>
                <span>{logged === undefined ? null : logged.username}</span>  
            </Menu.Item>
            
            <Menu.Divider />

            <Menu.Item>an item</Menu.Item>
            <Menu.Item>another item</Menu.Item>

            <Menu.Divider />

            <Menu.Item className="settings-menu-item" onClick={()=>{}}>
                {/* onClick={()=>openSlideout(<SettingsSlideout/>)} */}
                <Icon type="setting"/>
                <span>Settings</span>
            </Menu.Item>

          </Menu>
}
