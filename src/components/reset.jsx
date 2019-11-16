import React, { Component } from 'react';
import { Card, TextField, Snackbar, IconButton, Button } from '@material-ui/core'
import {  doResetPassword } from '../services/userservice';
export default class Reset extends Component {
   componentDidMount(){
       this.state1.token=this.props.match.params
       console.log('token',this.state1.token);
   }
   
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            confirmPassword:'',
            snackBarMsg: '',
            openSnackBar: false,
        }
        this.state1={
            token:'',
        }

    }
    handleAll = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
   
    onResetPassword = () => {
        console.log('Inside forget');
        if (this.state.email === '') {
            this.setState({
                openSnackBar: true,
                snackBarMsg: "userEmail cannot be empty"
            })
        }
        else if (this.state.password === '') {
            this.setState({
                openSnackBar: true,
                snackBarMsg: "Password cannot be empty"
            })
        }
        else if (this.state.confirmPassword === '') {
            this.setState({
                openSnackBar: true,
                snackBarMsg: "Password cannot be empty"
            })
        }
        else {
            let data={
                "email":this.state.email,
                "password":this.state.password,
                 "confirmPassword":this.state.confirmPassword
            }

            doResetPassword(data, this.state1.token).then(res=>{
                console.log("Response after hitting login api is ",data);
                console.log('check token'+ this.state1.token);
                this.props.history.push('/login')
            }).catch(err=>{
                console.log("Error after hitting forget api  ",err);
            })
        }
    }
    handleClose = () => {
        this.setState({
            openSnackBar: false
        })
    }
    onLogIn=()=>{
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="forgetcontainer">
                <Card className="login-card">
                 <div> 
                    <h1>
                        Reset-Password
                </h1>
                 <div>
                        <TextField
                        id="Email"
                        placeholder="Email"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={this.state.email}
                      onChange={this.handleAll}
                    /> </div>
                    <br />
                    <div>
                        <TextField
                        id="Password"
                        placeholder="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={this.state.password}
                      onChange={this.handleAll}
                    /> </div>
                    <br />
                    <div>
                        <TextField
                        id="Confirm-Password"
                        placeholder="Confirm-Password"
                        variant="outlined"
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                      onChange={this.handleAll}
                    /> </div>
                    <Button className = "submit-button" onClick={this.onResetPassword}>Submit</Button>
                    <Button className = "submit-button" onClick={this.onLogIn}>Login</Button>
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