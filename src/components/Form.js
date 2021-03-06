import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const inputValue = event.target.value;
        const stateField = event.target.name;
        this.setState({
            [stateField]: inputValue,
        });
        console.log(this.state);
    }
    async handleSubmit(event) {
        event.preventDefault();
        const { url } = this.state;
        if (this.validateURL(url)){
            let res = await axios.post(
                'https://qeqj4zej8c.execute-api.us-west-2.amazonaws.com/dev/open-commits',
                { url: `${url}` }
            );
            Response.setState({response: JSON.stringify(res.data,null,2)})
            console.log(res)
        } else {
            Response.setState({response: 'Invalid URL'})
        }

    }
    validateURL (url) {
        if (url.slice(-1) != '/') {
            url += '/';
        }
        let regex = /(https)(:(\/\/))(api.github.com)(\/)(repos)(\/)([\w.@:/\-~]+)(\/)([\w.@:/\-~]+)(\/)/;

        return regex.test(url)
    }
    render (){
        return (
            <div data-testid="form-1">
                <form onSubmit={this.handleSubmit}>
                    <label>URL:</label>
                    <input
                        type="text"
                        name="url"
                        onChange={this.handleChange}
                        value={this.state.url}
                    />

                    <button type="submit">Get Commits</button>
                </form>
            </div>
        );
    };
}

export default Form;