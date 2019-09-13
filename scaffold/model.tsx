

export type ScaffoldModel = {

    title : string
    icon: string 
    sections: SectionModel[]

}
             
export type SectionModel = {

    title: string
    icon:string
    route: { path: string, exact: boolean};
    content: React.ComponentType<any>
}

