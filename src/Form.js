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
            // this.setState({ response: res});
            console.log(res)
            // return await res.json();
        } else {
            Response.setState({response: 'Invalid URL'})
        }

    }
    validateURL(url){

        if(url.indexOf('github') < 0){
            return false
        }

        try{
            new URL(url)
            return true;
        } catch(urlErr){
            return false;
        }
    }

    render() {
        return (
            <div>
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
                {/*{ this.state.response }*/}
            </div>
        );
    }
}

export default Form;