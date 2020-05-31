import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        };

        this.submitClick = this.submitClick.bind(this);
        this.handleChangeUsername = this.handleUsernameChange.bind(this);
        this.handleChangePassword = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.currentTarget.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.currentTarget.value });
    }

    submitClick(event) {
        const form = document.getElementById("log-in-form");
        if (form.checkValidity()) {
            event.preventDefault();

            const loginURL = "http://localhost:8080/login";

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // credentials: "include",
                body: JSON.stringify(this.state),
                "Access-Control-Allow-Origin": "*"
            };
            fetch(loginURL, requestOptions)
                .then(res => {
                    if (res.status === 200) { // success Log in
                        this.props.history.push("/");
                        console.log(res);
                        return res;
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .then(loggedinUser => window.localStorage.setItem("currentUser", JSON.stringify(loggedinUser)))
                .catch(err => {
                    console.error(err);
                    alert("Error logging in please try again");
                });



        }
    }


    render() {
        return (
            <div>
                <div className="intro">
                    <h5>Log into your account you created before!!</h5>
                    <p className="subtitle">Sharing your colorful life!!</p>
                </div>
                <form className="form" id="log-in-form" onSubmit={this.submitClick}>
                    <p>
                        <label>Username:</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                        />
                    </p>
                    <p>
                        <label htmlFor="pwd">Password:(6 or more characters)</label>
                        <input
                            id="pwd"
                            placeholder="Enter password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                        />
                    </p>
                    <button type="submit"  value="log in">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;
