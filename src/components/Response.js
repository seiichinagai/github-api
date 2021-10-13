import React, { Component } from 'react';

class Response extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ''
        }
    }

    render() {
        return <div data-testid="response-1">{this.state.response}</div>
    }
}

export default Response;