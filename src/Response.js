import React, { Component } from 'react';

class Response extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ''
        }
    }

    render() {
        return this.state.response;
    }
}

export default Response;