import React, { Component } from 'react'
//import MenuItem from '@material-ui/core/MenuItem';
import {TextField, Snackbar, IconButton, Button} from '@material-ui/core'
import {doRegistration} from '../services/userservice';
export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            phoneno: '',
            address:'',
            password:'',
            snackBarMsg: '',
            openSnackBar: false,
        }
    }

   
handleAll = (event) => {
    this.setState({ [event.target.name]: event.target.value

    })
}
onSubmit=()=>{
    if (this.state.username === '') {
        this.setState({
            openSnackBar: true,
            snackBarMsg: "userName cannot be empty"
        })
    }
    else if (this.state.email === '') {
        this.setState({
            openSnackBar: true,
            snackBarMsg: "Email cannot be empty "
        })
    }
    else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
        this.setState({
            openSnackBar: true,
            snackBarMsg: 'Please provide a valid email address'
        })
    }
    else if (this.state.phoneno==='') {
        this.setState({
            openSnackBar: true,
            snackBarMsg: "Phone Number can't be empty"
        })
    }
  else if (!/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(this.state.phoneno)) {
        this.setState({
            openSnackBar: true,
            snackBarMsg: "Phone Number is  not correct"
        })
    }
    
    else if (this.state.address === '') {
        this.setState({
            openSnackBar: true,
            snackBarMsg: "Address cannot be empty"
        })
    }
    else if (this.state.password === '' ) {
        this.setState({
            openSnackBar: true,
            snackBarMsg: "Password cannot be empty "
        })
    }
    
    else {
        let data={
            "username":this.state.username,
            "email":this.state.email,
            "phoneno":this.state.phoneno,
            "address":this.state.address,
            "password":this.state.password
        }
        doRegistration(data).then(res=>{
            console.log("Response after hitting login api is ",data);
            this.props.history.push('/login')
            
        }).catch(err=>{
            console.log("Error after hitting login api  ",err);
        })
    }    
}
onLogIn = () => {
    this.props.history.push('/login')
}
    render() {
        return (
            <div className='registerContains'>
          <div><h2>Registration Page</h2>    
                <TextField
    
        label="UserName"
        name="username" required
        value={this.state.username}
       onChange={this.handleAll}
        margin="normal"
        variant="outlined"
          /></div>
          <div>
              <TextField
       
        label="Email"
        type="email" required
        name="email"
        value={this.state.email}
        onChange={this.handleAll}
        autoComplete="email"
        margin="normal"
        variant="outlined"
             /></div>
             <div>
             <TextField
       
        label="Password"
        type="password" required
        name="password"
        value={this.state.password}
        onChange={this.handleAll}
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      /></div>
             <div>
             <TextField
        label="Phone Number"
       
        name="phoneno" required
        value={this.state.phoneno}
        onChange={this.handleAll}
        autoComplete=""
        margin="normal"
        variant="outlined"
             /></div>
             <div>
             <TextField
        label="Address"
        type="TextField"
        name="address" required
        value={this.state.address}
        onChange={this.handleAll}
        autoComplete=""
        margin="normal"
        variant="outlined"
             /></div>
             
      <div><Button className = "submit-button" onClick={this.onSubmit}>Submit</Button></div><br/>
      <div> <Button className = "submit-button" onClick={this.onLogIn}>Login</Button></div>
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
