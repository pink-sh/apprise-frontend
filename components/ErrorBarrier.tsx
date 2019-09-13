import { showFailure } from "apprise-frontend";
import * as React from "react";

export class ErrorBarrier extends React.Component<{},any> {

  constructor(props) {
    super(props);
    this.state = { error: false}
  }

  componentDidCatch(error, info) {
    
    showFailure({ message:error.toString(), 
      details: info.componentStack, 
      allowReload: true,
      onClose : close => { 
              close(); 
              this.setState({error:false});} 
      })

  }

  static getDerivedStateFromError() {

    return { error: true }
  }

  

  render() {

    const sprawl = {  height: "100vh", width: "100vw", background: "black", margin: 0 }

    return this.state.error ? <div style={sprawl}/> : this.props.children;
  
  }
}