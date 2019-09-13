import Title from "antd/lib/typography/Title";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ActionButton } from "./Action";


type Props = RouteComponentProps & {
    backTo?:string
}

export const NoSuchRoute =  withRouter ( ({history,backTo}:Props) => {


    return      <>

                    <div className="covering bullseye" style={{"flexDirection":"column"}}>
                        
                        <Title>There's absolutely nothing here.</Title>
                        <div  style={{"marginTop":"30px"}} >
                            {backTo ? <ActionButton size="large" name="Back" linkTo={backTo} /> : 
                                      <ActionButton size="large" name="Back" onClick={history.goBack} /> }
                            <ActionButton size="large" name="Home" linkTo="/" /> 
                        </div>
                        
                    </div>       

                </>

})