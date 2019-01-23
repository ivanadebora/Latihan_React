import React, { Component } from 'react';

    class Content1 extends Component {
        render() {
            return (
                <center style={{color:'orange'}}> 
                    {/* <h2>Ini Content</h2>
                    <p>Babel is a JavaScript compiler that can translate markup or programming languages into JavaScript.</p> */}
                    {/* <p>{this.props.content}</p> */}
                    <h1>{this.props.contentHeader}</h1>
                    {/* {this.props.children} */}
                </center>
            )
        }
    }

    export default Content1;