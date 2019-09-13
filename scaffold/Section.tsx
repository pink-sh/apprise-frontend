import * as React from "react"


type Props = {

    title:string,
    icon: string,
    path: string,
    exact?:boolean
    children?:any
}

export const Section = (props:Props) => {

    
    return <div>{props.children}</div>;

}