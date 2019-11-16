import React, { Component } from 'react';
import { Card, TextField, Snackbar, IconButton, Button } from '@material-ui/core'
import { doLogIn} from '../services/userservice'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            snackBarMsg: '',
            openSnackBar: false,
        }
    }
    handleAll = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit = () => {
        if (this.state.email === '' ) {
            this.setState({
                openSnackBar: true,
                snackBarMsg: "Email cannot be empty"
            })
        }
        else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({
                openSnackBar: true,
                snackBarMsg: 'Please provide a valid email address'
            })
        }
        else if (this.state.password === '') {
            this.setState({
                openSnackBar: true,
                snackBarMsg: "Password cannot be empty"
            })
        }
       

        else {
            let data={
                "email":this.state.email,
                "password":this.state.password
            }
            doLogIn(data).then(res=>{
                console.log("Response after login api is ",data);
                localStorage.setItem('token', res.data.messege);
                localStorage.setItem('email',this.state.email);
                console.log('token in login'+res.data.messege);
                
                this.props.history.push('/dashboard')
                
            }).catch(err=>{
                console.log("Error after login api  ",err);
                this.setState({
                    openSnackBar: true,
                snackBarMsg: "Email or Password is wrong!!"
                })
            })
        }
    }
    handleClose = () => {
        this.setState({
            openSnackBar: false
        })
    }
    onForPassword =() => {
        this.props.history.push('/forget')
    }
    onRegistration =() => {
        this.props.history.push('/register')
    }
    
    render() {
        return (
         
            <div className="login-container">
                <Card className="login-card">
                 <div> 
                    <h1>
                        Login
                </h1>
                <div><TextField
                        id="Email"
                        type="email"
                        placeholder="Email"
                        variant="outlined"
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleAll}
                    /> </div>   <br/> 
                    <div>
                    <TextField
                        id="password"
                        placeholder="Password"
                        variant="outlined"
                        name="password"
                        type="password" 
                        value={this.state.password}
                        onChange={this.handleAll}
                    /> </div>
                    <Button className = "submit-button" type="submit" onClick={this.onSubmit}>Login</Button><br/>
                    <Button className = "submit-button" onClick={this.onRegistration}>Registration</Button><br/>
                    <Button className = "submit-button" onClick={this.onForPassword}>Forget Password?</Button>
                 </div>  
                </Card>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.openSnackBar}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={<span id="message-id">{this.state.snackBarMsg}</span>}
                    action={[
                        <IconButton
                            onClick={this.handleClose}>
                        </IconButton>
                    ]}
                />
            </div>
            
        )
    }
}