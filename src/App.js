import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './components/registration';
import Login from './components/login';
import Forget from './components/forget';
import Reset from './components/reset';

import SideNav from './dashBoard/sidenav';
import Createnote from './dashBoard/createnote';

import DownBar from './dashBoard/downbar';

import DashBoardCard from './pages/getDashBoard';
import DisplayNotesCard from './dashBoard/displaynotes';
import archive from './pages/getArchive'
import ButtonAddLabel from './pages/getAddLabel';
import isTrash from './pages/getTrash';
import getReminder from './pages/getReminder';



function App() {
  return (
    <Router>
      <div><Route path = "/" exact component = {Login}/></div>
      <div><Route path = "/register" component = {Registration} /></div>
      <div><Route path = "/login" component = {Login}/></div>
      <div><Route path = "/dashboard" component = {DashBoardCard}/></div>
      <div><Route path = "/forget" component = {Forget}/></div>
      <div><Route path = "/reset/:token" component = {Reset} /></div>
      <div><Route path = "/sidenav" component = {SideNav}/></div>
      <div><Route path = "/createnote" component = {Createnote}/></div>
      <div><Route path = "/displaynote" component = {DisplayNotesCard}/></div>
      <Route path = "/downbar" component = {DownBar}/>
      <Route path = "/archive" component = {archive}/>
      <Route path = "/addlabel" component = {ButtonAddLabel}/>
      <Route path = "/reminder" component = {getReminder}/>
      <Route path = "/trash" component = {isTrash}/>
      
    </Router>
  );
}

export default App;
