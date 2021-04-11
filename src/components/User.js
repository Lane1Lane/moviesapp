import React, { useState, useEffect } from 'react';
import { pure } from 'recompose';

const getUserInfo = (userLogin) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.github.com/users/${userLogin}`, true);
        xhr.responseType = 'json';
        xhr.onload = () => {resolve(xhr.response)}
        xhr.send();
    });
};


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
    };

    componentDidMount() {
        getUserInfo(this.props.match.params.id).then((e) => this.setState({...e})); 
    };

    render() {
        let created_at = new Date(this.state.created_at);
        return (
            <div className="content-container">
                <br></br>
                <div className="list-header">
                    <img src={this.state.avatar_url} className="list-item__avatar-big"/>
                    <div>
                        <h2>{this.state.name}</h2>
                        <p>Followers <b>{this.state.followers}</b></p>
                        <p>Following <b>{this.state.following}</b></p>
                        <p>From <b>{created_at.toLocaleDateString()}</b></p>
                    </div>
                </div>
                <br></br>
                <div>
                    <button className="button" onClick={()=>{this.props.history.push('/');}}>Вернуться к списку</button>
                </div>
            </div>
        );

    };
};


export default User;