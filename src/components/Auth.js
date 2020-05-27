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
<<<<<<< Updated upstream
                        <input type="text" placeholder="email"
                               onChange={(e) => {
                                   this.setState({email: e.target.value})
                               }}
                        /> <br/><br/>
                        <input type="text" placeholder="password"
=======
                        <h2> Login </h2>
                        {this.state.email.length === 0 ? null : <div className='reminder'>email</div>}
                        <input className = "login_input" type="text" placeholder=" email"
                               onChange={(e) => {
                                   this.setState({email: e.target.value})
                               }}>

                        
                        </input>
                        <br/><br/>
                        {this.state.password.length === 0 ? null : <div className='reminder'>password</div>}
                        <input className = "login_input" type="text" placeholder=" password"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                            <input type="text" placeholder="username"
=======
                            <h2>Sign Up</h2>
                            <h4>Basic Information </h4>
                            <input className = "login_input" type="text" placeholder=" first name"
                                   onChange={(e) => {
                                       this.setState({first_name: e.target.value})
                                   }}
                            />
                            <input className = "login_input" type="text" placeholder=" last name"
                                   onChange={(e) => {
                                       this.setState({last_name: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input className = "register_input" type="text" placeholder=" username"
>>>>>>> Stashed changes
                                   onChange={(e) => {
                                       this.setState({username: e.target.value})
                                   }}
                            /> <br/><br/>
<<<<<<< Updated upstream
                            <input type="text" placeholder="email"
=======
                            <input className = "register_input" type="text" placeholder=" email"
>>>>>>> Stashed changes
                                   onChange={(e) => {
                                       this.setState({email: e.target.value})
                                   }}
                            /> <br/><br/>
<<<<<<< Updated upstream
                            <input type="text" placeholder="password"
=======
                            <input className = "register_input" type="text" placeholder=" password"
>>>>>>> Stashed changes
                                   onChange={(e) => {
                                       this.setState({password: e.target.value})
                                   }}
                            /> <br/><br/>
<<<<<<< Updated upstream

                            <input type="text" placeholder="first name"
=======
                            <input className = "register_input" type="text" placeholder=" confirm password"
>>>>>>> Stashed changes
                                   onChange={(e) => {
                                       this.setState({c_password: e.target.value})
                                   }}
                            /> <br/><br/>
<<<<<<< Updated upstream
                            <input type="text" placeholder="last name"
=======

                            <h4>Contact Information</h4>
                            <input className = "register_input" type="text" placeholder=" street address"
>>>>>>> Stashed changes
                                   onChange={(e) => {
                                       this.setState({street_address: e.target.value})
                                   }}
<<<<<<< Updated upstream
                            /> <br/><br/>
                            <input type="text" placeholder="address"
=======
                            /><br/>
                            <input className = "address_input" type="text" placeholder=" city"
>>>>>>> Stashed changes
                                   onChange={(e) => {
                                       this.setState({city: e.target.value})
                                   }}
<<<<<<< Updated upstream
                            /> <br/><br/>
                            <input type="text" placeholder="phone number"
=======
                            />
                            <input className = "address_input" type="text" placeholder=" state"
                                   onChange={(e) => {
                                       this.setState({state: e.target.value})
                                   }}
                            />
                            <input className = "address_input" type="text" placeholder=" zip"
                                   onChange={(e) => {
                                       this.setState({zip: e.target.value})
                                   }}
                            /><br/><br/>
                            <input className = "register_input" type="text" placeholder=" phone number"
>>>>>>> Stashed changes
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