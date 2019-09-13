
import { ConfigProvider } from "antd";
import 'antd/dist/antd.css';
import { BaseState, localeFrom } from "apprise-frontend";
import { NoSuchRoute } from "apprise-frontend/components";
import { givenBase } from "apprise-frontend/frontend";
import { connect } from "apprise-frontend/state";
import { childrenIn, givenChildren } from "apprise-frontend/utils";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ScaffoldModel } from "./model";
import { Section } from "./Section";
import './styles.scss';




type Props = BaseState & {

   title: string,
   icon: string
   children: any

}

// sidebar state must be handled here, as each page would has its own 'copy'.

export const ScaffoldContext = React.createContext<ScaffoldModel>(undefined!);

type SidebarState = {
    collapsed:boolean
    setCollapsed: (s:boolean)=>void
    active: string
    setActive: (s:string )=> void

}

export const SidebarContext = React.createContext<SidebarState>(undefined!);


export const Scaffold = connect ((props: Props ) => {


  const model = modelFrom(props)

  const locale = localeFrom(givenBase(props).intl.currentLanguage())

  const [collapsed,setCollapsed] = React.useState(true)
  const [active,setActive] = React.useState<string>(undefined!)


  return ( 
  
      <ScaffoldContext.Provider value={ model } >
      <SidebarContext.Provider value= {{collapsed,setCollapsed,active,setActive}} >

        <ConfigProvider locale={locale}>
          <Router>
            <Switch>

                {model.sections.map( (s,i) => 
                      
                        <Route exact={s.route.exact} path={s.route.path} key={i} component={s.content} />
                      
                  )}
                    
                <Route component={NoSuchRoute} />
                
            </Switch>
        </Router>
      </ConfigProvider>

          </SidebarContext.Provider>
    </ScaffoldContext.Provider>
  )

}, s=>s.language)


const modelFrom = (props:Props) : ScaffoldModel => {


  const sections = childrenIn(props).type(Section).toArray().map(s => {

    const {title, icon, path, exact=false, children} = s.props
    const [content] = givenChildren(children).toArray().map(c=>c.type);
 
    return { title,icon,route:{path,exact}, content}

  })
   
  return { ...props,  sections}

}