import { Breadcrumb as AntBreadcrumb } from 'antd';
import { ScaffoldModel } from 'apprise-frontend';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';




type Props = RouteComponentProps & ScaffoldModel 

const toItems = (path:string,names:Object) => {
    

    return [{seg:'',path:'/'}].concat(
        path.split('/')
           .filter(seg=>seg)  // remove start/end spaces
           .map( (seg,i,self) => ({ seg, path: "/"+self.slice(0,i+1).join('/')  }) )
    )
    .map( ({seg,path}) => ({ name: names[path] || seg, path }))
         
}


 const $Breadcrumb = ({location,sections}:Props) => {


    // index by name
    const names = React.useMemo( ()=> sections.reduce((m,s) => {
        m[s.route.path] = s.title;
        return m;
    }, {}),[sections])

    const items = toItems(location.pathname,names);

    //console.log("rendering breadcrumb...")
   
    return  items.length === 1 ? null : 
    
       <AntBreadcrumb>
          
            { items.map( i =>
                <AntBreadcrumb.Item key={i.path}>
                    <Link to={i.path}>{i.name}</Link> 
                 </AntBreadcrumb.Item>
                )
            }
        </AntBreadcrumb>
        
}

export const Breadcrumb = React.memo($Breadcrumb, 
                                (prev,next) => prev.location.pathname === next.location.pathname);