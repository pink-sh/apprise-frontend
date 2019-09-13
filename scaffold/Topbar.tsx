import { Affix, Tabs } from "antd";
import { ActionButton, ActionButtonGroup, childrenIn, Tab } from "apprise-frontend";
import { givenChildren } from "apprise-frontend/utils";
import { paramsIn } from "apprise-frontend/utils/routes";
import * as React from "react";
import { withRouter } from "react-router";
import { PageHeader } from "./PageHeader";



export const $Topbar = props => {

    const {header,btns,tabs,other} = childrenIn(props).byTypes([["header",PageHeader],["btns",ActionButton],["tabs",Tab]])
    const defaultTabProps = tabs && givenChildren(tabs).with(props=>props.default).mapProp("id")

    const defaultKey = defaultTabProps && defaultTabProps[0]

    const { history, match:{ url }} = props
    const {tab} = paramsIn(props) 

    return      <div className="page-topbar">

                    {header && header}
                    
                    <Affix>
                        <div className="page-topbar-tabs">

                            {tabs && 
                                <Tabs className="tabs" activeKey={tab || defaultKey} onChange={key=>history.push(`${url}?tab=${key}`)}>
                                {/* hack:renders our element to unwrap the antd ones which Tabs expects. */}
                                {tabs.map(t=>t.type(t.props))}  
                                </Tabs>
                            }

                            {other}

                            {btns &&
                                <div className="action-group">
                                    <ActionButtonGroup>{btns}</ActionButtonGroup>
                                </div>
                            }
                        </div>
                    </Affix>

                </div>

}

export const Topbar = withRouter($Topbar)



