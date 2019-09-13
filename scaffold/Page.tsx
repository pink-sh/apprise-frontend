import { Layout } from "antd";
import { givenChildren } from "apprise-frontend/utils";
import * as React from "react";
import { Header } from "./Header";
import { ScaffoldContext } from "./Scaffold";
import { Sidebar } from "./Sidebar";
import { Sider } from "./Sider";
import { GlobalSlideout } from "./slideout";
import { Topbar } from "./Topbar";

export const Page = ({children}) => {


    const {sidebar,topbar, other} = givenChildren(children).byTypes([["sidebar",Sidebar],["topbar",Topbar]]);

    const scaffold = React.useContext(ScaffoldContext)


    return  <Layout >

                <Sider model={scaffold}  content={sidebar}/>

                <Layout>
                
                    <Header  {...scaffold} />

                    <GlobalSlideout /> 

                    <Layout.Content>

                    
                        <div className="page">
                            {topbar}
                            <div className="page-body" >
                                {other}
                            </div>
                        </div> 

                    </Layout.Content>

                </Layout>
                
            </Layout>


}

