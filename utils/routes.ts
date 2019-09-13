import { parse } from "query-string";
import { RouteComponentProps } from "react-router";


export const paramsIn = (props:RouteComponentProps) => {

    const {location: {search}} = props
    let params = parse(search) 
    for (var p in params)
        if (params[p] && params[p]!.length === 1)
            params[p] = params[p]![0]
    
    return params

}


export const parentPathIn = (props:RouteComponentProps) => {

    const {location:{pathname}} = props
    return pathname.substring(0,pathname.lastIndexOf("/"))

}