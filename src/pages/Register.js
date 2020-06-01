import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",

        };
        this.handleSubmit = this.submitClick.bind(this);
        this.handleChangeUserid = this.handleUseridChange.bind(this);
        this.handleChangePassword = this.handlePasswordChange.bind(this);

    }

    handleUseridChange(event) {
        this.setState({ username: event.currentTarget.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });

    }

    submitClick(event) {
        const form = document.getElementById("sign-up-form");
        if (form.checkValidity()) {
            event.preventDefault();
            console.log(this.state.username);
                // sign up
                const signupURL = "http://localhost:8080/signup";
                const requestOptions = {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json",
                                "Authorization": document.cookie
                    },
                    body: JSON.stringify(this.state),
                };
                fetch(signupURL, requestOptions)
                    .then(res => {
                        if (res.redirected === true && res.url === signupURL) {
                            this._availableUserid = false;
                            alert("This username has been used, please enter a new username!!");
                        } else if (res.status == 201) {
                        } else {
                            const error = new Error(res.error);
                            throw error;
                        }
                    })
                    .then(userInfo => {
                        console.log("Success", userInfo);
                    });

        }
    }

    render() {
        return (
            <div>
                <div className="intro">
                    <h5>Join Us</h5>
                    <p className="subtitle">Sharing your colorful life!!</p>
                </div>
                <form className="form" id="sign-up-form" onSubmit={this.handleSubmit}>
                    <p>
                        <label>User ID:</label>
                        <input
                            type="text"
                            className="w3-input w3-border w3-round-large"
                            id="userid"
                            placeholder="Enter numbers and letters as your login ID"
                            value={this.state.username}
                            onChange={this.handleChangeUserid}
                            required
                        />
                    </p>

                    <p>
                        <label htmlFor="pwd">Password:</label>
                        <input
                            className="w3-input w3-border w3-round-large"
                            id="pwd"
                            placeholder="Enter password for this account"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            required
                        />
                    </p>


                    <button type="submit" className="w3-button w3-amber" value="sign up">
                        Sign Up
                    </button>
                </form>
            </div>
        );
    }
}

export default Register;
