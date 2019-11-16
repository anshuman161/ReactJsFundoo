import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import LoopIcon from '@material-ui/icons/Loop';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import Button from '@material-ui/core/Button';
import SideNav from './sidenav';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import Menu from '@material-ui/core/Menu';
  export default class DashBoardCard extends Component 
  {
    constructor(props) {
      super(props);
      this.state = {
          isOpen: false,
          view: true,
          ITEM_HEIGHT : 48,
          anchorEl:'',
      }
  }
  toggleDrawer = async () => {
     await  this.setState({
          isOpen: !this.state.isOpen   
        });
      console.log( 'message-----------' + this.state.isOpen);    
  };
  handleRefresh = ()=>{
    window.location.reload(); 
  }
  handleView = () => {
    this.setState({
        view: !this.state.view
    })
    this.props.viewprop(true)
    console.log(this.state.view)
    
}
handleClose = () => {
  this.setState({
      anchorEl:null
  })
};
handleClick = event => {
  this.setState({
      anchorEl:event.target
  })
};
handleLogOut = ()=>{
  localStorage.clear();
  window.location.href = '/login';
  
}
render(){
    return (
        <div>
          <MuiThemeProvider>
          <AppBar position="static" >
            <Toolbar style={{backgroundColor:"white"}}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
              <div>
                        <IconButton  aria-label="menu" onClick={this.toggleDrawer}>  
                            <MenuIcon/>
                        </IconButton>
                        <SideNav menuSelect={this.state.isOpen}/>
                        </div>
              </IconButton>
              <div>
              <img className="imageDiv" src={require('../assets/keep.png')}/>
              </div>
              <Typography  variant="h6" noWrap>
              <span style={{color:'#808080'}}>FUNDO</span>
              </Typography>
              <div  className="search" >
                <div >
                  <SearchIcon/>
                </div>
                <InputBase className="searchbar"
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton>
                <ClearIcon/>
            </IconButton>
              </div>   
          <div style={{display:'flex',color:'#808080'}}> 
          <IconButton >
             <div onClick={this.handleRefresh} 
                >
             <LoopIcon/>
             </div>
         </IconButton>
         <IconButton>
           <div>
                <IconButton color="inherit" onClick={this.handleView}>
                      {this.state.view ? <ViewAgendaIcon /> : <ViewColumnIcon/>}
               </IconButton>
               
             </div>
         </IconButton>
         <IconButton>
         <SettingsIcon/>
        </IconButton>
        </div>
       <div  style={{display:'flex',color:'#808080'}}>
        <IconButton>
         <AppsIcon/>
        </IconButton>
        <div>
        <IconButton style={{padding:'4px'}}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}>
        <img  style={{width:'40px',height:'40px'}} src={require('../assets/keep.png')}/>
        <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.anchorEl}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: this.state.ITEM_HEIGHT * 5,
                            width: 150,
                        },
                    }}
         >    
                 <div>
                         <Button>
                              Sign Out
                         </Button>
                  
                         <Button onClick={this.handleLogOut}>
                              Log Out
                         </Button>
                     </div>     
                </Menu>
        </IconButton>
        </div>
       </div>
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>  
    </div>
  );
}
}