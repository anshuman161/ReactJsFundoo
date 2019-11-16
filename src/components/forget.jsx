import React, { Component } from 'react';
import { Card, TextField, Snackbar, IconButton, Button } from '@material-ui/core'
import { doforgetPassword} from '../services/userservice'
export default class Forget extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            snackBarMsg: '',
            openSnackBar: false,
        }
    }
    userEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
   
    onForgetPassword = () => {
        console.log('Inside forget');
        
        if (this.state.email === '') {
            this.setState({
                openSnackBar: true,
                snackBarMsg: "userEmail cannot be empty"
            })
        }
        else {
            let data={
                "email":this.state.email
            }
            doforgetPassword(data).then(res=>{
                console.log("Response after hitting login api is ",data);
            
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
                        Forget-Password
                </h1>
                 <div>
                        <TextField
                        id="Email"
                        placeholder="Email"
                        variant="outlined"
                        value={this.state.email}
                      onChange={this.userEmail}
                    /> </div>
                    <br />
                    <Button className = "submit-button" onClick={this.onForgetPassword}>Submit</Button>
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