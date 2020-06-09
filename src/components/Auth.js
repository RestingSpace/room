import React, { Component } from 'react';
import { RoomContext } from '../context'
import UserProfile from './UserProfile';
import { Redirect } from 'react-router-dom'


class Auth extends Component {
    static contextType = RoomContext;
    constructor(props) {

        super(props);
        this.state = {
            isRegister: this.props.isRegister,  //0: register //1: login //2: logout 
            username: "",
            email: "",
            password: "",
            confirmed_password: '',
            redirect: false,
            isLogin: false

        }
        this.state.isRegister = parseInt(this.state.isRegister);
    }

    /**** local storage ***/
    saveStateToLocalStorage() {
        localStorage.setItem('rootState_isLogin', JSON.stringify(this.state.isLogin));
        localStorage.setItem('rootState_username', JSON.stringify(this.state.username));
    }

    componentDidMount() {
        // const persistState_isLogin = localStorage.getItem('rootState_isLogin');
        // const persistState_username = localStorage.getItem('rootState_username');
        // console.log("persist Didmount", persistState_isLogin, persistState_username)
        // //console.log(persistState);
        // if (persistState_isLogin) {
        //     try {
        //         this.setState(JSON.parse(persistState_isLogin));
        //     } catch (e) {
        //         // is not json
        //     }
        // }
        // if (persistState_username) {
        //     try {
        //         this.setState(JSON.parse(persistState_username));
        //     } catch (e) {
        //         // is not json
        //     }
        // }

        if (this.state.isRegister === 2) {
            this.logout();
        }
    }

    componentWillUnmount() {
        console.log("I will unmount");
        this.saveStateToLocalStorage();
    }
    /**** local storage ***/

    login() {
        const loginURL = 'http://localhost:8080/login';
        const action = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            "Access-Control-Allow-Origin": "*"
        }
        fetch(loginURL, action)
            //.then(results => results.json())
            .then(res => {
                if (res.status == 200) {
                    let { toggleLogin } = this.context;
                    document.cookie = res.headers.get('Authorization');

                    console.log("success", res);
                    //UserProfile.setName(this.state.username);
                    this.setState({
                        redirect: true,
                        isLogin: true
                    })
                    console.log(this.state.isLogin)
                    localStorage.setItem('username', this.state.username);
                    toggleLogin(this.state.isLogin, this.state.username);

                }
                if (res.status == 403)
                    alert("You have not registered, please sign up first!");
            })
            .catch(err => {
                console.error(err);
                alert("Error logging in please try again");
            });
    }
    register() {
        alert("register called");
        console.warn("state", this.state);
        const signupURL = "http://localhost:8080/signup";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // credentials: "include",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.first_name,
                lastName: this.state.last_name,
                phone: this.state.phone,
                address: this.state.address,
                email: this.state.email
            }),
            "Access-Control-Allow-Origin": "*"
        };
        fetch(signupURL, requestOptions)
            .then(res => {
                console.log(res.status);
                if (res.status == 226) {
                    alert("This username already exists.")
                }
                if (res.status === 200) { // success Log in
                    this.setState({ isRegister: false, isLogin: true });
                } else {
                    console.log(res.text());
                }
            })
            .catch(err => {
                console.error(err);
                alert("Error signing up please try again");
            });
    }

    logout() {
        let { toggleLogin } = this.context;
        this.setState({
            redirect: false,
            isLogin: false,
            username: " "
        })
        localStorage.clear();
        toggleLogin(this.state.isLogin, this.state.username);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <div>
                {(() => {
                    switch (this.state.isRegister) {
                        case 2:
                            return (
                                <div className="banner">
                                    <h3>You are successfully logged out!</h3>
                                </div>)
                        case 0:

                            return (
                                <div className="login">
                                    <h2>Sign Up</h2>
                                    <h4>Basic Information </h4>
                                    <input className="login_input" type="text" placeholder=" first name"
                                        onChange={(e) => {
                                            console.log("change");
                                            this.setState({ first_name: e.target.value })
                                        }}
                                    />
                                    <input className="login_input" type="text" placeholder=" last name"
                                        onChange={(e) => {
                                            this.setState({ last_name: e.target.value })
                                        }}
                                    /> <br /><br />
                                    <input className="register_input" type="text" placeholder=" username"
                                        onChange={(e) => {
                                            this.setState({ username: e.target.value })
                                        }}
                                    /> <br /><br />
                                    <input className="register_input" type="text" placeholder=" email"
                                        onChange={(e) => {
                                            this.setState({ email: e.target.value })
                                        }}
                                    /> <br /><br />
                                    <input className="register_input" type="text" placeholder=" password"
                                        onChange={(e) => {
                                            this.setState({ password: e.target.value })
                                        }}
                                    /> <br /><br />
                                    <input className="register_input" type="text" placeholder=" confirm password"
                                        onChange={(e) => {

                                            if (e.target.value !== this.state.password) {

                                            }
                                            this.setState({ confirmed_password: e.target.value })
                                        }}
                                    /> <br /><br />

                                    <h4>Contact Information</h4>
                                    <input className="register_input" type="text" placeholder=" address"
                                        onChange={(e) => {
                                            this.setState({ address: e.target.value })
                                        }}
                                    /><br /><br />

                                    <input className="register_input" type="text" placeholder=" phone number"
                                        onChange={(e) => {
                                            this.setState({ phone: e.target.value })
                                        }}
                                    /> <br /><br />
                                    <div>
                                        <button className='primary' onClick={() => {
                                            const { password, confirmed_password } = this.state;
                                            if (password !== confirmed_password) {
                                                alert("Passwords don't match");
                                            }
                                            this.register()
                                        }}>Register</button>
                                    </div>

                                    <div>
                                        <button onClick={() => this.setState({ isRegister: false })}>Back to Login</button>
                                    </div>

                                </div>)

                        case 1:
                            return (
                                <div className="login">
                                    <h2> Login </h2>
                                    <div className='reminder'>username</div>
                                    <input className="login_input" type="text" placeholder=" username"
                                        onChange={(e) => {
                                            this.setState({ username: e.target.value })
                                        }}>
                                    </input>
                                    <br /><br />
                                    <div className='reminder'>password</div>
                                    <input className="login_input" type="text" placeholder=" password"
                                        onChange={(e) => {
                                            this.setState({ password: e.target.value })
                                        }}
                                    /> <br /><br />
                                    <div>
                                        <button className='primary' onClick={() => this.login()}>Login</button>
                                    </div>

                                    <div>
                                        <button onClick={() => this.setState({ isRegister: true })}>New User? Register</button>

                                    </div>

                                </div>
                            )
                        default:
                            return <div>error recognize case </div>
                    }
                })()}

                {

                    !this.state.isRegister ?
                        /***** start of register */
                        <div />
                        /*** end of register*/
                        :
                        /***** start of login */
                        <div />
                    /*** end of login */
                }
            </div>

        );
    }
}

export default Auth;