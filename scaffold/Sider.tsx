import { Icon, Layout, Menu } from "antd";
import { Location } from "history";
import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { Logo } from "./Logo";
import { ScaffoldModel, SectionModel } from "./model";
import { SidebarContext } from "./Scaffold";
import './styles.scss';




type Props = RouteComponentProps & {

    model: ScaffoldModel
    content: React.ReactNode

}

export const Sider = withRouter( ( {location,content,model}:Props ) => {
  
  // why not local state? because this is rendered in-page, but we need to track collapsed and active status across pages.
  // so we place it in scaffold and pick it here in each page.
  const {collapsed,setCollapsed,active,setActive} = React.useContext(SidebarContext)

 return (
 

    <div className="sidebar">
     <Layout.Sider width={320} collapsible collapsed={collapsed} onCollapse={(status)=>setCollapsed(status)}  >     
      
       <Logo icon={model.icon} title={model.title}/>
       
        <div className="sidebar-content">
      
                 
        <div className="iconbar" >
          <Layout.Sider collapsed style={{overflow: 'auto',
                                    height: '100vh',
                                    position: 'fixed',
                                    left: 0}}>
            <Menu theme="dark" mode="inline" selectable={false} onClick={({key})=> {
                if (!active || active===key) setCollapsed(!collapsed);
                setActive(key);
            }}>
              
              { model.sections.map ((section,i) =>  

                  <Menu.Item key={i} > {
                    
                    isRouteActive(section,location)?

                      <div className="active">
                          <Icon type={section.icon} />
                          <span>{section.title}</span>
                      </div> :
                          
                      <NavLink replace={isRouteActive(section,location)} exact={section.route.exact} to={section.route.path} activeClassName="active">
                        <Icon type={section.icon} />
                        <span>{section.title}</span>
                      </NavLink>

                            }
                  </Menu.Item>  
              )}
            </Menu>
          </Layout.Sider>
        </div>

       {content}
     
      </div> 

    </Layout.Sider>
  </div>
 )

})

const isRouteActive = ({route:{path}}: SectionModel, {pathname}: Location<any>) =>  path !== "/" && pathname.startsWith(path)
 