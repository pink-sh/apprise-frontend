
export const any  = "*"
export const notype = "app"

export type Action = {

    labels : string[]
    name: string
    description: string
    resource?: string
    type: string
  
}


export const withAction = (self:Action) =>  ({
    
    ...self,

    specialiseTo: (resource:string) => ({ ...self, resource} as Action),

    sameAs: (action:Action) => withAction(self).like(action) && self.resource === action.resource,

    impliedBy: (action:Action) => withAction(self).like(action) && (self.resource === action.resource || action.resource === any || action.resource === undefined ),

    like:  (action:Action) => {

                                // must have same length
                            if ( self.labels.length < action.labels.length)
                                return false;
                        
                            // exit as soon as one pair of labels don't match
                            self.labels.forEach( (lbl,i) => {
                        
                                if ( action.labels[i] && ( action.labels[i] !== lbl  &&  action.labels[i] !== any))
                                    return false;
                            })

                           return true;
                        },


})