import React, { Component } from 'react';

class InputData extends Component {
    render() {
        return (
            <input type={this.props.type} ref={this.props.innerRef}/>
        )
    }
}

export default InputData