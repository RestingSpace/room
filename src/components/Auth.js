import React, {Component} from 'react';

class Auth extends Component {
    constructor() {
        super();
        this.state={
            isRegister:false
        }
    }
    login(){
        alert("login called");
        // console.warn("state", this.state);
        // fetch('http://127.0.0:8000/api/login', {
        //     method: "POST",
        //     headers:{
        //         "Accept":"application/json",
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify(this.state)
        // }).then((result)=>{
        //     result.json().then((resp)=>{
        //         console.log(resp);
        //         localStorage.setItem("auth", JSON.stringify(resp.success.token));
        //     })
        // })
    }
    register(){
        alert("register called");
        // console.warn("state", this.state);
        // fetch('http://127.0.0:8000/api/register', {
        //     method: "POST",
        //     headers:{
        //         "Accept":"application/json",
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify(this.state)
        // }).then((result)=>{
        //     result.json().then((resp)=>{
        //         console.log(resp);
        //         localStorage.setItem("auth", JSON.stringify(resp.success.token));
        //     })
        // })
    }
    render() {
        return (
            <div>
                {
                    !this.state.isRegister?
                    <div className="login">
                        <input type="text" placeholder="email"
                               onChange={(e) => {
                                   this.setState({email: e.target.value})
                               }}
                        /> <br/><br/>
                        <input type="text" placeholder="password"
                               onChange={(e) => {
                                   this.setState({password: e.target.value})
                               }}
                        /> <br/><br/>
                        <button onClick={() => this.login()}>Login</button>
                        <span>&emsp;&emsp;&emsp;</span>
                        <button onClick={() => this.setState({isRegister: true})}>New User? Register</button>
                    </div>
                        :
                        <div className="login">
                            <input type="text" placeholder="username"
                                   onChange={(e) => {
                                       this.setState({username: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input type="text" placeholder="email"
                                   onChange={(e) => {
                                       this.setState({email: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input type="text" placeholder="password"
                                   onChange={(e) => {
                                       this.setState({password: e.target.value})
                                   }}
                            /> <br/><br/>

                            <input type="text" placeholder="first name"
                                   onChange={(e) => {
                                       this.setState({first_name: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input type="text" placeholder="last name"
                                   onChange={(e) => {
                                       this.setState({last_name: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input type="text" placeholder="address"
                                   onChange={(e) => {
                                       this.setState({address: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input type="text" placeholder="phone number"
                                   onChange={(e) => {
                                       this.setState({phone: e.target.value})
                                   }}
                            /> <br/><br/>

                            <button onClick={() => this.register()}>Register</button>
                            <span>&emsp;&emsp;&emsp;&emsp;</span>
                            <button onClick={() => this.setState({isRegister: false})}>Back to Login</button>
                        </div>
                }
            </div>

        );
    }
}

export default Auth;