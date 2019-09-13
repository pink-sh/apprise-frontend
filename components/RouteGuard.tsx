import * as React from "react"
import { Prompt, withRouter, RouteComponentProps, Redirect } from "react-router";
import { askConsent } from "apprise-frontend/utils";

type Props = RouteComponentProps & {
    when:boolean
}

export const RouteGuard =  withRouter ( ({when,match:{url}}:Props)  =>{

    const [path,set] = React.useState<string>(undefined!)

    return path ? <Redirect to={path} /> : <Prompt when={when} message={ location => {

        if (location.pathname===url )
            return true;

        askConsent({
            title:`Leave and discard all unsaved changes.`, 
            message: `This is irriversible: are you sure you want to leave and discard all unsaved changes?`, 
            okText: `Yes, leave and discard all unsaved changes.`,
            width: 600,
            onOk: ()=> set(location.pathname) })
            
        return false }} />

})