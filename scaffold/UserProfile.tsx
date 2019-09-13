import { Avatar } from "antd";
import { ActionButton } from "apprise-frontend/components";
import { givenBase } from "apprise-frontend/frontend";
import { BaseState, connect } from "apprise-frontend/state";
import { LoggedUser } from "apprise-frontend/user";
import * as React from "react";




type Props = {

    logged:LoggedUser
}

export const UserProfile = connect ( (state: BaseState) => {

    return <UserBadge {...state} />
    
    //  to be continued...

});


export const userprofileSlideout = {
    title:"User Profile",
    content: <UserProfile />
}

const UserAvatar =   (state:BaseState) =>  {

    const {users:{logged}} = givenBase(state);
        
    return  <Avatar  size="large">
                {logged.username[0].toUpperCase()}
            </Avatar>   
            
}
        




const UserBadge = (state: BaseState ) => {

    const logged = givenBase(state).users.logged

    return <div className="user-badge">
         
                 <UserAvatar {...state}/>  

                 <div className="details">
                  
                    <div className="username">{logged.username}</div>
         
                    <div className="fullname">
                        {logged.details.firstname} {logged.details.lastname}
                    </div>
                    
                    <div className="email">{logged.details.email}</div>
            
                    <div className="logout">
                        <ActionButton size="small" name="Logout" icon="logout" />
                    </div>

                </div>
                 
         </div>  ;

}