import { Layout } from "antd";
import { Breadcrumb, ScaffoldModel, UserMenu } from "apprise-frontend";
import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";



export const Header = ( model:ScaffoldModel) => {

  return <Layout.Header className="header"> 
            <Route exact={false} path="/" render={ 
  
              (renderprops: RouteComponentProps ) => <Breadcrumb {...renderprops} {...model} /> } 
            
            />
            <UserMenu {...model} />
        </Layout.Header>



}
