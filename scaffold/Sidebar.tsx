import * as React from "react";


type Props = {
  title?:string
  children?:any
}

export const Sidebar = ({title,children}:Props) => {


  return <div className="pagesider">
      <div className="title">{title && title}</div>
      {children}
  </div>
}