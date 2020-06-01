import React, {Component} from 'react';

class Auth extends Component{

    constructor(props) {
        super(props);
        this.state={
            isRegister:this.props.isRegister,
            username: "",
            email:"",
            password:""
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
        console.warn("state", this.state);
        const signupURL = "http://localhost:8080/signup";
        const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // credentials: "include",
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,

                    }),
                    "Access-Control-Allow-Origin": "*"
                };
        fetch(signupURL, requestOptions).then((result)=>{
            result.json().then((resp)=>{
                localStorage.setItem("auth", JSON.stringify(resp.success.token));
            })
        })
    }


    render() {


        return (
            <div>
                {
                    !this.state.isRegister?
                    <div className="login">
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
                               onChange={(e) => {
                                   this.setState({password: e.target.value})
                               }}
                        /> <br/><br/>
                        <div>
                            <button className='primary' onClick={() => this.login()}>Login</button>
                        </div>

                        <div>
                            <button onClick={() => this.setState({isRegister: true})}>New User? Register</button>

                        </div>

                    </div>

                        :

                        <div className="login">
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
                                   onChange={(e) => {
                                       this.setState({username: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input className = "register_input" type="text" placeholder=" email"
                                   onChange={(e) => {
                                       this.setState({email: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input className = "register_input" type="text" placeholder=" password"
                                   onChange={(e) => {
                                       this.setState({password: e.target.value})
                                   }}
                            /> <br/><br/>
                            <input className = "register_input" type="text" placeholder=" confirm password"
                                   onChange={(e) => {
                                       this.setState({c_password: e.target.value})
                                   }}
                            /> <br/><br/>

                            <h4>Contact Information</h4>
                            <input className = "register_input" type="text" placeholder=" street address"
                                   onChange={(e) => {
                                       this.setState({street_address: e.target.value})
                                   }}
                            /><br/>
                            <input className = "address_input" type="text" placeholder=" city"
                                   onChange={(e) => {
                                       this.setState({city: e.target.value})
                                   }}
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
                                   onChange={(e) => {
                                       this.setState({phone: e.target.value})
                                   }}
                            /> <br/><br/>
                            <div>
                                <button className ='primary' onClick={() => this.register()}>Register</button>
                            </div>

                            <div>
                                <button onClick={() => this.setState({isRegister: false})}>Back to Login</button>
                            </div>

                        </div>
                }
            </div>

        );
    }
}

export default Auth;
