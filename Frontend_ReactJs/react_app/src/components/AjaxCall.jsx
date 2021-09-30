import React from 'react';
class AJAXCall extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
    }
    
    componentDidMount() {
        this.callAjax();
      }
      
      async callAjax(){
        const response = await fetch('http://localhost:8000/api/courses');
        const courses = await response.json();
        this.setState({
          data : JSON.stringify(courses),
        })
      }
    
  
    render() {
        return(
        <div>
          <h1>Hello World</h1>
        <h1>{this.state.data}</h1>
        </div>)
    }
  }

  export default AJAXCall;